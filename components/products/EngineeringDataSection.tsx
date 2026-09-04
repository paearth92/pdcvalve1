'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  Boxes,
  ChevronDown,
  Gauge,
  Layers3,
  Ruler,
  Settings2,
  Table2,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  EngineeringDataTable,
  ProductEngineeringData,
} from '@/types/content';

type EngineeringTableKind = NonNullable<EngineeringDataTable['kind']>;
type ChartKind = 'torque' | 'flow' | 'performance';

type ChartPoint = {
  x: number;
  y: number;
};

type ChartSeries = {
  label: string;
  displayLabel: string;
  points: ChartPoint[];
};

type ChartGroup = {
  id: ChartKind;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  selectorLabel: string;
  xAxisLabel: string;
  yAxisLabel: string;
  yValueSuffix: string;
  series: ChartSeries[];
};

function TableIcon({ kind }: { kind?: EngineeringTableKind }) {
  const cls = 'h-4 w-4';

  switch (kind) {
    case 'dimensions':
      return <Ruler className={cls} />;
    case 'flow':
      return <BarChart3 className={cls} />;
    case 'torque':
    case 'performance':
      return <Gauge className={cls} />;
    case 'materials':
      return <Layers3 className={cls} />;
    case 'models':
      return <Boxes className={cls} />;
    default:
      return <Table2 className={cls} />;
  }
}

/* ============================================================
 * UNIVERSAL PERFORMANCE CHART PARSER
 *
 * The old graph parser only understood Econotrol's plain numeric
 * pressure headers. This parser accepts the different PDC formats:
 *
 * - 0.5 / 1 / 5 / 10 ...
 * - 30 PSI / 40 PSI / 50 PSI ...
 * - 5 Bar N·m / 10 Bar N·m / 20 Bar N·m
 * - 10° / 20° / 30° ... for Cv tables
 *
 * Exact engineering tables remain the source of truth below.
 * ========================================================== */

function parseNumeric(value: string): number | null {
  const cleaned = value
    .replace(/,/g, '')
    .replace(/[−–—]/g, '-')
    .trim();

  if (!cleaned || cleaned === '-') return null;

  const direct = Number(cleaned);
  if (Number.isFinite(direct)) return direct;

  const match = cleaned.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;

  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function isChartXColumn(
  header: string,
  kind: ChartKind,
  index: number,
): boolean {
  if (index === 0) return false;

  const normalized = header.toLowerCase().trim();

  // Descriptive identifier columns such as "Size inch" are labels,
  // even though individual row values inside them may be numeric.
  if (
    normalized.includes('size') ||
    normalized.includes('model') ||
    normalized.includes('assembly')
  ) {
    return false;
  }

  const numeric = parseNumeric(header);
  if (numeric === null) return false;

  if (kind === 'flow') {
    return (
      normalized.includes('°') ||
      normalized.includes('degree') ||
      /^\s*\d+(?:\.\d+)?\s*°?\s*$/.test(header)
    );
  }

  return (
    normalized.includes('psi') ||
    normalized.includes('bar') ||
    /^\s*\d+(?:\.\d+)?\s*$/.test(header)
  );
}

function getSeriesLabelIndex(table: EngineeringDataTable): number {
  const inchSizeIndex = table.columns.findIndex((column) =>
    /size\s*inch/i.test(column),
  );

  return inchSizeIndex >= 0 ? inchSizeIndex : 0;
}

function getDisplayLabel(
  rawLabel: string,
  labelHeader: string,
): string {
  if (!rawLabel) return rawLabel;

  const isSize = /size/i.test(labelHeader);
  const alreadyHasUnit = /["”']/.test(rawLabel);
  const looksLikeModel = /model/i.test(labelHeader);

  if (isSize && !alreadyHasUnit && !looksLikeModel) {
    return `${rawLabel}"`;
  }

  return rawLabel;
}

function mergeSeries(series: ChartSeries[]): ChartSeries[] {
  const merged = new Map<string, ChartSeries>();

  series.forEach((item) => {
    const existing = merged.get(item.label);

    if (!existing) {
      merged.set(item.label, {
        ...item,
        points: [...item.points],
      });
      return;
    }

    const pointMap = new Map<number, ChartPoint>();

    [...existing.points, ...item.points].forEach((point) => {
      pointMap.set(point.x, point);
    });

    existing.points = Array.from(pointMap.values()).sort(
      (a, b) => a.x - b.x,
    );
  });

  return Array.from(merged.values());
}

function buildSeriesForKind(
  tables: EngineeringDataTable[],
  kind: ChartKind,
): ChartSeries[] {
  const series: ChartSeries[] = [];

  tables.forEach((table) => {
    const xColumns = table.columns
      .map((header, index) => ({
        index,
        header,
        x: parseNumeric(header),
      }))
      .filter(
        (
          column,
        ): column is { index: number; header: string; x: number } =>
          column.x !== null &&
          isChartXColumn(column.header, kind, column.index),
      );

    if (xColumns.length < 2) return;

    const labelIndex = getSeriesLabelIndex(table);
    const labelHeader = table.columns[labelIndex] ?? 'Series';

    table.rows.forEach((row) => {
      const rawLabel = row[labelIndex] ?? row[0] ?? '';
      const points = xColumns
        .map((column) => {
          const y = parseNumeric(row[column.index] ?? '');
          return y === null ? null : { x: column.x, y };
        })
        .filter((point): point is ChartPoint => point !== null)
        .sort((a, b) => a.x - b.x);

      if (rawLabel && points.length >= 2) {
        series.push({
          label: rawLabel,
          displayLabel: getDisplayLabel(rawLabel, labelHeader),
          points,
        });
      }
    });
  });

  return mergeSeries(series);
}


function buildHighPerformanceSeries(
  tables: EngineeringDataTable[],
): ChartSeries[] {
  const table = tables.find(
    (candidate) =>
      candidate.kind === 'performance' &&
      candidate.columns.some((column) =>
        /cv\s*full\s*open/i.test(column),
      ),
  );

  if (!table) return [];

  const sizeIndex = table.columns.findIndex((column) =>
    /size\s*inch/i.test(column),
  );
  const cvIndex = table.columns.findIndex((column) =>
    /cv\s*full\s*open/i.test(column),
  );

  if (sizeIndex < 0 || cvIndex < 0) return [];

  const points = table.rows
    .map((row) => {
      const x = parseNumeric(row[sizeIndex] ?? '');
      const y = parseNumeric(row[cvIndex] ?? '');

      return x === null || y === null ? null : { x, y };
    })
    .filter((point): point is ChartPoint => point !== null)
    .sort((a, b) => a.x - b.x);

  if (points.length < 2) return [];

  return [
    {
      label: 'full-open-cv',
      displayLabel: 'Full-open Cv',
      points,
    },
  ];
}

function buildChartGroup(
  tables: EngineeringDataTable[],
  kind: ChartKind,
): ChartGroup | null {
  const matchingTables = tables.filter((table) => table.kind === kind);
  const series =
    kind === 'performance'
      ? buildHighPerformanceSeries(matchingTables)
      : buildSeriesForKind(matchingTables, kind);

  if (series.length === 0) return null;

  const sourceText = matchingTables
    .map(
      (table) =>
        `${table.title} ${table.description ?? ''} ${table.columns.join(' ')}`,
    )
    .join(' ')
    .toLowerCase();

  const firstTable = matchingTables[0];
  const labelHeader =
    firstTable?.columns[getSeriesLabelIndex(firstTable)] ?? 'Series';

  if (kind === 'flow') {
    return {
      id: 'flow',
      label: 'Cv / Flow',
      eyebrow: 'Interactive flow visualization',
      title: 'Cv vs. Disc Angle',
      description:
        'Explore PDC’s published flow-coefficient data visually. Select a valve size to see how Cv changes as the disc opens, then use the exact table below for engineering selection.',
      selectorLabel: /model/i.test(labelHeader) ? 'Model' : 'Valve size',
      xAxisLabel: 'Disc angle (°)',
      yAxisLabel: 'Cv',
      yValueSuffix: ' Cv',
      series,
    };
  }

  const usesBar = sourceText.includes('bar');
  const isActuator =
    sourceText.includes('actuator') ||
    sourceText.includes('air supply') ||
    /model/i.test(labelHeader);
  const usesNewtonMeters =
    sourceText.includes('n·m') ||
    sourceText.includes('n-m') ||
    sourceText.includes('n m');

  return {
    id: 'torque',
    label: 'Torque',
    eyebrow: isActuator
      ? 'Interactive actuator performance'
      : 'Interactive torque visualization',
    title: isActuator
      ? 'Output Torque vs. Air Pressure'
      : usesBar
        ? 'Valve Torque vs. Differential Pressure'
        : 'Required Torque vs. Pressure Drop',
    description: isActuator
      ? 'Select an actuator model to visualize PDC’s published output torque across the available supply-pressure range. Exact source values remain available in the engineering table below.'
      : 'Select a valve size to visualize PDC’s published torque data across the available pressure range. Exact source values remain available in the engineering table below.',
    selectorLabel: /model/i.test(labelHeader) ? 'Actuator model' : 'Valve size',
    xAxisLabel: usesBar
      ? 'Differential pressure (bar)'
      : isActuator
        ? 'Air supply pressure (PSI)'
        : 'Pressure drop (PSI)',
    yAxisLabel: usesNewtonMeters ? 'Torque (N·m)' : 'Torque (lb-in)',
    yValueSuffix: usesNewtonMeters ? ' N·m' : ' lb-in',
    series,
  };
}

function formatChartNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(value);
}

function PerformanceExplorer({
  tables,
}: {
  tables: EngineeringDataTable[];
}) {
  const groups = useMemo(
    () =>
      (['torque', 'flow', 'performance'] as const)
        .map((kind) => buildChartGroup(tables, kind))
        .filter((group): group is ChartGroup => group !== null),
    [tables],
  );

  const [activeMetric, setActiveMetric] = useState<ChartKind>(
    groups[0]?.id ?? 'torque',
  );
  const [selectedByMetric, setSelectedByMetric] = useState<
    Partial<Record<ChartKind, string>>
  >({});

  if (groups.length === 0) return null;

  const activeGroup =
    groups.find((group) => group.id === activeMetric) ?? groups[0];

  const requestedLabel = selectedByMetric[activeGroup.id];
  const activeSeries =
    activeGroup.series.find((item) => item.label === requestedLabel) ??
    activeGroup.series[0];

  if (!activeSeries) return null;

  const lastPoint = activeSeries.points[activeSeries.points.length - 1];

  return (
    <section className="overflow-hidden rounded-[26px] border border-[#cfe0d3] bg-white shadow-[0_18px_50px_rgba(18,55,34,0.08)] sm:rounded-[30px]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-[#d9e4dc] bg-[#123823] px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), radial-gradient(circle at 80% 10%, rgba(126,224,160,0.14), transparent 28%)',
            backgroundSize: '28px 28px, 28px 28px, 100% 100%',
          }}
        />

        <div className="relative">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#7ee0a0]">
                <Activity className="h-3.5 w-3.5" />
                {activeGroup.eyebrow}
              </span>

              <h3 className="mt-2 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
                {activeGroup.title}
              </h3>

              <p className="mt-2 max-w-2xl text-[12.5px] leading-5 text-white/70 sm:text-[13.5px] sm:leading-6">
                {activeGroup.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              <div className="rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-2.5 backdrop-blur-sm">
                <span className="block text-[8px] font-extrabold uppercase tracking-[0.16em] text-white/50">
                  {activeGroup.selectorLabel}
                </span>
                <strong className="mt-0.5 block text-sm text-white">
                  {activeSeries.displayLabel}
                </strong>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-2.5 backdrop-blur-sm">
                <span className="block text-[8px] font-extrabold uppercase tracking-[0.16em] text-white/50">
                  Published endpoint
                </span>
                <strong className="mt-0.5 block whitespace-nowrap text-sm text-white">
                  {formatChartNumber(lastPoint.x)} /{' '}
                  {formatChartNumber(lastPoint.y)}
                  {activeGroup.yValueSuffix}
                </strong>
              </div>
            </div>
          </div>

          {/* Torque / Cv tabs appear only when both are available. */}
          {groups.length > 1 && (
            <div className="mt-5 flex gap-2 border-t border-white/10 pt-4">
              {groups.map((group) => {
                const active = group.id === activeGroup.id;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveMetric(group.id)}
                    className={[
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.09em] transition-all',
                      active
                        ? 'border-[#7ee0a0] bg-[#7ee0a0] text-[#123823]'
                        : 'border-white/15 bg-white/[0.05] text-white/70 hover:border-white/30 hover:text-white',
                    ].join(' ')}
                  >
                    {group.id === 'torque' ? (
                      <Gauge className="h-3.5 w-3.5" />
                    ) : (
                      <BarChart3 className="h-3.5 w-3.5" />
                    )}
                    {group.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Series selector */}
        {activeGroup.series.length > 1 && (
          <div className="mb-5">
            <span className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#6c8276]">
              Select {activeGroup.selectorLabel.toLowerCase()}
            </span>

            <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-2">
                {activeGroup.series.map((item) => {
                  const active = item.label === activeSeries.label;

                  return (
                    <button
                      key={`${activeGroup.id}-${item.label}`}
                      type="button"
                      onClick={() =>
                        setSelectedByMetric((current) => ({
                          ...current,
                          [activeGroup.id]: item.label,
                        }))
                      }
                      className={[
                        'rounded-full border px-3.5 py-2 text-[11px] font-extrabold transition-all duration-200 sm:px-4',
                        active
                          ? 'border-[#168447] bg-[#168447] text-white shadow-[0_6px_18px_rgba(22,132,71,0.22)]'
                          : 'border-[#d2dfd6] bg-[#f7faf7] text-[#486155] hover:border-[#8eb59a] hover:bg-white hover:text-[#173e29]',
                      ].join(' ')}
                    >
                      {item.displayLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="rounded-[20px] border border-[#dce6de] bg-[#fbfdfb] px-0.5 py-4 sm:rounded-[22px] sm:px-4 sm:py-5">
          <div className="h-[260px] w-full sm:h-[330px] lg:h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={activeSeries.points}
                margin={{ top: 12, right: 18, left: 2, bottom: 10 }}
              >
                <CartesianGrid stroke="#dfe9e2" strokeDasharray="4 5" />

                <XAxis
                  dataKey="x"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tick={{ fill: '#667b70', fontSize: 10.5 }}
                  axisLine={{ stroke: '#b9ccbe' }}
                  tickLine={{ stroke: '#b9ccbe' }}
                  label={{
                    value: activeGroup.xAxisLabel,
                    position: 'insideBottom',
                    offset: -5,
                    fill: '#5f7468',
                    fontSize: 10.5,
                  }}
                />

                <YAxis
                  width={58}
                  tick={{ fill: '#667b70', fontSize: 10.5 }}
                  axisLine={{ stroke: '#b9ccbe' }}
                  tickLine={{ stroke: '#b9ccbe' }}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat('en-US', {
                      notation: value >= 10000 ? 'compact' : 'standard',
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                  label={{
                    value: activeGroup.yAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#5f7468',
                    fontSize: 10.5,
                  }}
                />

                <Tooltip
                  cursor={{
                    stroke: '#91ad99',
                    strokeDasharray: '4 4',
                  }}
                  contentStyle={{
                    borderRadius: 14,
                    border: '1px solid #cfe0d3',
                    background: 'rgba(255,255,255,0.98)',
                    boxShadow: '0 14px 34px rgba(18,55,34,0.12)',
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [
                    `${formatChartNumber(Number(value))}${activeGroup.yValueSuffix}`,
                    activeGroup.yAxisLabel,
                  ]}
                  labelFormatter={(value) =>
                    `${activeGroup.xAxisLabel}: ${formatChartNumber(
                      Number(value),
                    )}`
                  }
                />

                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#168447"
                  strokeWidth={3}
                  dot={{
                    r: 3.5,
                    fill: '#ffffff',
                    stroke: '#168447',
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: '#168447',
                    stroke: '#ffffff',
                    strokeWidth: 2,
                  }}
                  isAnimationActive
                  animationDuration={500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#dce6de] bg-[#f4f8f4] px-4 py-3">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#168447]" />
          <p className="text-[11.5px] leading-5 text-[#60756a]">
            This chart is a visual interpretation of the exact PDC engineering
            dataset shown below. Use the published table values for final
            engineering selection and verification.
          </p>
        </div>
      </div>
    </section>
  );
}


/**
 * Keep engineering datasets in one consistent visual order across every
 * product, regardless of how the source product file happens to be arranged.
 *
 * Performance/curve data comes first, dimensional/selection data follows,
 * and construction/material data stays at the end.
 */
function getEngineeringTablePriority(
  table: EngineeringDataTable,
): number {
  switch (table.kind) {
    case 'torque':
      return 10;
    case 'flow':
      return 20;
    case 'performance':
      return 30;
    case 'dimensions':
      return 40;
    case 'models':
      return 50;
    case 'general':
      return 60;
    case 'materials':
      return 90;
    default:
      return 70;
  }
}

function orderEngineeringTables(
  tables: EngineeringDataTable[],
): EngineeringDataTable[] {
  return tables
    .map((table, index) => ({ table, index }))
    .sort((a, b) => {
      const priorityDifference =
        getEngineeringTablePriority(a.table) -
        getEngineeringTablePriority(b.table);

      // Preserve the product's original order inside the same category.
      return priorityDifference !== 0
        ? priorityDifference
        : a.index - b.index;
    })
    .map(({ table }) => table);
}



function ElectricActuatorModelExplorer({
  table,
}: {
  table: EngineeringDataTable;
}) {
  const modelIndex = 0;
  const torqueNmIndex = table.columns.findIndex((column) =>
    /torque\s*n/i.test(column),
  );
  const torqueLbIndex = table.columns.findIndex((column) =>
    /torque\s*in/i.test(column),
  );
  const weightKgIndex = table.columns.findIndex((column) =>
    /weight\s*kg/i.test(column),
  );
  const weightLbIndex = table.columns.findIndex((column) =>
    /weight\s*lb/i.test(column),
  );
  const isoIndex = table.columns.findIndex((column) =>
    /iso\s*5211/i.test(column),
  );
  const overrideIndex = table.columns.findIndex((column) =>
    /manual\s*override/i.test(column),
  );
  const runningIndex = table.columns.findIndex((column) =>
    /running\s*time/i.test(column),
  );
  const motorIndex = table.columns.findIndex((column) =>
    /motor\s*sec/i.test(column),
  );
  const springIndex = table.columns.findIndex((column) =>
    /spring\s*sec/i.test(column),
  );

  const rows = table.rows.filter((row) => row[modelIndex]);
  const [selectedModel, setSelectedModel] = useState(
    rows[0]?.[modelIndex] ?? '',
  );

  const selectedRow =
    rows.find((row) => row[modelIndex] === selectedModel) ??
    rows[0];

  const torqueChartData = rows
    .map((row) => ({
      model: row[modelIndex],
      torque:
        torqueNmIndex >= 0
          ? parseNumeric(row[torqueNmIndex] ?? '')
          : null,
    }))
    .filter(
      (
        point,
      ): point is {
        model: string;
        torque: number;
      } => point.torque !== null,
    );

  if (!selectedRow || rows.length === 0) return null;

  const valueAt = (index: number, suffix = '') => {
    if (index < 0) return '—';
    const value = selectedRow[index];
    return value ? `${value}${suffix}` : '—';
  };

  const isSpringPack = springIndex >= 0;
  const runningTime = isSpringPack
    ? `${valueAt(motorIndex, ' s')} motor / ${valueAt(
        springIndex,
        ' s',
      )} spring`
    : valueAt(runningIndex, ' s');

  return (
    <section className="overflow-hidden rounded-[26px] border border-[#cfe0d3] bg-white shadow-[0_18px_50px_rgba(18,55,34,0.08)] sm:rounded-[30px]">
      <div className="relative overflow-hidden border-b border-[#d9e4dc] bg-[#123823] px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), radial-gradient(circle at 80% 10%, rgba(126,224,160,0.14), transparent 28%)',
            backgroundSize:
              '28px 28px, 28px 28px, 100% 100%',
          }}
        />

        <div className="relative">
          <span className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#7ee0a0]">
            <Gauge className="h-3.5 w-3.5" />
            Interactive model selection
          </span>

          <h3 className="mt-2 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
            {isSpringPack
              ? 'PDCS Model Performance Explorer'
              : 'PDCQ Model Performance Explorer'}
          </h3>

          <p className="mt-2 max-w-3xl text-[12.5px] leading-5 text-white/70 sm:text-[13.5px] sm:leading-6">
            Compare the published electric-actuator model range, then
            select a model to inspect exact torque, weight, ISO mounting,
            manual override and operating-time data.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <span className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#6c8276]">
          Select model
        </span>

        <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2">
            {rows.map((row) => {
              const model = row[modelIndex];
              const active = model === selectedModel;

              return (
                <button
                  key={model}
                  type="button"
                  onClick={() => setSelectedModel(model)}
                  className={[
                    'rounded-full border px-3.5 py-2 text-[11px] font-extrabold transition-all',
                    active
                      ? 'border-[#168447] bg-[#168447] text-white shadow-[0_6px_18px_rgba(22,132,71,0.22)]'
                      : 'border-[#d2dfd6] bg-[#f7faf7] text-[#486155] hover:border-[#8eb59a] hover:bg-white hover:text-[#173e29]',
                  ].join(' ')}
                >
                  {model}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            [
              'Output torque',
              `${valueAt(torqueNmIndex, ' N·m')} / ${valueAt(
                torqueLbIndex,
                ' in-lbs',
              )}`,
            ],
            [
              'Weight',
              `${valueAt(weightKgIndex, ' kg')} / ${valueAt(
                weightLbIndex,
                ' lb',
              )}`,
            ],
            ['ISO 5211 base', valueAt(isoIndex)],
            ['Manual override', valueAt(overrideIndex)],
            ['90° operating time', runningTime],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[16px] border border-[#d9e4dc] bg-[#f7faf7] p-3.5 shadow-[0_6px_18px_rgba(18,55,34,0.035)] sm:p-4"
            >
              <span className="block text-[8px] font-extrabold uppercase tracking-[0.13em] text-[#7b8f83]">
                {label}
              </span>
              <strong className="mt-1.5 block text-[13px] font-extrabold leading-5 tracking-tight text-[#153a25] sm:text-sm">
                {value}
              </strong>
            </div>
          ))}
        </div>

        {torqueChartData.length > 1 && (
          <div className="mt-5 rounded-[20px] border border-[#dce6de] bg-[#fbfdfb] px-0.5 py-4 sm:rounded-[22px] sm:px-4 sm:py-5">
            <div className="mb-3 px-3 sm:px-0">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#168447]">
                Published model comparison
              </span>
              <h4 className="mt-1 text-sm font-extrabold text-[#173e29]">
                Output Torque by Model
              </h4>
            </div>

            <div className="h-[260px] w-full sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={torqueChartData}
                  margin={{ top: 12, right: 18, left: 2, bottom: 10 }}
                >
                  <CartesianGrid
                    stroke="#dfe9e2"
                    strokeDasharray="4 5"
                  />

                  <XAxis
                    dataKey="model"
                    tick={{ fill: '#667b70', fontSize: 9.5 }}
                    axisLine={{ stroke: '#b9ccbe' }}
                    tickLine={{ stroke: '#b9ccbe' }}
                    interval="preserveStartEnd"
                  />

                  <YAxis
                    width={58}
                    tick={{ fill: '#667b70', fontSize: 10.5 }}
                    axisLine={{ stroke: '#b9ccbe' }}
                    tickLine={{ stroke: '#b9ccbe' }}
                    tickFormatter={(value) =>
                      new Intl.NumberFormat('en-US', {
                        notation:
                          value >= 1000 ? 'compact' : 'standard',
                        maximumFractionDigits: 1,
                      }).format(value)
                    }
                    label={{
                      value: 'Torque (N·m)',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#5f7468',
                      fontSize: 10.5,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: 14,
                      border: '1px solid #cfe0d3',
                      background: 'rgba(255,255,255,0.98)',
                      boxShadow:
                        '0 14px 34px rgba(18,55,34,0.12)',
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [
                      `${formatChartNumber(Number(value))} N·m`,
                      'Output torque',
                    ]}
                  />

                  <Line
                    type="monotone"
                    dataKey="torque"
                    stroke="#168447"
                    strokeWidth={3}
                    dot={{
                      r: 3.5,
                      fill: '#ffffff',
                      stroke: '#168447',
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 6,
                      fill: '#168447',
                      stroke: '#ffffff',
                      strokeWidth: 2,
                    }}
                    isAnimationActive
                    animationDuration={450}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#dce6de] bg-[#f4f8f4] px-4 py-3">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#168447]" />
          <p className="text-[11.5px] leading-5 text-[#60756a]">
            The chart compares published model torque values. It is not a
            continuous operating curve. Use the exact PDC model table below
            for final selection and verification.
          </p>
        </div>
      </div>
    </section>
  );
}

type SpringReturnPoint = {
  pressure: number;
  torque0: number | null;
  torque90: number | null;
};

function readCellNumber(value?: string): number | null {
  if (!value) return null;
  return parseNumeric(value);
}

function SpringReturnExplorer({
  table,
}: {
  table: EngineeringDataTable;
}) {
  const models = useMemo(
    () => Array.from(new Set(table.rows.map((row) => row[0]).filter(Boolean))),
    [table.rows],
  );

  const [model, setModel] = useState(models[0] ?? '');

  const springOptions = useMemo(
    () =>
      table.rows
        .filter((row) => row[0] === model)
        .map((row) => row[1])
        .filter(Boolean),
    [model, table.rows],
  );

  const defaultSpring = useMemo(() => {
    const candidates = table.rows.filter((row) => row[0] === model);

    return (
      candidates
        .map((row) => ({
          spring: row[1],
          coverage: [2, 4, 6, 8, 10, 12, 14].filter(
            (index) => row[index] || row[index + 1],
          ).length,
        }))
        .sort((a, b) => b.coverage - a.coverage)[0]?.spring ??
      springOptions[0] ??
      ''
    );
  }, [model, springOptions, table.rows]);

  const [springQtyByModel, setSpringQtyByModel] = useState<
    Record<string, string>
  >({});

  const springQty =
    springQtyByModel[model] &&
    springOptions.includes(springQtyByModel[model])
      ? springQtyByModel[model]
      : defaultSpring;

  const selectedRow =
    table.rows.find(
      (row) => row[0] === model && row[1] === springQty,
    ) ?? table.rows[0];

  const pressureMap = [
    { pressure: 40, start: 2 },
    { pressure: 50, start: 4 },
    { pressure: 60, start: 6 },
    { pressure: 65, start: 8 },
    { pressure: 80, start: 10 },
    { pressure: 90, start: 12 },
    { pressure: 115, start: 14 },
  ];

  const chartData: SpringReturnPoint[] = selectedRow
    ? pressureMap
        .map(({ pressure, start }) => ({
          pressure,
          torque0: readCellNumber(selectedRow[start]),
          torque90: readCellNumber(selectedRow[start + 1]),
        }))
        .filter(
          (point) =>
            point.torque0 !== null || point.torque90 !== null,
        )
    : [];

  const availablePressures = chartData.map((point) => point.pressure);
  const [pressureBySelection, setPressureBySelection] = useState<
    Record<string, number>
  >({});

  const selectionKey = `${model}-${springQty}`;
  const selectedPressure =
    pressureBySelection[selectionKey] &&
    availablePressures.includes(pressureBySelection[selectionKey])
      ? pressureBySelection[selectionKey]
      : availablePressures[0];

  const selectedPressurePoint =
    chartData.find((point) => point.pressure === selectedPressure) ??
    chartData[0];

  const springOutput0 = selectedRow
    ? readCellNumber(selectedRow[16])
    : null;
  const springOutput90 = selectedRow
    ? readCellNumber(selectedRow[17])
    : null;

  if (!selectedRow || models.length === 0) return null;

  const metricValue = (value: number | null | undefined) =>
    value === null || value === undefined
      ? '—'
      : `${formatChartNumber(value)} in-lbs`;

  return (
    <section className="overflow-hidden rounded-[26px] border border-[#cfe0d3] bg-white shadow-[0_18px_50px_rgba(18,55,34,0.08)] sm:rounded-[30px]">
      <div className="relative overflow-hidden border-b border-[#d9e4dc] bg-[#123823] px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), radial-gradient(circle at 80% 10%, rgba(126,224,160,0.14), transparent 28%)',
            backgroundSize:
              '28px 28px, 28px 28px, 100% 100%',
          }}
        />

        <div className="relative">
          <span className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#7ee0a0]">
            <Gauge className="h-3.5 w-3.5" />
            Interactive actuator selection
          </span>

          <h3 className="mt-2 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
            Spring Return Torque Explorer
          </h3>

          <p className="mt-2 max-w-3xl text-[12.5px] leading-5 text-white/70 sm:text-[13.5px] sm:leading-6">
            Select the actuator model and installed spring quantity to
            inspect PDC&apos;s published air-stroke torque across the
            available supply-pressure range together with the spring
            return output.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <span className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#6c8276]">
              Actuator model
            </span>

            <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-2">
                {models.map((item) => {
                  const active = item === model;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setModel(item)}
                      className={[
                        'rounded-full border px-3.5 py-2 text-[11px] font-extrabold transition-all',
                        active
                          ? 'border-[#168447] bg-[#168447] text-white shadow-[0_6px_18px_rgba(22,132,71,0.22)]'
                          : 'border-[#d2dfd6] bg-[#f7faf7] text-[#486155] hover:border-[#8eb59a] hover:bg-white hover:text-[#173e29]',
                      ].join(' ')}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <span className="mb-2 mt-3 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#6c8276]">
              Spring quantity
            </span>

            <div className="flex flex-wrap gap-2">
              {springOptions.map((item) => {
                const active = item === springQty;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setSpringQtyByModel((current) => ({
                        ...current,
                        [model]: item,
                      }))
                    }
                    className={[
                      'min-w-10 rounded-xl border px-3 py-2 text-[11px] font-extrabold transition-all',
                      active
                        ? 'border-[#174d30] bg-[#174d30] text-white'
                        : 'border-[#d2dfd6] bg-white text-[#486155] hover:border-[#8eb59a]',
                    ].join(' ')}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[18px] border border-[#d9e4dc] bg-[#f5f9f6] p-4">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#6c8276]">
              Inspect pressure
            </span>

            <div className="mt-3 flex flex-wrap gap-2">
              {availablePressures.map((pressure) => (
                <button
                  key={pressure}
                  type="button"
                  onClick={() =>
                    setPressureBySelection((current) => ({
                      ...current,
                      [selectionKey]: pressure,
                    }))
                  }
                  className={[
                    'rounded-full border px-3 py-1.5 text-[10px] font-extrabold transition-all',
                    pressure === selectedPressure
                      ? 'border-[#168447] bg-[#168447] text-white'
                      : 'border-[#cedbd1] bg-white text-[#486155]',
                  ].join(' ')}
                >
                  {pressure} PSI
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            [
              `Air @ ${selectedPressure ?? '—'} PSI`,
              '0° torque',
              metricValue(selectedPressurePoint?.torque0),
            ],
            [
              `Air @ ${selectedPressure ?? '—'} PSI`,
              '90° torque',
              metricValue(selectedPressurePoint?.torque90),
            ],
            ['Spring output', '0° torque', metricValue(springOutput0)],
            ['Spring output', '90° torque', metricValue(springOutput90)],
          ].map(([eyebrow, label, value]) => (
            <div
              key={`${eyebrow}-${label}`}
              className="rounded-[16px] border border-[#d9e4dc] bg-white p-3.5 shadow-[0_6px_18px_rgba(18,55,34,0.04)] sm:p-4"
            >
              <span className="block text-[8px] font-extrabold uppercase tracking-[0.13em] text-[#7b8f83]">
                {eyebrow}
              </span>
              <span className="mt-1 block text-[11px] font-bold text-[#486155]">
                {label}
              </span>
              <strong className="mt-1.5 block text-[15px] font-extrabold tracking-tight text-[#153a25] sm:text-base">
                {value}
              </strong>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[20px] border border-[#dce6de] bg-[#fbfdfb] px-0.5 py-4 sm:rounded-[22px] sm:px-4 sm:py-5">
          <div className="h-[270px] w-full sm:h-[340px] lg:h-[390px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 12, right: 18, left: 4, bottom: 10 }}
              >
                <CartesianGrid
                  stroke="#dfe9e2"
                  strokeDasharray="4 5"
                />

                <XAxis
                  dataKey="pressure"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tick={{ fill: '#667b70', fontSize: 10.5 }}
                  axisLine={{ stroke: '#b9ccbe' }}
                  tickLine={{ stroke: '#b9ccbe' }}
                  label={{
                    value: 'Air supply pressure (PSI)',
                    position: 'insideBottom',
                    offset: -5,
                    fill: '#5f7468',
                    fontSize: 10.5,
                  }}
                />

                <YAxis
                  width={62}
                  tick={{ fill: '#667b70', fontSize: 10.5 }}
                  axisLine={{ stroke: '#b9ccbe' }}
                  tickLine={{ stroke: '#b9ccbe' }}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat('en-US', {
                      notation:
                        value >= 10000 ? 'compact' : 'standard',
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                  label={{
                    value: 'Air output torque (in-lbs)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#5f7468',
                    fontSize: 10.5,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    border: '1px solid #cfe0d3',
                    background: 'rgba(255,255,255,0.98)',
                    boxShadow:
                      '0 14px 34px rgba(18,55,34,0.12)',
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => [
                    `${formatChartNumber(Number(value))} in-lbs`,
                    name === 'torque0' ? '0° torque' : '90° torque',
                  ]}
                  labelFormatter={(value) => `${value} PSI`}
                />

                <Line
                  type="monotone"
                  dataKey="torque0"
                  connectNulls={false}
                  stroke="#168447"
                  strokeWidth={3}
                  dot={{
                    r: 3.5,
                    fill: '#ffffff',
                    stroke: '#168447',
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 6 }}
                  isAnimationActive
                  animationDuration={450}
                />

                <Line
                  type="monotone"
                  dataKey="torque90"
                  connectNulls={false}
                  stroke="#49655a"
                  strokeWidth={2.5}
                  strokeDasharray="7 5"
                  dot={{
                    r: 3,
                    fill: '#ffffff',
                    stroke: '#49655a',
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 5 }}
                  isAnimationActive
                  animationDuration={450}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 px-3 text-[10px] font-bold text-[#60756a]">
            <span className="inline-flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#168447]" />
              Air torque at 0°
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-0.5 w-5 border-t-2 border-dashed border-[#49655a]" />
              Air torque at 90°
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#dce6de] bg-[#f4f8f4] px-4 py-3">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#168447]" />
          <p className="text-[11.5px] leading-5 text-[#60756a]">
            Blank combinations are intentionally omitted because PDC
            publishes no value for those model, spring and pressure
            combinations. Use the exact engineering table below for final
            verification.
          </p>
        </div>
      </div>
    </section>
  );
}

function DataTable({ table }: { table: EngineeringDataTable }) {
  return (
    <div>
      {table.description && (
        <p className="mb-4 max-w-3xl text-sm leading-6 text-[#5c6f64]">
          {table.description}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#d5e1d8] bg-white shadow-[0_6px_20px_rgba(18,55,34,0.05)]">
        <div className="overflow-x-auto [scrollbar-color:#9bb7a4_#edf3ee]">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                {table.columns.map((column, index) => (
                  <th
                    key={`${table.id}-head-${index}`}
                    className={[
                      'whitespace-nowrap border-b border-[#cfdcd2] bg-[#edf3ee] px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#274536] sm:px-5',
                      index === 0
                        ? 'sticky left-0 z-20 min-w-[110px] border-r border-[#cfdcd2] shadow-[8px_0_16px_rgba(10,23,16,0.04)]'
                        : '',
                    ].join(' ')}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr
                  key={`${table.id}-row-${rowIndex}`}
                  className="group/row"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${table.id}-${rowIndex}-${cellIndex}`}
                      className={[
                        'whitespace-nowrap border-b border-[#e2e9e4] px-4 py-3 text-[12.5px] text-[#4d6156] transition-colors group-hover/row:bg-[#f6faf7] sm:px-5 sm:text-[13px]',
                        cellIndex === 0
                          ? 'sticky left-0 z-10 border-r border-[#dbe5dd] bg-white font-bold text-[#183d28] shadow-[8px_0_16px_rgba(10,23,16,0.035)] group-hover/row:bg-[#f3f8f4]'
                          : '',
                      ].join(' ')}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {table.notes && table.notes.length > 0 && (
        <div className="mt-4 space-y-2 border-l-2 border-[#7cb08c] pl-4">
          {table.notes.map((note) => (
            <p key={note} className="text-xs leading-5 text-[#64776c]">
              {note}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EngineeringDataSection({
  engineering,
}: {
  engineering: ProductEngineeringData;
}) {
  const tables = engineering.tables ?? [];
  const optionGroups = engineering.optionGroups ?? [];

  const orderedTables = useMemo(
    () => orderEngineeringTables(tables),
    [tables],
  );

  const [activeId, setActiveId] = useState(
    orderedTables[0]?.id ?? '',
  );

  const activeTable = useMemo(
    () =>
      orderedTables.find((table) => table.id === activeId) ??
      orderedTables[0],
    [activeId, orderedTables],
  );

  if (tables.length === 0 && optionGroups.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Electric actuator model selector for PDCQ / PDCS. */}
      {orderedTables
        .filter((table) => table.id === 'model-performance')
        .map((table) => (
          <ElectricActuatorModelExplorer
            key={table.id}
            table={table}
          />
        ))}

      {/* Specialized spring-return selector when that published matrix exists. */}
      {orderedTables
        .filter((table) => table.id === 'spring-return-output-torque')
        .map((table) => (
          <SpringReturnExplorer key={table.id} table={table} />
        ))}

      {/* Universal chart layer.
          Automatically renders Torque, Cv and performance datasets when the
          published table format contains chartable numeric axes. */}
      <PerformanceExplorer tables={orderedTables} />

      {tables.length > 0 && (
        <>
          {/* Desktop technical dataset console */}
          <div className="relative hidden overflow-hidden rounded-[30px] border border-[#d5e1d8] bg-[#f4f8f4] shadow-[0_22px_60px_rgba(18,55,34,0.09)] lg:block">
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(22,132,71,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(22,132,71,0.028) 1px, transparent 1px), radial-gradient(circle at 100% 0%, rgba(22,132,71,0.09), transparent 30%)',
                backgroundSize: '30px 30px, 30px 30px, 100% 100%',
              }}
            />

            <div className="relative border-b border-[#d7e2da] bg-white/80 p-4 xl:p-5">
              <div className="mb-3 flex items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#168447]">
                  <Settings2 className="h-3.5 w-3.5" />
                  Published engineering datasets
                </div>

                <span className="text-[10px] font-semibold text-[#6b8175]">
                  Select a dataset to inspect exact published values.
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {orderedTables.map((table, index) => {
                  const active = activeTable?.id === table.id;

                  return (
                    <button
                      key={table.id}
                      type="button"
                      onClick={() => setActiveId(table.id)}
                      className={[
                        'group inline-flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300',
                        active
                          ? 'border-[#174d30] bg-[#174d30] text-white shadow-[0_8px_20px_rgba(20,77,48,0.18)]'
                          : 'border-[#cfdcd2] bg-white text-[#365447] hover:border-[#91b59d] hover:bg-[#f8fbf8] hover:text-[#123823]',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'flex h-8 w-8 items-center justify-center rounded-lg border',
                          active
                            ? 'border-white/20 bg-white/10 text-white'
                            : 'border-[#d7e3da] bg-[#edf5ef] text-[#168447]',
                        ].join(' ')}
                      >
                        <TableIcon kind={table.kind} />
                      </span>

                      <span>
                        <span
                          className={[
                            'block font-mono text-[8px] font-black tracking-[0.12em]',
                            active ? 'text-white/65' : 'text-[#7b9185]',
                          ].join(' ')}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="mt-0.5 block text-xs font-extrabold">
                          {table.tabLabel ?? table.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative bg-white/85 p-6 xl:p-8">
              {activeTable && (
                <>
                  <div className="mb-6 flex items-start justify-between gap-6">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#168447]">
                        Exact source data
                      </span>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-[#123823]">
                        {activeTable.title}
                      </h3>
                    </div>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#cbdacd] bg-[#edf5ef] text-[#168447]">
                      <TableIcon kind={activeTable.kind} />
                    </span>
                  </div>

                  <DataTable table={activeTable} />
                </>
              )}
            </div>
          </div>

          {/* Mobile / tablet exact-data accordions */}
          <div className="space-y-3 lg:hidden">
            <div className="mb-1 flex items-center gap-2 px-1 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#168447]">
              <Table2 className="h-3.5 w-3.5" />
              Exact published data
            </div>

            {orderedTables.map((table, index) => (
              <details
                key={table.id}
                className="group overflow-hidden rounded-2xl border border-[#d5e1d8] bg-white shadow-[0_8px_22px_rgba(18,55,34,0.055)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 marker:hidden sm:px-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9f3eb] text-[#168447]">
                    <TableIcon kind={table.kind} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7b9085]">
                      Dataset {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-0.5 block text-sm font-extrabold leading-tight text-[#173e29]">
                      {table.tabLabel ?? table.title}
                    </span>
                  </span>

                  <ChevronDown className="h-5 w-5 shrink-0 text-[#168447] transition-transform duration-300 group-open:rotate-180" />
                </summary>

                <div className="border-t border-[#dce6de] bg-[#f7faf7] px-3 pb-5 pt-4 sm:px-5">
                  <h3 className="mb-3 text-base font-extrabold tracking-tight text-[#123823]">
                    {table.title}
                  </h3>
                  <DataTable table={table} />
                </div>
              </details>
            ))}
          </div>
        </>
      )}

      {optionGroups.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {optionGroups.map((group) => (
            <div
              key={group.title}
              className="overflow-hidden rounded-[22px] border border-[#d5e1d8] bg-white shadow-[0_10px_28px_rgba(18,55,34,0.06)]"
            >
              <div className="flex items-center gap-3 border-b border-[#dce6de] bg-[#f2f7f3] px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6f2e9] text-[#168447]">
                  <Settings2 className="h-4 w-4" />
                </span>
                <h4 className="text-sm font-extrabold tracking-tight text-[#123823]">
                  {group.title}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {group.items.map((item, index) => (
                  <div
                    key={`${group.title}-${item}`}
                    className="flex items-start gap-3 border-b border-[#e4ebe6] px-5 py-3.5 sm:border-r"
                  >
                    <span className="mt-0.5 font-mono text-[9px] font-black text-[#168447]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[13px] leading-5 text-[#52675b]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
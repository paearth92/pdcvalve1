import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, CircleAlert, FolderOpen } from 'lucide-react';

export const fieldClass = 'min-h-11 w-full rounded-lg border border-[#bccfc4] bg-white px-3 py-2 text-sm text-[#17372a] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green';
export const buttonClass = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-green-dark px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green disabled:opacity-60';
export const linkClass = 'font-semibold text-brand-green-dark underline decoration-[#a8c7b5] underline-offset-4 hover:decoration-brand-green';

export function PdcLogo() {
  return <Image src="/images/pdc-logo.png" width={170} height={64} className="h-10 w-auto object-contain" alt="PDC Valves & Actuators" priority />;
}

export function PageHeading({ title, description, back }: { title: string; description?: string; back?: { label: string; href: string } }) {
  return (
    <header className="grid gap-2">
      {back && <Link className={`mb-1 inline-flex w-fit items-center gap-1 text-xs ${linkClass}`} href={back.href}><ChevronLeft aria-hidden="true" size={15} />{back.label}</Link>}
      <h1 className="break-words text-3xl font-bold tracking-tight text-brand-green-dark md:text-4xl">{title}</h1>
      {description && <p className="max-w-2xl text-sm leading-relaxed text-[#526b5e]">{description}</p>}
    </header>
  );
}

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: { label: string; href: string } }) {
  return (
    <section className="min-w-0 rounded-xl border border-[#d6e1da] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2ebe5] px-4 py-4 sm:px-6">
        <h2 className="text-base font-bold text-brand-green-dark">{title}</h2>
        {action && <Link className={`inline-flex items-center gap-1 text-xs ${linkClass}`} href={action.href}>{action.label}<ArrowUpRight aria-hidden="true" size={14} /></Link>}
      </div>
      {children}
    </section>
  );
}

export function Empty({ message }: { message: string }) {
  return <div className="flex items-center gap-3 px-4 py-7 text-sm text-[#526b5e] sm:px-6"><FolderOpen size={19} className="shrink-0 text-brand-green" aria-hidden="true" />{message}</div>;
}

export function Notice({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return (
    <div role={error ? 'alert' : 'status'} className={`flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-900' : 'border-[#bad2c2] bg-[#eaf4ee] text-brand-green-dark'}`}>
      <CircleAlert className="mt-0.5 shrink-0" size={17} aria-hidden="true" />{children}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid min-w-0 gap-1.5 text-sm font-semibold text-brand-green-dark">{label}{children}</label>;
}

export function DataTable({ label, columns, rows, empty }: { label: string; columns: string[]; rows: ReactNode[][]; empty: string }) {
  if (!rows.length) return <Empty message={empty} />;
  return (
    <div aria-label={label} role="region" tabIndex={0} className="overflow-x-auto rounded-b-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green">
      <table className="w-full min-w-max table-auto text-left text-sm">
        <caption className="sr-only">{label}</caption>
        <thead className="bg-[#eff5f1] text-xs text-[#3e5f4e]">
          <tr>{columns.map((column) => <th key={column} scope="col" className="px-4 py-3 font-bold sm:px-6">{column}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-[#e4ece7] text-[#203e30]">
          {rows.map((row, index) => <tr key={index}>{row.map((cell, i) => <td key={i} className="max-w-xs whitespace-normal px-4 py-3 align-middle sm:px-6">{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

export function Status({ value }: { value: string }) {
  const normalized = value.replace(/_/g, ' ');
  const color = /cancelled|failed|overdue/i.test(value)
    ? 'bg-red-50 text-red-900'
    : /await|received|partial|pending|open/i.test(value)
      ? 'bg-amber-50 text-amber-950'
      : 'bg-[#e9f4ec] text-brand-green-dark';
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${color}`}>{normalized}</span>;
}

export function Metric({ label, value, detail }: { label: string; value: ReactNode; detail?: string }) {
  return <div className="min-w-0 rounded-xl border border-[#d6e1da] bg-white p-4 shadow-sm sm:p-5"><p className="text-xs font-semibold text-[#526b5e]">{label}</p><p className="mt-2 break-words text-2xl font-bold tracking-tight text-brand-green-dark">{value}</p>{detail && <p className="mt-1 text-xs text-[#526b5e]">{detail}</p>}</div>;
}

export function Facts({ entries }: { entries: [string, ReactNode][] }) {
  return <dl className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">{entries.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs font-semibold text-[#526b5e]">{label}</dt><dd className="mt-1 break-words text-sm font-medium text-brand-green-dark">{value}</dd></div>)}</dl>;
}

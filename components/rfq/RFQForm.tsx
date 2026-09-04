'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Pencil,
  FileStack,
  FileText,
  Mail,
  Phone,
  X,
  ShieldCheck,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormField, FormTextArea, FormSelect } from '@/components/rfq/FormField';
import FileUpload from '@/components/rfq/FileUpload';
import { siteConfig } from '@/data/site';
import { productFamilies } from '@/data/site';
import { industries } from '@/data/site';
import type {
  RFQProjectInfo,
  RFQProjectRequirements,
  RFQAttachment,
  RFQErrors,
  RFQStep,
} from '@/types/rfq';
import { RFQ_STEPS } from '@/types/rfq';
import {
  validateProjectInfo,
  validateRequirements,
  hasErrors,
} from '@/lib/rfq-validation';

const initialProjectInfo: RFQProjectInfo = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  country: '',
  industry: '',
};

const initialRequirements: RFQProjectRequirements = {
  productFamily: '',
  product: '',
  quantity: '',
  application: '',
  operatingMedia: '',
  projectNotes: '',
};

const countryOptions = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'UAE', label: 'United Arab Emirates' },
  { value: 'Japan', label: 'Japan' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'China', label: 'China' },
  { value: 'India', label: 'India' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Other', label: 'Other' },
];

const industryOptions = industries.map((ind) => ({
  value: ind.name,
  label: ind.name,
}));

const familyOptions = productFamilies.map((fam) => ({
  value: fam.name,
  label: fam.name,
}));

export interface RFQFormProps {
  productFamily?: string;
  product?: string;
  series?: string;
  onSubmit: () => void;
  onClose: () => void;
}

export default function RFQForm({
  productFamily,
  product,
  series,
  onSubmit,
  onClose,
}: RFQFormProps) {
  const steps: RFQStep[] = RFQ_STEPS.slice(0, 4);

  const [stepIndex, setStepIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [projectInfo, setProjectInfo] = useState<RFQProjectInfo>(initialProjectInfo);
  const [requirements, setRequirements] = useState<RFQProjectRequirements>({
    ...initialRequirements,
    productFamily: productFamily ?? '',
    product: product ?? '',
  });
  const [attachments, setAttachments] = useState<RFQAttachment[]>([]);
  const [errors, setErrors] = useState<RFQErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const errorList = Object.entries(errors).filter(([, v]) => Boolean(v)) as [
    string,
    string,
  ][];

  // Validation failures previously rendered silently with focus left on the
  // Continue button. Pull focus to the summary so the failure is announced.
  useEffect(() => {
    if (errorList.length > 0) {
      errorSummaryRef.current?.focus({ preventScroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  // Each step starts from the top of the scroll region.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepIndex]);

  const goToStep = (index: number) => {
    if (index > maxReached) return;
    setStepIndex(index);
    setErrors({});
  };

  const handleNext = () => {
    if (currentStep.id === 'project-info') {
      const errs = validateProjectInfo(projectInfo);
      if (hasErrors(errs)) return setErrors(errs);
    }
    if (currentStep.id === 'requirements') {
      const errs = validateRequirements(requirements);
      if (hasErrors(errs)) return setErrors(errs);
    }
    if (currentStep.id === 'review') {
      setSubmitted(true);
      onSubmit();
      return;
    }

    const next = stepIndex + 1;
    setStepIndex(next);
    if (next > maxReached) setMaxReached(next);
    setErrors({});
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      setErrors({});
    }
  };

  const handleAddFiles = (files: File[]) => {
    setAttachments((prev) => [
      ...prev,
      ...files.map((file, i) => ({
        id: `att-${Date.now()}-${i}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    ]);
  };

  const handleRemoveFile = (id: string) =>
    setAttachments((prev) => prev.filter((a) => a.id !== id));

  if (submitted) return <ConfirmationStep onClose={onClose} />;

  const contextLabel = [productFamily, product, series && `Series ${series}`]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="flex h-full min-h-0 flex-col lg:flex-row">
      {/* ── Rail ─────────────────────────────────────────────── */}
      <aside className="shrink-0 bg-[#08180f] text-white lg:flex lg:w-[310px] lg:flex-col lg:justify-between lg:p-8">
        {/* Mobile bar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:hidden">
          <div className="min-w-0">
            <h2 id="rfq-title" className="truncate text-base font-extrabold tracking-tight">
              Request for Quote
            </h2>
            <p className="mt-0.5 text-[11px] text-white/55">
              Step {stepIndex + 1} of {steps.length} · {currentStep.label}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close request for quote"
            className="-mr-1 shrink-0 rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile progress bar */}
        <div className="h-0.5 w-full bg-white/10 lg:hidden">
          <div
            className="h-full bg-brand-green transition-[width] duration-500 ease-out"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Desktop rail */}
        <div className="hidden lg:block">
          <h2 className="text-xl font-extrabold leading-tight tracking-tight">
            Request for Quote
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">
            Tell us your operating conditions and our application engineers will
            specify the right package.
          </p>

          <ol className="mt-8 flex flex-col gap-1">
            {steps.map((s, i) => {
              const done = i < maxReached && i !== stepIndex;
              const active = i === stepIndex;
              const reachable = i <= maxReached;

              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goToStep(i)}
                    disabled={!reachable}
                    aria-current={active ? 'step' : undefined}
                    className={cn(
                      'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      active && 'bg-white/10',
                      reachable && !active && 'hover:bg-white/5',
                      !reachable && 'cursor-not-allowed opacity-40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-colors',
                        active && 'border-brand-green bg-brand-green text-white',
                        done && 'border-brand-green/50 bg-brand-green/15 text-brand-green',
                        !active && !done && 'border-white/25 text-white/50',
                      )}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        'text-[13px] font-semibold',
                        active ? 'text-white' : 'text-white/60',
                      )}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Rail footer */}
        <div className="hidden lg:block">
          {contextLabel && (
            <div className="mb-5 rounded-lg border border-brand-green/25 bg-brand-green/10 px-3.5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-green">
                Quoting
              </p>
              <p className="mt-1 text-[13px] font-semibold leading-snug text-white">
                {contextLabel}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2.5 border-t border-white/10 pt-5 text-[12px] text-white/55">
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-brand-green" />
              Response within 1–2 business days
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-green" />
              Reviewed only by PDC engineering
            </span>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Desktop close */}
        <div className="hidden justify-end px-6 pt-5 lg:flex">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close request for quote"
            className="rounded-md p-2 text-brand-steel/50 transition-colors hover:bg-brand-light-bg hover:text-brand-green-dark"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 lg:pt-0">
          {/* Announce step changes to assistive tech */}
          <p className="sr-only" aria-live="polite">
            Step {stepIndex + 1} of {steps.length}: {currentStep.label}
          </p>

          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
              Step {stepIndex + 1} of {steps.length}
            </span>
            <h3 className="mt-1.5 text-[1.35rem] font-extrabold tracking-tight text-brand-green-dark sm:text-2xl">
              {currentStep.label}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-brand-graphite/60">
              {currentStep.description}
            </p>
          </div>

          {errorList.length > 0 && (
            <div
              ref={errorSummaryRef}
              tabIndex={-1}
              role="alert"
              className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 outline-none ring-red-500/20 focus:ring-4"
            >
              <p className="flex items-center gap-2 text-[13px] font-bold text-red-700">
                <AlertCircle className="h-4 w-4" />
                {errorList.length === 1
                  ? 'One field needs attention'
                  : `${errorList.length} fields need attention`}
              </p>
              <ul className="mt-1.5 list-disc pl-8 text-[12px] text-red-700/85">
                {errorList.map(([field, msg]) => (
                  <li key={field}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {currentStep.id === 'project-info' && (
            <ProjectInfoStep data={projectInfo} onChange={setProjectInfo} errors={errors} />
          )}
          {currentStep.id === 'requirements' && (
            <RequirementsStep
              data={requirements}
              onChange={setRequirements}
              errors={errors}
              prefilledProduct={product}
              prefilledSeries={series}
            />
          )}
          {currentStep.id === 'attachments' && (
            <AttachmentsStep
              attachments={attachments}
              onAdd={handleAddFiles}
              onRemove={handleRemoveFile}
            />
          )}
          {currentStep.id === 'review' && (
            <ReviewStep
              projectInfo={projectInfo}
              requirements={requirements}
              attachments={attachments}
              onEdit={goToStep}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-brand-green-dark/10 bg-white px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={stepIndex === 0 ? onClose : handleBack}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-graphite/70 transition-colors hover:bg-brand-light-bg hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
          >
            <ArrowLeft className="h-4 w-4" />
            {stepIndex === 0 ? 'Cancel' : 'Back'}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-green-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/25"
          >
            {currentStep.id === 'review' ? 'Prepare Request' : 'Continue'}
            {currentStep.id === 'review' ? (
              <Check className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 1 ────────────────────────────────────────────────────────
function ProjectInfoStep({
  data,
  onChange,
  errors,
}: {
  data: RFQProjectInfo;
  onChange: (data: RFQProjectInfo) => void;
  errors: RFQErrors;
}) {
  const update = (field: keyof RFQProjectInfo, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <FormField
        name="companyName"
        label="Company Name"
        required
        autoComplete="organization"
        error={errors.companyName}
        value={data.companyName}
        onChange={(e) => update('companyName', e.target.value)}
        placeholder="Acme Industrial Inc."
      />
      <FormField
        name="contactName"
        label="Contact Name"
        required
        autoComplete="name"
        error={errors.contactName}
        value={data.contactName}
        onChange={(e) => update('contactName', e.target.value)}
        placeholder="John Smith"
      />
      <FormField
        name="email"
        type="email"
        inputMode="email"
        label="Email"
        required
        autoComplete="email"
        error={errors.email}
        value={data.email}
        onChange={(e) => update('email', e.target.value)}
        placeholder="john@acmeindustrial.com"
      />
      <FormField
        name="phone"
        type="tel"
        inputMode="tel"
        label="Phone"
        required
        autoComplete="tel"
        error={errors.phone}
        value={data.phone}
        onChange={(e) => update('phone', e.target.value)}
        placeholder="+1 (555) 123-4567"
      />
      <FormSelect
        name="country"
        label="Country"
        required
        autoComplete="country-name"
        error={errors.country}
        value={data.country}
        onChange={(e) => update('country', e.target.value)}
        options={countryOptions}
        placeholder="Select country"
      />
      <FormSelect
        name="industry"
        label="Industry"
        required
        error={errors.industry}
        value={data.industry}
        onChange={(e) => update('industry', e.target.value)}
        options={industryOptions}
        placeholder="Select industry"
      />
    </div>
  );
}

// ─── Step 2 ────────────────────────────────────────────────────────
function RequirementsStep({
  data,
  onChange,
  errors,
  prefilledProduct,
  prefilledSeries,
}: {
  data: RFQProjectRequirements;
  onChange: (data: RFQProjectRequirements) => void;
  errors: RFQErrors;
  prefilledProduct?: string;
  prefilledSeries?: string;
}) {
  const update = (field: keyof RFQProjectRequirements, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="flex flex-col gap-5">
      {(prefilledProduct || prefilledSeries) && (
        <p className="flex items-start gap-2 rounded-lg border border-brand-green/20 bg-brand-green/5 px-4 py-3 text-[12px] font-semibold leading-snug text-brand-green-dark">
          <Check className="mt-px h-4 w-4 shrink-0 text-brand-green" />
          Product details were pre-filled from the page you came from.
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormSelect
          name="productFamily"
          label="Product Family"
          required
          error={errors.productFamily}
          value={data.productFamily}
          onChange={(e) => update('productFamily', e.target.value)}
          options={familyOptions}
          placeholder="Select product family"
        />
        <FormField
          name="product"
          label="Product"
          optionalNote
          hint="Specific model or series if known"
          value={data.product}
          onChange={(e) => update('product', e.target.value)}
          placeholder={prefilledProduct ?? 'e.g. High Performance Butterfly Valve'}
        />
        <FormField
          name="quantity"
          type="number"
          inputMode="numeric"
          min={1}
          label="Quantity"
          optionalNote
          hint="Estimated number of units"
          value={data.quantity}
          onChange={(e) => update('quantity', e.target.value)}
          placeholder="e.g. 12"
        />
        <FormField
          name="operatingMedia"
          label="Operating Media"
          optionalNote
          hint="What flows through the valve"
          value={data.operatingMedia}
          onChange={(e) => update('operatingMedia', e.target.value)}
          placeholder="e.g. Natural gas, water, steam"
        />
      </div>

      <FormTextArea
        name="application"
        label="Application"
        required
        error={errors.application}
        value={data.application}
        onChange={(e) => update('application', e.target.value)}
        placeholder="Describe the application — where and how the valve will be used."
      />
      <FormTextArea
        name="projectNotes"
        label="Project Notes"
        optionalNote
        hint="Pressure, temperature, special materials, timeline, and anything else that affects specification."
        value={data.projectNotes}
        onChange={(e) => update('projectNotes', e.target.value)}
        placeholder="Provide any additional engineering or project details that will help our team prepare an accurate quote."
        className="min-h-[128px]"
      />
    </div>
  );
}

// ─── Step 3 ────────────────────────────────────────────────────────
function AttachmentsStep({
  attachments,
  onAdd,
  onRemove,
}: {
  attachments: RFQAttachment[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="flex items-start gap-2.5 rounded-lg border border-brand-steel/15 bg-brand-light-bg/60 px-4 py-3 text-[12px] leading-relaxed text-brand-graphite/70">
        <FileStack className="mt-px h-4 w-4 shrink-0 text-brand-steel" />
        Attach drawings, datasheets, specifications, or reference documents to
        help our engineering team prepare an accurate quote.
      </p>
      <FileUpload attachments={attachments} onAdd={onAdd} onRemove={onRemove} />
    </div>
  );
}

// ─── Step 4 ────────────────────────────────────────────────────────
function ReviewStep({
  projectInfo,
  requirements,
  attachments,
  onEdit,
}: {
  projectInfo: RFQProjectInfo;
  requirements: RFQProjectRequirements;
  attachments: RFQAttachment[];
  onEdit: (stepIndex: number) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <ReviewSection
        title="Project Information"
        onEdit={() => onEdit(0)}
        rows={[
          { label: 'Company', value: projectInfo.companyName },
          { label: 'Contact', value: projectInfo.contactName },
          { label: 'Email', value: projectInfo.email },
          { label: 'Phone', value: projectInfo.phone },
          { label: 'Country', value: projectInfo.country },
          { label: 'Industry', value: projectInfo.industry },
        ]}
      />
      <ReviewSection
        title="Project Requirements"
        onEdit={() => onEdit(1)}
        rows={[
          { label: 'Product Family', value: requirements.productFamily },
          { label: 'Product', value: requirements.product || 'Not specified' },
          { label: 'Quantity', value: requirements.quantity || 'Not specified' },
          { label: 'Application', value: requirements.application },
          {
            label: 'Operating Media',
            value: requirements.operatingMedia || 'Not specified',
          },
          { label: 'Project Notes', value: requirements.projectNotes || 'None' },
        ]}
      />
      <ReviewSection
        title={`Attachments (${attachments.length})`}
        onEdit={() => onEdit(2)}
        rows={attachments.map((a) => ({
          label: a.name,
          value: `${(a.size / 1024).toFixed(1)} KB`,
        }))}
        emptyMessage="No files attached."
      />
    </div>
  );
}

function ReviewSection({
  title,
  rows,
  onEdit,
  emptyMessage,
}: {
  title: string;
  rows: { label: string; value: string }[];
  onEdit: () => void;
  emptyMessage?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-green-dark/10">
      <div className="flex items-center justify-between gap-3 border-b border-brand-green-dark/8 bg-brand-light-bg/60 px-4 py-2.5">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-green-dark">
          {title}
        </h4>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-bold text-brand-green transition-colors hover:bg-brand-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
      <div className="px-4 py-3.5">
        {rows.length === 0 && emptyMessage ? (
          <p className="text-[13px] text-brand-steel/50">{emptyMessage}</p>
        ) : (
          <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {rows.map((row, i) => (
              <div key={i} className="flex min-w-0 flex-col">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-steel/55">
                  {row.label}
                </dt>
                <dd className="mt-0.5 break-words text-[13px] text-brand-green-dark">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}

// ─── Confirmation ──────────────────────────────────────────────────
//
// Online submission is not wired to a backend endpoint. Rather than
// claiming the request was transmitted, we say so plainly and give direct
// contact routes so the enquiry still reaches engineering.
function ConfirmationStep({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
        <FileText className="h-8 w-8 text-brand-green" />
      </span>
      <h2 id="rfq-title" className="mt-6 text-2xl font-extrabold tracking-tight text-brand-green-dark">
        Request Prepared
      </h2>
      <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-brand-graphite/70">
        Your details have been assembled on screen. Online submission is not yet
        available — please use one of the routes below to send your requirements
        to our engineering team.
      </p>

      <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href={`mailto:${siteConfig.email}?subject=Request for Quote`}
          className="flex items-center gap-3 rounded-lg border border-brand-green-dark/10 bg-brand-light-bg/50 px-4 py-3 text-left transition-colors hover:border-brand-green/40 hover:bg-brand-green/5"
        >
          <Mail className="h-5 w-5 shrink-0 text-brand-green" />
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wide text-brand-steel">
              Email
            </span>
            <span className="block truncate text-[13px] font-semibold text-brand-green-dark">
              {siteConfig.email}
            </span>
          </span>
        </a>
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex items-center gap-3 rounded-lg border border-brand-green-dark/10 bg-brand-light-bg/50 px-4 py-3 text-left transition-colors hover:border-brand-green/40 hover:bg-brand-green/5"
        >
          <Phone className="h-5 w-5 shrink-0 text-brand-green" />
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wide text-brand-steel">
              Phone
            </span>
            <span className="block truncate text-[13px] font-semibold text-brand-green-dark">
              {siteConfig.phone}
            </span>
          </span>
        </a>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-green-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/25"
      >
        Close
      </button>
    </div>
  );
}

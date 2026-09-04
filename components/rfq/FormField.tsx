'use client';

import { forwardRef } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Shared shell: label row, control, then hint or error. */
function Field({
  inputId,
  label,
  required,
  hint,
  error,
  optionalNote,
  children,
}: {
  inputId?: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  optionalNote?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={inputId}
          className="text-[13px] font-semibold tracking-tight text-brand-green-dark"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-brand-green" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {!required && optionalNote && (
          <span className="text-[11px] font-medium text-brand-steel/50">
            Optional
          </span>
        )}
      </div>

      {children}

      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-[11.5px] leading-snug text-brand-steel/60">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-[11.5px] font-medium leading-snug text-red-600"
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Control styling shared by input / textarea / select. */
const controlBase =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-brand-green-dark transition-[border-color,box-shadow,background-color] placeholder:text-brand-steel/35 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-brand-light-bg';

const controlState = (error?: string) =>
  error
    ? 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-500/15'
    : 'border-brand-green-dark/15 hover:border-brand-green-dark/30 focus:border-brand-green focus:ring-brand-green/15';

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optionalNote?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(
    { label, error, hint, required, optionalNote, className, id, ...props },
    ref,
  ) {
    const inputId = id || props.name;

    return (
      <Field
        inputId={inputId}
        label={label}
        required={required}
        hint={hint}
        error={error}
        optionalNote={optionalNote}
      >
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            cn(error && `${inputId}-error`, hint && !error && `${inputId}-hint`) ||
            undefined
          }
          className={cn(controlBase, controlState(error), className)}
          {...props}
        />
      </Field>
    );
  },
);

export interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optionalNote?: boolean;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  function FormTextArea(
    { label, error, hint, required, optionalNote, className, id, ...props },
    ref,
  ) {
    const inputId = id || props.name;

    return (
      <Field
        inputId={inputId}
        label={label}
        required={required}
        hint={hint}
        error={error}
        optionalNote={optionalNote}
      >
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            cn(error && `${inputId}-error`, hint && !error && `${inputId}-hint`) ||
            undefined
          }
          className={cn(controlBase, 'min-h-[104px] resize-y', controlState(error), className)}
          {...props}
        />
      </Field>
    );
  },
);

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optionalNote?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect(
    {
      label,
      error,
      hint,
      required,
      optionalNote,
      className,
      id,
      options,
      placeholder,
      ...props
    },
    ref,
  ) {
    const inputId = id || props.name;

    return (
      <Field
        inputId={inputId}
        label={label}
        required={required}
        hint={hint}
        error={error}
        optionalNote={optionalNote}
      >
        {/* `appearance-none` removes the native arrow, so one is drawn back
            in — without it the control does not read as a dropdown. */}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              cn(error && `${inputId}-error`, hint && !error && `${inputId}-hint`) ||
              undefined
            }
            className={cn(
              controlBase,
              'appearance-none pr-10',
              controlState(error),
              !props.value && 'text-brand-steel/45',
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-brand-green-dark">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-steel/50"
          />
        </div>
      </Field>
    );
  },
);

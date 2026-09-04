'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, FileText, AlertCircle } from 'lucide-react';
import { FormField, FormTextArea, FormSelect } from '@/components/rfq/FormField';
import { contactData } from '@/data/contact';
import { siteConfig } from '@/data/site';
import RFQButton from '@/components/rfq/RFQButton';

const inquiryTypes = [
  { value: 'general', label: 'General Question' },
  { value: 'product', label: 'Product Information' },
  { value: 'engineering', label: 'Engineering Assistance' },
  { value: 'documentation', label: 'Documentation Request' },
  { value: 'distributor', label: 'Distributor Inquiry' },
  { value: 'order', label: 'Existing Order' },
  { value: 'other', label: 'Other' },
];

interface ContactFormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactFormState, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactFormState): ContactErrors {
  const errors: ContactErrors = {};
  if (!data.firstName.trim()) errors.firstName = 'First name is required.';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.inquiryType) errors.inquiryType = 'Please select an inquiry type.';
  if (!data.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function ContactForm() {
  const [data, setData] = useState<ContactFormState>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);

  const update = (field: keyof ContactFormState, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (attempted) {
      setErrors(validate({ ...data, [field]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);
    setAttempted(true);
    if (Object.keys(validationErrors).length === 0) {
      // No backend endpoint — do not claim success.
      // User should use the displayed contact options instead.
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {attempted && hasErrors && (
        <div
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-semibold text-red-700">
              Please correct the highlighted fields below.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          name="firstName"
          label="First Name"
          required
          value={data.firstName}
          onChange={(e) => update('firstName', e.target.value)}
          error={errors.firstName}
          autoComplete="given-name"
        />
        <FormField
          name="lastName"
          label="Last Name"
          required
          value={data.lastName}
          onChange={(e) => update('lastName', e.target.value)}
          error={errors.lastName}
          autoComplete="family-name"
        />
      </div>

      <FormField
        name="company"
        label="Company"
        value={data.company}
        onChange={(e) => update('company', e.target.value)}
        autoComplete="organization"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          name="email"
          type="email"
          label="Email"
          required
          value={data.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <FormField
          name="phone"
          type="tel"
          label="Phone"
          value={data.phone}
          onChange={(e) => update('phone', e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <FormSelect
        name="inquiryType"
        label="Inquiry Type"
        required
        placeholder="Select an inquiry type"
        options={inquiryTypes}
        value={data.inquiryType}
        onChange={(e) => update('inquiryType', e.target.value)}
        error={errors.inquiryType}
      />

      <FormTextArea
        name="message"
        label="Message"
        required
        value={data.message}
        onChange={(e) => update('message', e.target.value)}
        error={errors.message}
        placeholder="How can we help you?"
      />

      <div className="rounded-lg border border-brand-green-dark/10 bg-brand-light-bg/50 px-4 py-3">
        <p className="text-xs leading-relaxed text-brand-steel/70">
          <FileText className="mr-1.5 inline h-3.5 w-3.5 text-brand-green" />
          Online submission is not yet available. After completing the form,
          please email your inquiry to{' '}
          <a
            href={`mailto:${contactData.generalEmail}`}
            className="font-semibold text-brand-green-dark underline hover:text-brand-green"
          >
            {contactData.generalEmail}
          </a>{' '}
          or call{' '}
          <a
            href={`tel:${contactData.phone}`}
            className="font-semibold text-brand-green-dark underline hover:text-brand-green"
          >
            {contactData.phone}
          </a>
          .
        </p>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-green-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 sm:w-auto"
      >
        Prepare Inquiry
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

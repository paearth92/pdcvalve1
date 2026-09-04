import type {
  RFQProjectInfo,
  RFQProjectRequirements,
  RFQErrors,
} from '@/types/rfq';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProjectInfo(data: RFQProjectInfo): RFQErrors {
  const errors: RFQErrors = {};

  if (!data.companyName.trim()) {
    errors.companyName = 'Company name is required.';
  }
  if (!data.contactName.trim()) {
    errors.contactName = 'Contact name is required.';
  }
  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required.';
  }
  if (!data.country.trim()) {
    errors.country = 'Country is required.';
  }
  if (!data.industry.trim()) {
    errors.industry = 'Industry is required.';
  }

  return errors;
}

export function validateRequirements(data: RFQProjectRequirements): RFQErrors {
  const errors: RFQErrors = {};

  if (!data.productFamily.trim()) {
    errors.productFamily = 'Product family is required.';
  }
  if (!data.application.trim()) {
    errors.application = 'Application is required.';
  }

  return errors;
}

export function hasErrors(errors: RFQErrors): boolean {
  return Object.keys(errors).length > 0;
}

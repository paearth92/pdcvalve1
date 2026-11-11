/**
 * Request for Quote (RFQ) type system.
 *
 * All types are designed to be reusable across product pages, product family
 * pages, the product finder, resources, and the contact page.
 */

export interface RFQProductContext {
  productFamily?: string;
  product?: string;
  series?: string;
}

export interface RFQProjectInfo {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
}

export interface RFQProjectRequirements {
  productFamily: string;
  product: string;
  quantity: string;
  application: string;
  operatingMedia: string;
  projectNotes: string;
}

export interface RFQAttachment {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface RFQFormData {
  projectInfo: RFQProjectInfo;
  requirements: RFQProjectRequirements;
  attachments: RFQAttachment[];
}

export type RFQStepId = 'project-info' | 'requirements' | 'attachments' | 'review' | 'confirmation';

export interface RFQStep {
  id: RFQStepId;
  label: string;
  description: string;
  number: number;
}

export type RFQErrors = Partial<Record<string, string>>;

export const RFQ_STEPS: RFQStep[] = [
  {
    id: 'project-info',
    label: 'Project Information',
    description: 'Tell us about your company and how to reach you.',
    number: 1,
  },
  {
    id: 'requirements',
    label: 'Project Requirements',
    description: 'Specify the product and application details.',
    number: 2,
  },
  {
    id: 'attachments',
    label: 'Attachments',
    description: 'Upload drawings, specs, or reference documents.',
    number: 3,
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Confirm your request before submission.',
    number: 4,
  },
  {
    id: 'confirmation',
    label: 'Confirmation',
    description: 'Your request has been submitted.',
    number: 5,
  },
];

export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/vnd.dwg',
  'application/acad',
  'application/x-autocad',
  'model/step',
  'application/step',
  'application/x-step',
  'application/iges',
  'application/x-iges',
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'application/zip',
  'application/x-zip-compressed',
  'application/x-compressed',
];

export const ACCEPTED_EXTENSIONS = '.pdf,.dwg,.step,.stp,.iges,.igs,.cad,.png,.jpg,.jpeg,.gif,.webp,.zip';

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
export const MAX_FILES = 8;

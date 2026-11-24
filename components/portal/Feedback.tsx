import { Notice } from './ui';

const notices: Record<string, string> = {
  verify_signup: 'Check your work email and open the confirmation link in this browser. Once your email is verified, PDC can approve access to your company account.',
  signup_approved: 'The customer can now access their company account.',
  signup_declined: 'The signup was declined.',
  recovery_sent: 'If an eligible account exists for that email address, a password reset link will arrive shortly.',
  reset_sent: 'If an eligible account exists for that email address, a password reset link will arrive shortly.',
  password_reset_requested: 'If an eligible account exists for that email address, a password reset link will arrive shortly.',
  password_reset: 'Your password was reset. Sign in with your new password.',
  password_updated: 'Your password was updated.',
  profile_updated: 'Your profile was saved.',
  order_updated: 'The order was updated.',
  override_updated: 'Import protection was updated.',
  note_added: 'The note was saved.',
  shipment_saved: 'The shipment was saved.',
  document_uploaded: 'The document was uploaded.',
  company_updated: 'The company was updated.',
  company_created: 'The company account was created.',
  invitation_created: 'The invitation is ready to copy.',
  invitation_revoked: 'The invitation was revoked.',
  access_updated: 'The user’s access was updated.',
  membership_updated: 'The user’s access was updated.',
};

const errors: Record<string, string> = {
  signup_failed: 'We could not create your account. Check your work email or contact PDC for help.',
  signup_rate_limit: 'Too many confirmation emails were requested. Wait and try again.',
  invalid_credentials: 'Sign-in failed. Check your email and password.',
  invalid_link: 'This link is invalid or has expired. Request a new link.',
  expired_link: 'This link has expired. Request a new link.',
  invalid_password: 'Enter matching passwords that meet the requirements.',
  incorrect_password: 'Your current password is incorrect.',
  password_mismatch: 'The passwords do not match.',
  invalid_input: 'Check the information entered and try again.',
  invalid_shipment: 'Check the shipment lines and quantities against the order.',
  shipment_quantity: 'The shipment quantities exceed the remaining quantities on the order.',
  file_invalid: 'Choose an accepted file and check its size.',
  file_type: 'Choose an accepted file type.',
  file_size: 'The document exceeds the allowed size.',
  portal_unavailable: 'The portal is temporarily unavailable.',
  portal_setup_required: 'Customer access setup is still being connected. Contact PDC and ask for customer portal access.',
  access_denied: 'You do not have permission to make this change.',
  forbidden: 'You do not have permission to make this change.',
};

export type PortalSearch = { [key: string]: string | string[] | undefined };

export function param(search: PortalSearch | undefined, name: string) {
  const value = search?.[name];
  return typeof value === 'string' ? value : undefined;
}

export function Feedback({ searchParams }: { searchParams?: PortalSearch }) {
  const error = param(searchParams, 'error');
  const notice = param(searchParams, 'notice');
  if (error) return <Notice error>{Object.prototype.hasOwnProperty.call(errors, error) ? errors[error] : 'That action could not be completed. Check your information and try again.'}</Notice>;
  if (notice) return <Notice>{Object.prototype.hasOwnProperty.call(notices, notice) ? notices[notice] : 'The request was processed.'}</Notice>;
  return null;
}

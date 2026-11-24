import Link from 'next/link';
import { updatePasswordAction, updateProfileAction } from '@/lib/portal/actions';
import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { rows } from '@/lib/portal/queries';
import { CompanyFacts, type Contact, type Membership } from '@/components/portal/Accounts';
import { Feedback, param, type PortalSearch } from '@/components/portal/Feedback';
import { buttonClass, DataTable, Field, fieldClass, linkClass, PageHeading, Panel } from '@/components/portal/ui';

export default async function ProfilePage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const search = await searchParams;
  const { organization, profile, user } = await requirePortalCustomer(param(search, 'company'));
  const db = await portalClient();
  const members = await rows<Membership>(db.from('portal_memberships').select('user_id,active,can_view_financials,created_at').eq('organization_id', organization.id).eq('active', true));
  const contacts = members.length ? await rows<Contact>(db.from('portal_profiles').select('user_id,email,full_name,phone').in('user_id', members.map((member) => member.user_id)).order('full_name')) : [];
  const preferences = profile?.notification_preferences;
  return <>
    <PageHeading title="Profile" description={organization.name} />
    <Feedback searchParams={search} />
    <Panel title="Personal information">
      <form action={updateProfileAction} className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6">
        <input type="hidden" name="company" value={organization.id} />
        <Field label="Full name"><input className={fieldClass} name="full_name" defaultValue={profile?.full_name ?? ''} autoComplete="name" maxLength={200} /></Field>
        <Field label="Phone"><input className={fieldClass} name="phone" type="tel" defaultValue={profile?.phone ?? ''} autoComplete="tel" maxLength={60} /></Field>
        <Field label="Sign-in email"><input className={fieldClass} value={user.email ?? ''} readOnly /></Field>
        <fieldset className="grid gap-2 sm:col-span-2">
          <legend className="mb-2 text-sm font-bold text-brand-green-dark">Email notification preferences</legend>
          <p className="mb-1 text-xs leading-relaxed text-[#526b5e]">Preferences apply when PDC enables email notifications. Account updates appear in the Activity tab.</p>
          {([
            ['quotes', 'Estimates'], ['orders', 'Order updates'], ['shipments', 'Shipment updates'], ['invoices', 'Invoices'],
          ] as const).map(([key, label]) => <label key={key} className="flex w-fit min-h-8 items-center gap-2 text-sm">
            <input className="h-4 w-4 accent-brand-green" name={`notify_${key}`} type="checkbox" defaultChecked={preferences?.[key] === true} />{label}
          </label>)}
        </fieldset>
        <button type="submit" className={`${buttonClass} justify-self-start sm:col-span-2`}>Save profile</button>
      </form>
    </Panel>
    <Panel title="Company information"><CompanyFacts company={organization} /></Panel>
    <Panel title="Authorized contacts"><DataTable label="Authorized contacts" columns={['Name', 'Work email', 'Phone']} empty="No authorized contacts are available." rows={contacts.map((contact) => [contact.full_name ?? '—', contact.email ?? '—', contact.phone ?? '—'])} /></Panel>
    <Panel title="Change password">
      <form action={updatePasswordAction} className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6">
        <input type="hidden" name="company" value={organization.id} />
        <Field label="Current password"><input className={fieldClass} name="current_password" type="password" autoComplete="current-password" required maxLength={128} /></Field>
        <span className="hidden sm:block" />
        <Field label="New password (at least 12 characters)"><input className={fieldClass} name="password" type="password" autoComplete="new-password" required minLength={12} maxLength={128} /></Field>
        <Field label="Confirm new password"><input className={fieldClass} name="confirm_password" type="password" autoComplete="new-password" required minLength={12} maxLength={128} /></Field>
        <button type="submit" className={`${buttonClass} justify-self-start sm:col-span-2`}>Update password</button>
      </form>
    </Panel>
    <p className="text-sm text-[#526b5e]">Need help with your account? <Link href="/contact" className={linkClass}>Contact PDC</Link>.</p>
  </>;
}

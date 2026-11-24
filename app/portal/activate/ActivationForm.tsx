'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { activateInvitationAction } from '@/lib/portal/actions';
import { buttonClass, Field, fieldClass, Notice } from '@/components/portal/ui';

export function ActivationForm() {
  const [invite, setInvite] = useState<{ id: string; token: string } | null | undefined>(undefined);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const id = params.get('id');
    const token = params.get('token');
    if (!id || !token) {
      setInvite(null);
      return;
    }
    setInvite({ id, token });
    // Keep the one-time proof in memory after opening the activation form.
    window.history.replaceState(window.history.state, '', window.location.pathname);
  }, []);

  async function activate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!invite || busy) return;
    const form = new FormData(event.currentTarget);
    if (form.get('password') !== form.get('confirm_password')) {
      setError('The passwords do not match.');
      return;
    }
    form.set('id', invite.id);
    form.set('token', invite.token);
    setBusy(true);
    setError('');
    try {
      setError(await activateInvitationAction(form));
    } catch {
      setError('Activation could not be completed. Try again or contact PDC.');
    } finally {
      setBusy(false);
    }
  }

  if (invite === undefined) return <p className="text-sm text-[#526b5e]">Opening your activation link…</p>;
  if (invite === null) return <Notice error>Open the full invitation link shared by PDC. If it has expired, contact PDC for a new one.</Notice>;

  return (
    <form className="grid gap-4" onSubmit={activate}>
      {error && <Notice error>{error}</Notice>}
      <Field label="Password">
        <input className={fieldClass} type="password" name="password" autoComplete="new-password" minLength={12} maxLength={72} required />
      </Field>
      <Field label="Confirm password">
        <input className={fieldClass} type="password" name="confirm_password" autoComplete="new-password" minLength={12} maxLength={72} required />
      </Field>
      <button type="submit" className={buttonClass} disabled={busy}>{busy ? 'Activating…' : 'Activate access'}</button>
    </form>
  );
}

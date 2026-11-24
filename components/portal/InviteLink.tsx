'use client';

import { useState } from 'react';
import { buttonClass, Field, fieldClass } from './ui';

export function InviteLink({ link }: { link: string }) {
  const [message, setMessage] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setMessage('Invitation link copied.');
    } catch {
      setMessage('Select the invitation URL and copy it manually.');
    }
  }

  return <div className="grid gap-3 rounded-lg bg-[#eaf4ee] p-4 text-sm">
    <Field label="Private invitation URL"><input className={fieldClass} value={link} readOnly onFocus={(event) => event.currentTarget.select()} /></Field>
    <button type="button" onClick={copy} className={`${buttonClass} justify-self-start`}>Copy invitation</button>
    <p className="text-xs text-[#365848]">Share this link privately with the recipient. The portal does not send it automatically.</p>
    {message && <p role="status">{message}</p>}
  </div>;
}

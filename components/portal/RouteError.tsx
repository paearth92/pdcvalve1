'use client';

import { buttonClass, Notice } from './ui';

export default function RouteError({ reset }: { reset: () => void }) {
  return <div className="grid max-w-2xl gap-4">
    <h1 className="text-2xl font-bold text-brand-green-dark">Page unavailable</h1>
    <Notice error>The portal could not load this page. Try again shortly.</Notice>
    <button type="button" onClick={reset} className={`${buttonClass} justify-self-start`}>Try again</button>
  </div>;
}

export default function RouteLoading() {
  return <div className="grid gap-4" role="status">
    <span className="text-sm font-semibold text-brand-green-dark">Loading portal records…</span>
    <div aria-hidden="true" className="h-24 rounded-xl border border-[#d6e1da] bg-white motion-safe:animate-pulse" />
    <div aria-hidden="true" className="h-40 rounded-xl border border-[#d6e1da] bg-white motion-safe:animate-pulse" />
  </div>;
}

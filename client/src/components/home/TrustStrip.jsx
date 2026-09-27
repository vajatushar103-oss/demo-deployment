import { trustItems } from '../../data/siteData';

export default function TrustStrip() {
  return (
    <section  className="rounded-b-xl border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4">
        {trustItems.map(([title, desc]) => (
          <div key={title} className="px-5 py-7 text-center sm:px-8">
            <div className="text-sm font-bold text-slate-900">{title}</div>
            <div className="mt-1 text-xs text-slate-500">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

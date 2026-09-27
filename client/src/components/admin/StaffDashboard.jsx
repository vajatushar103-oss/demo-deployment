import { Activity, ArrowUpRight, Boxes, Database, PackageCheck, Plus, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

function StatCard({ icon: Icon, label, value, hint, accent = 'green' }) {
  return (
    <div className="staff-stat-card group">
      <div className={`staff-stat-icon ${accent}`}>
        <Icon size={19} />
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white">{value}</p>
        </div>
        <TrendingUp size={18} className="mb-1 text-jet-400 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{hint}</p>
    </div>
  );
}

export default function StaffDashboard({ products, onAddProduct }) {
  const categories = new Set(products.map((product) => product.category).filter(Boolean));
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);

  return (
    <section className="mb-10 space-y-6">
      <div className="staff-hero-card relative overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:p-8 lg:p-10">
        <div className="staff-orbit staff-orbit-one" />
        <div className="staff-orbit staff-orbit-two" />
        <div className="absolute inset-0 staff-dashboard-grid opacity-30" />

        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-jet-400/20 bg-jet-400/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-jet-300">
              <Sparkles size={12} /> Staff workspace
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Machine catalogue <span className="text-jet-400">control center.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Maintain the PRIME Machines catalogue, keep technical information accurate, and publish product changes from one controlled workspace.
            </p>
          </div>

          <button onClick={onAddProduct} className="staff-primary-button shrink-0">
            <Plus size={18} />
            Add new machine
            <ArrowUpRight size={17} className="transition group-hover:translate-x-1" />
          </button>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-jet-400" />Catalogue service active</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-jet-400" />Authorized workspace</span>
          <span className="inline-flex items-center gap-2"><Database size={14} />MongoDB connected through API</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Boxes} label="Total machines" value={products.length} hint="Products currently stored in the catalogue." />
        <StatCard icon={PackageCheck} label="Categories" value={categories.size} hint="Distinct machine categories currently available." />
        <StatCard icon={Activity} label="Data records" value={products.reduce((total, item) => total + (item.specifications?.length || 0), 0)} hint="Technical specification rows across machines." accent="blue" />
        <StatCard icon={ShieldCheck} label="Access" value="STAFF" hint="Product management privileges are active." accent="purple" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <div className="staff-panel-card">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-jet-400">Latest activity</p>
              <h2 className="mt-1 font-display text-lg font-extrabold text-white">Recently added machines</h2>
            </div>
            <PackageCheck size={19} className="text-slate-600" />
          </div>

          {recentProducts.length ? (
            <div className="divide-y divide-white/5">
              {recentProducts.map((product) => (
                <div key={product._id} className="flex items-center gap-4 p-5 transition hover:bg-white/[0.025] sm:p-6">
                  <div className="h-14 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                    {product.image ? <img src={product.image} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-slate-700"><Boxes size={18} /></div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{product.name}</p>
                    <p className="mt-1 truncate text-xs text-slate-500">{product.category || 'Uncategorized'}</p>
                  </div>
                  <span className="hidden rounded-full border border-jet-400/15 bg-jet-400/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-jet-300 sm:inline-flex">Published</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Boxes className="mx-auto text-slate-700" size={30} />
              <p className="mt-3 text-sm font-semibold text-slate-400">No machines yet</p>
              <p className="mt-1 text-xs text-slate-600">Add your first product to populate the catalogue.</p>
            </div>
          )}
        </div>

        <div className="staff-panel-card relative overflow-hidden p-6">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-jet-500/10 blur-3xl" />
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jet-400/10 text-jet-400"><Sparkles size={18} /></div>
            <h2 className="mt-5 font-display text-lg font-extrabold text-white">Catalogue standards</h2>
            <p className="mt-2 text-xs leading-6 text-slate-500">Before publishing a machine, verify these details.</p>
            <div className="mt-6 space-y-3">
              {['Clear product name and category', 'Accurate technical specifications', 'Valid main product image', 'Useful machine description'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3 text-xs text-slate-400">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-jet-400/10 text-jet-400">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

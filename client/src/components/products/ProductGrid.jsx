import { useState } from 'react';
import ProductCard from './ProductCard';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';

export default function ProductGrid({ products, loading, error }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? products : products.slice(0, 6);

  // console.log(visible.length);

  return (
    <section id="products" className="section-pad bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><SectionHeading eyebrow="Our capabilities" title={<>Production machines for every <span className="text-PRIME-600">tube-working stage.</span></>} /></Reveal>
          <Reveal className="max-w-xl text-sm leading-7 text-slate-600">
            From semi-automatic cutting to fully automatic servo and laser systems, PRIME Machines covers a broad range of tube and bar processing requirements.
          </Reveal>
        </div>

        {loading && <div className="mt-12 rounded-2xl bg-white p-10 text-center text-slate-500">Loading machines...</div>}
        {error && <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">{error}</div>}

        {!loading && !error && (
          <>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((product, index) => <ProductCard key={product._id} product={product} index={index} />)}
            </div>
            {products.length > 6 && (
              <div className="mt-10 text-center">
                <button onClick={() => setShowAll((v) => !v)} className="rounded-full border border-slate-300 bg-white px-7 py-3 font-semibold hover:-translate-y-1 hover:border-PRIME-500 hover:text-PRIME-700">
                  {showAll ? 'Show fewer machines' : 'Show more machines'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

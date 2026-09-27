import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../common/Reveal';

export default function ProductCard({ product, index }) {
  const navigate = useNavigate();
  // console.log(product._id);
  // console.log("X");



  return (
    <Reveal delay={index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''} className="h-full">
      <article className="product-card h-full">
        <div className="relative overflow-hidden">
          <img className="product-img" src={product.images[0].url} alt={product.name} loading="lazy" />
          <div className="product-overlay" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <span className="product-tag">{product.category}</span>
            <span className="glass-badge">PRIME</span>
          </div>
        </div>
        <div className="flex h-[calc(100%-245px)] flex-col p-6">
          <h3 className="font-display text-lg font-extrabold leading-snug text-slate-900">{product.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">{product.desc}</p>
          <button onClick={() =>(navigate(`/products/${product._id}`)
             )} className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border-2 border-PRIME-700 bg-PRIME-500 px-4 py-2 text-sm font-bold text-white hover:-translate-y-1 hover:bg-PRIME-400">
            See Details <ArrowRight size={15} />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

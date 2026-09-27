import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import ProductGallery from '../components/products/ProductGallery';
import { productService } from '../services/api';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    productService.getById(id)
      .then((data) => setProduct(data.product))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((s) => ({ ...s, loading: false })));
  }, [id]);

  // console.log(product.specifications);

  return (
    <SiteLayout>
      <main className="section-pad min-h-[70vh] bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Link to="/#products" className="mb-6 inline-flex items-center gap-2 font-semibold text-PRIME-700 hover:text-PRIME-900"><ArrowLeft size={16} /> Back to products</Link>
          {state.loading && <div className="rounded-2xl bg-white p-10 text-center">Loading machine...</div>}
          {state.error && <div className="rounded-2xl bg-red-50 p-10 text-center text-red-700">{state.error}</div>}
          {product && ( 
            <article className="rounded-[2rem] bg-white p-5 shadow-soft sm:p-8">
              <h1 className="font-display text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">{product.name}</h1>
              <p className="mx-auto mt-3 max-w-3xl text-center text-slate-500">{product.description}</p>
              <div className="mt-7"><ProductGallery product={product} /></div>
              <div className="mt-8 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
                <div><p><b>Machine Category:</b> {product.category}</p></div>
                <div className="overflow-hidden rounded-xl border-2 border-PRIME-200">
                  <table className="w-full text-left">
                    <thead><tr className="bg-PRIME-50"><th className="border-b border-PRIME-200 p-3">PROPERTY</th><th className="border-b border-PRIME-200 p-3">VALUE</th></tr></thead>
                    <tbody>{product.specifications.map((specification, index) => <tr key={specification._id} className={index % 2 ? 'bg-slate-50' : 'bg-white'}><td className="border-b border-PRIME-200 p-3 font-medium">{specification.label}</td><td className="border-b border-PRIME-200 p-3">{specification.value}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
    </SiteLayout>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Copy, Eye, Filter, Image as ImageIcon, Pencil, Plus, RefreshCw, Search, Save, Trash2, X } from 'lucide-react';
import { productService, createProduct } from '../../services/api.js';
import useProductFilters from '../../hooks/useProductFilters';

const emptyForm = {
  name: '', category: '', desc: '', image: '', imagesText: '', specifications: [{ property: '', value: '' }]
};

function productToForm(product) {
  return {
    name: product.name || '', category: product.category || '', desc: product.desc || '', image: product.image || '',
    imagesText: (product.images || []).join('\n'),
    specifications: (product.specifications || []).length ? product.specifications.map((item) => ({ property: item.property || '', value: item.value || '' })) : [{ property: '', value: '' }]
  };
}

function Field({ label, hint, children, className = '' }) {
  return <label className={`block ${className}`}><span className="staff-field-label">{label}{hint && <small>{hint}</small>}</span>{children}</label>;
}

function ProductPreview({ form }) {
  return <div className="staff-preview-card">
    <div className="relative h-44 overflow-hidden bg-slate-900">
      {form.image ? <img src={form.image} alt="Preview" className="h-full w-full object-cover transition duration-700 hover:scale-105" onError={(event) => { event.currentTarget.style.display = 'none'; }} /> : <div className="grid h-full place-items-center text-slate-700"><ImageIcon size={32} /></div>}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4"><span className="rounded-full bg-jet-500/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white">{form.category || 'Category'}</span><h3 className="mt-2 line-clamp-2 font-display text-lg font-extrabold text-white">{form.name || 'Machine name'}</h3></div>
    </div>
    <div className="p-5"><p className="line-clamp-3 text-xs leading-6 text-slate-500">{form.desc || 'Your machine description will appear here.'}</p><div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"><span className="h-1.5 w-1.5 rounded-full bg-jet-400" /> Live preview</div></div>
  </div>;
}

export default function ProductManager({ onProductCountChange }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const editorRef = useRef(null);
  const { query, setQuery, category, setCategory, sort, setSort, categories, filteredProducts } = useProductFilters(products);

  const load = async () => {
    try { setLoading(true); setError(''); const data = await productService.getAll(); const list = data.products || []; setProducts(list); onProductCountChange?.(list); }
    catch (err) { setError(err.message || 'Unable to load products.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const handler = () => openCreate();
    window.addEventListener('prime:open-product-editor', handler);
    return () => window.removeEventListener('prime:open-product-editor', handler);
  }, []);

  const formTitle = useMemo(() => editingId ? 'Edit machine' : 'Add machine', [editingId]);

  const reset = () => { setForm({ ...emptyForm, specifications: [{ property: '', value: '' }] }); setEditingId(null); setShowEditor(false); setPreviewOpen(false); setError(''); };

  const openCreate = () => { setForm({ ...emptyForm, specifications: [{ property: '', value: '' }] }); setEditingId(null); setError(''); setMessage(''); setShowEditor(true); setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); };

  const edit = (product) => { setEditingId(product._id); setForm(productToForm(product)); setMessage(''); setError(''); setPreviewOpen(false); setShowEditor(true); setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); };

  const save = async (event) => {

    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    const images = form.imagesText.split(/\r?\n|,/).map((value) => value.trim()).filter(Boolean);
    const specifications = form.specifications.filter((value) => value.property.trim() && value.value.trim());
    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      desc: form.desc.trim(),
      image: form.image.trim(),
      images, specifications
    };

    try {

      if (editingId){
        await productService.update(editingId, payload);
      }else{
        // await productService.create(payload);
        await createProduct(payload);
      }

      await load();
      setMessage(editingId ? 'Machine updated successfully.' : 'Machine added successfully.');
      reset();

    } catch (err) {
      setError(err.message || 'Unable to save product.');
    }finally {
      setSaving(false);
    }
  };

  const remove = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This action cannot be undone.`)) return;
    try { setDeletingId(product._id); setError(''); await productService.remove(product._id); setProducts((items) => items.filter((item) => item._id !== product._id)); setMessage('Machine removed from the catalogue.'); if (editingId === product._id) reset(); }
    catch (err) { setError(err.message || 'Unable to delete product.'); }
    finally { setDeletingId(null); }
  };

  const duplicate = (product) => { setEditingId(null); setForm(productToForm({ ...product, name: `${product.name} Copy` })); setError(''); setMessage(''); setShowEditor(true); setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); };

  const updateSpec = (index, key, value) => setForm((current) => ({ ...current, specifications: current.specifications.map((item, i) => i === index ? { ...item, [key]: value } : item) }));

  return <div className="space-y-6">
    <div className="staff-section-heading">
      <div><div className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-jet-400"><span className="h-1.5 w-1.5 rounded-full bg-jet-400" /> Catalogue operations</div><h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Products <span className="text-slate-600">/</span> Machines</h2><p className="mt-2 text-sm text-slate-500">Create, maintain and remove the machines displayed on the public website.</p></div>
      <div className="flex gap-2"><button onClick={load} disabled={loading} className="staff-icon-button" title="Refresh"><RefreshCw size={17} className={loading ? 'animate-spin' : ''} /></button><button onClick={openCreate} className="staff-primary-button"><Plus size={17} /> Add machine</button></div>
    </div>

    {error && <div className="staff-alert error"><X size={17} /><span>{error}</span><button onClick={() => setError('')}><X size={15} /></button></div>}
    {message && <div className="staff-alert success"><Check size={17} /><span>{message}</span><button onClick={() => setMessage('')}><X size={15} /></button></div>}

    {showEditor && <form ref={editorRef} onSubmit={save} className="staff-editor-card">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-6"><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-jet-400">{editingId ? 'Modification' : 'New record'}</p><h3 className="mt-1 font-display text-xl font-extrabold text-white">{formTitle}</h3></div><div className="flex gap-2"><button type="button" onClick={() => setPreviewOpen((value) => !value)} className="staff-secondary-button"><Eye size={15} /> Preview</button><button type="button" onClick={reset} className="staff-secondary-button"><X size={15} /> Cancel</button></div></div>
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Machine name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. CNC Tube Cutting Machine" className="staff-input" /></Field>
            <Field label="Category"><input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Tube Cutting" className="staff-input" /></Field>
          </div>
          <Field label="Main image URL" hint="Required"><input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="staff-input" /></Field>
          <Field label="Description"><textarea required rows={5} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Describe the machine, its application and main capability..." className="staff-input min-h-32 resize-y" /></Field>
          <Field label="Additional image URLs" hint="One URL per line"><textarea value={form.imagesText} onChange={(e) => setForm({ ...form, imagesText: e.target.value })} rows={4} placeholder="https://...\nhttps://..." className="staff-input resize-y" /></Field>
        </div>
        <div className="space-y-5">{previewOpen ? <ProductPreview form={form} /> : <div className="staff-editor-tip"><ImageIcon size={20} className="text-jet-400" /><div><p className="text-sm font-bold text-white">Image-first catalogue</p><p className="mt-1 text-xs leading-5 text-slate-500">Use a clear machine image. The public catalogue uses the main image as the product card cover.</p></div></div>}
          <div className="staff-spec-box"><div className="mb-4 flex items-center justify-between"><div><p className="text-[9px] font-bold uppercase tracking-widest text-jet-400">Technical data</p><h4 className="mt-1 text-sm font-bold text-white">Specifications</h4></div><button type="button" onClick={() => setForm({ ...form, specifications: [...form.specifications, { property: '', value: '' }] })} className="staff-text-button"><Plus size={14} /> Add row</button></div>
            <div className="space-y-3">{form.specifications.map((spec, index) => <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2"><input value={spec.property} onChange={(e) => updateSpec(index, 'property', e.target.value)} placeholder="Property" className="staff-input compact" /><input value={spec.value} onChange={(e) => updateSpec(index, 'value', e.target.value)} placeholder="Value" className="staff-input compact" /><button type="button" onClick={() => setForm({ ...form, specifications: form.specifications.filter((_, i) => i !== index) })} className="staff-remove-button"><Trash2 size={14} /></button></div>)}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/10 p-5 sm:flex-row sm:p-6"><button type="button" onClick={reset} className="staff-secondary-button justify-center">Discard</button><button disabled={saving} className="staff-primary-button justify-center disabled:cursor-not-allowed disabled:opacity-50"><Save size={16} /> {saving ? 'Saving changes...' : editingId ? 'Save changes' : 'Publish machine'}</button></div>
    </form>}

    <div className="staff-panel-card overflow-hidden">
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">Database catalogue</p><h3 className="mt-1 font-display text-lg font-extrabold text-white">{filteredProducts.length} <span className="font-normal text-slate-600">of {products.length} machines</span></h3></div>
          <div className="flex flex-col gap-2 sm:flex-row"><div className="staff-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search machines..." /></div><div className="relative"><Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="staff-select pl-9"><option value="all">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></div><div className="relative"><select value={sort} onChange={(e) => setSort(e.target.value)} className="staff-select"><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="name-asc">Name A-Z</option><option value="name-desc">Name Z-A</option></select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600" /></div></div>
        </div>
      </div>

      {loading ? <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3"><div className="staff-skeleton" /><div className="staff-skeleton" /><div className="staff-skeleton" /></div> : filteredProducts.length === 0 ? <div className="p-12 text-center"><BoxesIcon /><h4 className="mt-4 font-display text-lg font-bold text-white">No machines found</h4><p className="mt-2 text-sm text-slate-600">{products.length ? 'Try another search or category.' : 'Your catalogue is empty. Add the first machine to get started.'}</p><button onClick={openCreate} className="staff-primary-button mx-auto mt-6"><Plus size={16} /> Add machine</button></div> : <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product._id} product={product} onEdit={edit} onDelete={remove} onDuplicate={duplicate} deleting={deletingId === product._id} />)}</div>}
    </div>
  </div>;
}

function BoxesIcon() { return <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-600"><ImageIcon size={21} /></div>; }

function ProductCard({ product, onEdit, onDelete, onDuplicate, deleting }) {
  const [imageFailed, setImageFailed] = useState(false);
  // console.log("IMAGE: " + product.images[0].url);
  return <article className="staff-product-card group">
    <div className="relative h-48 overflow-hidden bg-slate-900">{product.images[0].url && !imageFailed ? <img src={product.images[0].url} alt={product.name} onError={() => setImageFailed(true)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-slate-700"><ImageIcon size={34} /></div>}<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" /><div className="absolute left-4 right-4 top-4 flex items-center justify-between"><span className="rounded-full border border-jet-300/20 bg-slate-950/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-jet-300 backdrop-blur">{product.category || 'Machine'}</span><span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-slate-950/60 text-slate-400 backdrop-blur"><Check size={14} /></span></div><div className="absolute bottom-4 left-4 right-4"><h4 className="line-clamp-2 font-display text-lg font-extrabold leading-tight text-white">{product.name}</h4></div></div>
    <div className="p-4"><p className="line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">{product.desc}</p><div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4"><span className="text-[9px] font-bold uppercase tracking-widest text-slate-700">{product.specifications?.length || 0} specs</span><div className="flex gap-1.5"><button onClick={() => onDuplicate(product)} title="Duplicate" className="staff-card-action"><Copy size={14} /></button><button onClick={() => onEdit(product)} title="Edit" className="staff-card-action"><Pencil size={14} /></button><button disabled={deleting} onClick={() => onDelete(product)} title="Delete" className="staff-card-action danger">{deleting ? <span className="h-3.5 w-3.5 animate-spin rounded-full border border-red-400/30 border-t-red-400" /> : <Trash2 size={14} />}</button></div></div></div>
  </article>;
}

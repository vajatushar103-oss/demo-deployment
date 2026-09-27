import { Expand, Minus, Plus, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useGallery } from '../../hooks/useGallery';

export default function ProductGallery({ product }) {
  const galleryRef = useRef(null);
  const gallery = useGallery(product.images?.length ? product.images : [product.image]);

  // console.log(gallery.image);

  async function fullscreen() {
    if (!document.fullscreenElement) await galleryRef.current?.requestFullscreen?.();
    else await document.exitFullscreen?.();
  }

  return (
    <div ref={galleryRef} className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 shadow-sm">
      <div className="relative flex h-[45vh] min-h-[280px] max-h-[600px] items-center justify-center overflow-hidden">
        <img src={gallery.image.url} alt={`${product.name} image ${gallery.currentImage + 1}`} className="max-h-full max-w-full select-none object-contain transition-transform duration-300 ease-out" style={{ transform: `scale(${gallery.zoom})`, cursor: gallery.zoom > 1 ? 'zoom-out' : 'zoom-in' }} />
        <button onClick={gallery.previous} disabled={!gallery.canPrevious} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg disabled:pointer-events-none disabled:opacity-0"><ChevronLeft /></button>
        <button onClick={gallery.next} disabled={!gallery.canNext} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg disabled:pointer-events-none disabled:opacity-0"><ChevronRight /></button>
        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">{gallery.currentImage + 1} / {product.images.length}</div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-3 py-2">
          {product.images.map((_, index) => <button key={index} onClick={() => gallery.goTo(index)} aria-label={`Go to image ${index + 1}`} className={`h-2 rounded-full transition-all ${index === gallery.currentImage ? 'w-5 bg-white' : 'w-2 bg-white/50'}`} />)}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 bg-white p-3">
        <button onClick={gallery.zoomOut} className="gallery-tool-btn" title="Zoom out"><Minus size={16} /></button>
        <span className="min-w-[55px] text-center text-sm font-semibold text-slate-600">{Math.round(gallery.zoom * 100)}%</span>
        <button onClick={gallery.zoomIn} className="gallery-tool-btn" title="Zoom in"><Plus size={16} /></button>
        <button onClick={gallery.reset} className="gallery-tool-btn px-4" title="Reset view"><RotateCcw size={15} /><span className="ml-1 hidden sm:inline">Reset</span></button>
        <button onClick={fullscreen} className="gallery-tool-btn" title="Fullscreen"><Expand size={16} /></button>
      </div>
    </div>
  );
}

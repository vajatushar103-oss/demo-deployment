import { useCallback, useEffect, useState } from 'react';

export function useGallery(images = []) {
  const [currentImage, setCurrentImage] = useState(0);
  const [zoom, setZoom] = useState(1);

  const goTo = useCallback((index) => {
    if (index < 0 || index >= images.length) return;
    setCurrentImage(index);
    setZoom(1);
  }, [images.length]);

  const previous = useCallback(() => goTo(currentImage - 1), [currentImage, goTo]);
  const next = useCallback(() => goTo(currentImage + 1), [currentImage, goTo]);
  const zoomIn = useCallback(() => setZoom((v) => Math.min(v + 0.25, 3)), []);
  const zoomOut = useCallback(() => setZoom((v) => Math.max(v - 0.25, 0.5)), []);
  const reset = useCallback(() => setZoom(1), []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
      if (event.key === '+' || event.key === '=') zoomIn();
      if (event.key === '-') zoomOut();
      if (event.key === '0') reset();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previous, next, zoomIn, zoomOut, reset]);

  return {
    currentImage,
    zoom,
    image: images[currentImage],
    previous,
    next,
    goTo,
    zoomIn,
    zoomOut,
    reset,
    canPrevious: currentImage > 0,
    canNext: currentImage < images.length - 1
  };
}

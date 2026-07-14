import { useRef, useCallback, useState } from 'react';
import './NubaeGallery.css';
import hero from '../assets/nubae/hero.png';
import categoryGrid from '../assets/nubae/category-grid.png';
import products from '../assets/nubae/products.png';
import featured from '../assets/nubae/featured.png';

const shots = [
  { src: hero, label: 'Hero Section' },
  { src: categoryGrid, label: 'Category Explorer' },
  { src: products, label: 'Product Listing' },
  { src: featured, label: 'Featured Collections' },
];

export default function NubaeGallery() {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
  }, []);
  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft]);
  const onMouseUp = useCallback(() => setIsDragging(false), []);
  const onMouseLeave = useCallback(() => setIsDragging(false), []);

  const scrollBy = useCallback((dir) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.nubae-shot');
    const cardWidth = card ? card.getBoundingClientRect().width + 14 : 320;
    trackRef.current.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  }, []);

  return (
    <div className="nubae-gallery-wrap" style={{ position: 'relative' }}>
      <div
        className="nubae-gallery"
        ref={trackRef}
        aria-label="Nubae website screenshots"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {shots.map((shot) => (
          <figure key={shot.label} className="nubae-shot">
            <img src={shot.src} alt={shot.label} loading="lazy" draggable="false" />
            <figcaption>{shot.label}</figcaption>
          </figure>
        ))}
      </div>

      <button
        className="nubae-nav nubae-nav--left"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="nubae-nav nubae-nav--right"
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

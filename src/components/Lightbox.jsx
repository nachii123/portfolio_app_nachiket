import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Lightbox.css';

export default function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const [dir, setDir] = useState(0);
  const touchX = useRef(0);

  const goNext = useCallback(() => {
    setDir(1);
    setIdx(i => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDir(-1);
    setIdx(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, goNext, goPrev]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Touch swipe
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx >  52) goPrev();
    if (dx < -52) goNext();
  };

  const current = images[idx];

  return (
    <motion.div
      className="lb-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header bar: counter + close */}
      <div className="lb-header" onClick={e => e.stopPropagation()}>
        <span className="lb-counter">
          {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <button className="lb-close" onClick={onClose} aria-label="Close lightbox">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Body: prev arrow + image + next arrow */}
      <motion.div
        className="lb-body"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{ scale: 0.93,    opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Prev arrow */}
        {images.length > 1 && (
          <button className="lb-arrow lb-arrow--prev" onClick={goPrev} aria-label="Previous image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}

        {/* Image with slide transition */}
        <div className="lb-img-wrap">
          <AnimatePresence custom={dir} mode="wait">
            <motion.img
              key={idx}
              className="lb-img"
              src={current.src}
              alt={current.label}
              custom={dir}
              initial={{ opacity: 0, x: dir * 55 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0,    x: -dir * 55 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Next arrow */}
        {images.length > 1 && (
          <button className="lb-arrow lb-arrow--next" onClick={goNext} aria-label="Next image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}
      </motion.div>

      {/* Footer: label + dot strip */}
      <div className="lb-footer" onClick={e => e.stopPropagation()}>
        <div className="lb-label">{current.label}</div>
        {images.length > 1 && (
          <div className="lb-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`lb-dot${i === idx ? ' lb-dot--active' : ''}`}
                onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

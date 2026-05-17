import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './CaptainGallery.css';
import Lightbox from './Lightbox';

import imgHome     from '../assets/captain/homeScreen.png';
import imgNotif    from '../assets/captain/notification.png';
import imgActive   from '../assets/captain/active.png';
import imgCustDet  from '../assets/captain/customerDet.png';
import imgMenus    from '../assets/captain/menus.png';
import imgReview   from '../assets/captain/reviewOrder.png';

const SCREENS = [
  { src: imgHome,    label: 'Dashboard' },
  { src: imgActive,  label: 'Active Tables' },
  { src: imgMenus,   label: 'Menu' },
  { src: imgCustDet, label: 'Customer' },
  { src: imgReview,  label: 'Review Order' },
  { src: imgNotif,   label: 'Notifications' },
];

export default function CaptainGallery() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-60px' });

  const [activeIdx,   setActiveIdx]   = useState(0);
  const [canLeft,     setCanLeft]     = useState(false);
  const [canRight,    setCanRight]    = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // ── Arrow visibility ─────────────────────────────────────────────
  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
    return () => el.removeEventListener('scroll', updateArrows);
  }, [updateArrows]);

  // ── Active dot via IntersectionObserver ──────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.captain-card');
    const io = new IntersectionObserver(
      (entries) => {
        let best = { ratio: 0, idx: -1 };
        entries.forEach((entry) => {
          if (entry.intersectionRatio > best.ratio) {
            best = {
              ratio: entry.intersectionRatio,
              idx: Array.from(cards).indexOf(entry.target),
            };
          }
        });
        if (best.idx !== -1) setActiveIdx(best.idx);
      },
      { root: track, threshold: [0.3, 0.6, 0.9] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // ── Arrow click ──────────────────────────────────────────────────
  const scrollByCard = (dir) => {
    const el   = trackRef.current;
    const card = el.querySelector('.captain-card');
    const step = card ? card.offsetWidth + 20 : 240;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // ── Mouse drag with momentum ─────────────────────────────────────
  const dragging     = useRef(false);
  const wasDragged   = useRef(false);
  const originX      = useRef(0);
  const originScroll = useRef(0);
  const velX         = useRef(0);
  const lastX        = useRef(0);
  const lastT        = useRef(0);
  const rafId        = useRef(null);

  const onMouseDown = (e) => {
    dragging.current     = true;
    wasDragged.current   = false;
    originX.current      = e.clientX;
    originScroll.current = trackRef.current.scrollLeft;
    lastX.current        = e.clientX;
    lastT.current        = Date.now();
    velX.current         = 0;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    trackRef.current.style.userSelect = 'none';
    trackRef.current.style.cursor     = 'grabbing';
  };

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    if (Math.abs(e.clientX - originX.current) > 5) wasDragged.current = true;
    const now = Date.now();
    const dt  = Math.max(now - lastT.current, 1);
    velX.current  = (e.clientX - lastX.current) / dt;
    lastX.current = e.clientX;
    lastT.current = now;
    trackRef.current.scrollLeft = originScroll.current - (e.clientX - originX.current);
  }, []);

  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const el = trackRef.current;
    if (el) {
      el.style.userSelect = '';
      el.style.cursor     = 'grab';
    }
    let v = velX.current * 130;
    const coast = () => {
      if (!trackRef.current || Math.abs(v) < 0.4) return;
      trackRef.current.scrollLeft -= v;
      v *= 0.91;
      rafId.current = requestAnimationFrame(coast);
    };
    coast();
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <motion.div
      ref={sectionRef}
      className="captain-gallery"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Floating orb accents */}
      <div className="captain-orb captain-orb--1" aria-hidden />
      <div className="captain-orb captain-orb--2" aria-hidden />

      {/* Edge vignettes */}
      <div className="captain-edge captain-edge--left"  aria-hidden />
      <div className="captain-edge captain-edge--right" aria-hidden />

      {/* Nav arrows */}
      <button
        className={`captain-nav captain-nav--left${canLeft ? ' captain-nav--show' : ''}`}
        onClick={() => scrollByCard(-1)}
        aria-label="Previous"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        className={`captain-nav captain-nav--right${canRight ? ' captain-nav--show' : ''}`}
        onClick={() => scrollByCard(1)}
        aria-label="Next"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="captain-track"
        onMouseDown={onMouseDown}
      >
        {SCREENS.map((screen, i) => (
          <motion.div
            key={screen.label}
            className={`captain-card${i === activeIdx ? ' captain-card--active' : ''}`}
            style={{ cursor: 'zoom-in' }}
            onClick={() => { if (!wasDragged.current) setLightboxIdx(i); }}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
          >
            <div className="captain-notch" aria-hidden />
            <img
              src={screen.src}
              alt={screen.label}
              className="captain-card-img"
              draggable={false}
            />
            <div className="captain-card-label">{screen.label}</div>
            <div className="captain-card-shine" aria-hidden />
            <div className="lb-zoom-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={SCREENS}
            startIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>

      {/* Active dot indicators */}
      <div className="captain-dots" role="tablist" aria-label="Gallery position">
        {SCREENS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIdx}
            aria-label={`Go to screen ${i + 1}`}
            className={`captain-dot${i === activeIdx ? ' captain-dot--active' : ''}`}
            onClick={() => {
              const el   = trackRef.current;
              const card = el.querySelectorAll('.captain-card')[i];
              if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

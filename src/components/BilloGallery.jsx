import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import './BilloGallery.css';

import imgHero       from '../assets/billostrift/hero.png';
import imgCategories from '../assets/billostrift/categories.png';
import imgDrops      from '../assets/billostrift/drops.png';
import imgMobileHero from '../assets/billostrift/mobile_hero.png';
import imgMobileShop from '../assets/billostrift/mobile_shop.png';

// type: 'desktop' | 'mobile'
const SCREENS = [
  { src: imgHero,       label: 'Hero',          type: 'desktop' },
  { src: imgCategories, label: 'Shop Categories', type: 'desktop' },
  { src: imgDrops,      label: 'Latest Drops',  type: 'desktop' },
  { src: imgMobileHero, label: 'Mobile — Home', type: 'mobile'  },
  { src: imgMobileShop, label: 'Mobile — Shop', type: 'mobile'  },
];

export default function BilloGallery() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-60px' });

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

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

  // ── Arrow click ──────────────────────────────────────────────────
  const scrollByCard = (dir) => {
    const el   = trackRef.current;
    const card = el.querySelector('.billo-card');
    const step = card ? card.offsetWidth + 20 : 360;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // ── Mouse drag with momentum ─────────────────────────────────────
  const dragging     = useRef(false);
  const originX      = useRef(0);
  const originScroll = useRef(0);
  const velX         = useRef(0);
  const lastX        = useRef(0);
  const lastT        = useRef(0);
  const rafId        = useRef(null);

  const onMouseDown = (e) => {
    dragging.current     = true;
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
    if (el) { el.style.userSelect = ''; el.style.cursor = 'grab'; }
    let v = velX.current * 130;
    const coast = () => {
      if (!trackRef.current || Math.abs(v) < 0.4) return;
      trackRef.current.scrollLeft -= v;
      v *= 0.92;
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
      className="billo-gallery"
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Warm ambient glow */}
      <div className="billo-glow-orb billo-glow-orb--1" aria-hidden />
      <div className="billo-glow-orb billo-glow-orb--2" aria-hidden />

      {/* Edge fades */}
      <div className="billo-edge billo-edge--left"  aria-hidden />
      <div className="billo-edge billo-edge--right" aria-hidden />

      {/* Nav arrows */}
      <button
        className={`billo-nav billo-nav--left${canLeft ? ' billo-nav--show' : ''}`}
        onClick={() => scrollByCard(-1)}
        aria-label="Previous"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        className={`billo-nav billo-nav--right${canRight ? ' billo-nav--show' : ''}`}
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
        className="billo-track"
        onMouseDown={onMouseDown}
      >
        {SCREENS.map((screen, i) => (
          <motion.div
            key={screen.label}
            className={`billo-card billo-card--${screen.type}`}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.09, ease: 'easeOut' }}
          >
            {screen.type === 'desktop' ? (
              <>
                {/* Browser chrome */}
                <div className="billo-browser-bar">
                  <div className="billo-browser-dots">
                    <span className="billo-dot billo-dot--red"   />
                    <span className="billo-dot billo-dot--amber" />
                    <span className="billo-dot billo-dot--green" />
                  </div>
                  <div className="billo-url-pill">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <span>billostrift-website-app.onrender.com</span>
                  </div>
                </div>
                <div className="billo-card-img-wrap">
                  <img src={screen.src} alt={screen.label} className="billo-card-img" draggable={false} />
                </div>
              </>
            ) : (
              <>
                {/* Phone notch */}
                <div className="billo-phone-notch" aria-hidden />
                <div className="billo-card-img-wrap">
                  <img src={screen.src} alt={screen.label} className="billo-card-img" draggable={false} />
                </div>
              </>
            )}

            {/* Label */}
            <div className="billo-card-label">
              <span className={`billo-type-badge billo-type-badge--${screen.type}`}>
                {screen.type === 'desktop' ? 'DESKTOP' : 'MOBILE'}
              </span>
              <span className="billo-card-name">{screen.label}</span>
            </div>

            {/* Hover glow */}
            <div className="billo-card-shine" aria-hidden />
          </motion.div>
        ))}
      </div>

      {/* Responsive badge row */}
      <div className="billo-responsive-row" aria-hidden>
        <span className="billo-resp-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          Desktop
        </span>
        <span className="billo-resp-divider">+</span>
        <span className="billo-resp-badge">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          Mobile
        </span>
        <span className="billo-resp-divider">—</span>
        <span className="billo-resp-text">Fully Responsive</span>
      </div>
    </motion.div>
  );
}

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './ScanDineGallery.css';
import Lightbox from './Lightbox';

import imgHero         from '../assets/scandine/hero.png';
import imgDashboard    from '../assets/scandine/section2.png';
import imgMarketing    from '../assets/scandine/section3.png';
import imgOrderFlow    from '../assets/scandine/section4.png';
import imgTestimonials from '../assets/scandine/section5.png';
import imgMobileHero   from '../assets/scandine/mobile_hero.png';
import imgMobileMid    from '../assets/scandine/mobile_mid.png';
import imgMobileBottom from '../assets/scandine/mobile_bottom.png';

const SCREENS = [
  { src: imgHero,         label: 'Hero',          type: 'desktop' },
  { src: imgDashboard,    label: 'Dashboard',     type: 'desktop' },
  { src: imgOrderFlow,    label: 'Order Flow',    type: 'desktop' },
  { src: imgMarketing,    label: 'Marketing',     type: 'desktop' },
  { src: imgTestimonials, label: 'Testimonials',  type: 'desktop' },
  { src: imgMobileHero,   label: 'Mobile — Hero', type: 'mobile'  },
  { src: imgMobileMid,    label: 'Mobile — Flow', type: 'mobile'  },
  { src: imgMobileBottom, label: 'Mobile — Data', type: 'mobile'  },
];

export default function ScanDineGallery() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-60px' });

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

  const scrollByCard = (dir) => {
    const el   = trackRef.current;
    const card = el.querySelector('.sd-card');
    const step = card ? card.offsetWidth + 20 : 360;
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
      className="sd-gallery"
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Green ambient orbs */}
      <div className="sd-orb sd-orb--1" aria-hidden />
      <div className="sd-orb sd-orb--2" aria-hidden />

      {/* Edge fades */}
      <div className="sd-edge sd-edge--left"  aria-hidden />
      <div className="sd-edge sd-edge--right" aria-hidden />

      {/* Nav arrows */}
      <button
        className={`sd-nav sd-nav--left${canLeft ? ' sd-nav--show' : ''}`}
        onClick={() => scrollByCard(-1)}
        aria-label="Previous"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        className={`sd-nav sd-nav--right${canRight ? ' sd-nav--show' : ''}`}
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
        className="sd-track"
        onMouseDown={onMouseDown}
      >
        {SCREENS.map((screen, i) => (
          <motion.div
            key={screen.label}
            className={`sd-card sd-card--${screen.type}`}
            style={{ cursor: 'zoom-in' }}
            onClick={() => { if (!wasDragged.current) setLightboxIdx(i); }}
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: 'easeOut' }}
          >
            {screen.type === 'desktop' ? (
              <>
                {/* Browser chrome */}
                <div className="sd-browser-bar">
                  <div className="sd-dots">
                    <span className="sd-dot sd-dot--red"   />
                    <span className="sd-dot sd-dot--amber" />
                    <span className="sd-dot sd-dot--green" />
                  </div>
                  <div className="sd-url-pill">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity=".5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span>scan-dine-web.onrender.com</span>
                  </div>
                </div>
                <div className="sd-img-wrap">
                  <img src={screen.src} alt={screen.label} className="sd-img" draggable={false} />
                </div>
              </>
            ) : (
              <>
                <div className="sd-phone-notch" aria-hidden />
                <div className="sd-img-wrap">
                  <img src={screen.src} alt={screen.label} className="sd-img" draggable={false} />
                </div>
              </>
            )}

            {/* Label bar */}
            <div className="sd-label-bar">
              <span className={`sd-type-tag sd-type-tag--${screen.type}`}>
                {screen.type === 'desktop' ? 'WEB' : 'MOBILE'}
              </span>
              <span className="sd-label-text">{screen.label}</span>
            </div>

            <div className="sd-shine" aria-hidden />
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

      {/* Live indicator */}
      <div className="sd-live-row" aria-hidden>
        <span className="sd-live-dot" />
        <span className="sd-live-text">Live at scan-dine-web.onrender.com</span>
      </div>
    </motion.div>
  );
}

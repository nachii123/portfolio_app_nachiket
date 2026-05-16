import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import './QRGallery.css';

import imgHome      from '../assets/qr_dine_in/homeScreen.png';
import imgHome2     from '../assets/qr_dine_in/homeScreen2.png';
import imgRestaurant from '../assets/qr_dine_in/restuarant.png';
import imgPax       from '../assets/qr_dine_in/paxCount.png';
import imgMenu      from '../assets/qr_dine_in/restPage.png';
import imgCart      from '../assets/qr_dine_in/cart.png';
import imgOrder     from '../assets/qr_dine_in/orderDetails.png';
import imgConfirmed from '../assets/qr_dine_in/odPlaced.png';
import imgProfile   from '../assets/qr_dine_in/profileScreen.png';
import imgBill      from '../assets/qr_dine_in/billScreen.png';
import imgTracking  from '../assets/qr_dine_in/trackingScreen.png';

const SCREENSHOTS = [
  { src: imgHome,       label: 'Home' },
  { src: imgHome2,      label: 'Discover' },
  { src: imgRestaurant, label: 'Restaurant' },
  { src: imgPax,        label: 'Guests' },
  { src: imgMenu,       label: 'Menu' },
  { src: imgCart,       label: 'Cart' },
  { src: imgOrder,      label: 'Order Details' },
  { src: imgConfirmed,  label: 'Confirmed' },
  { src: imgTracking,   label: 'Tracking' },
  { src: imgBill,       label: 'Bill' },
  { src: imgProfile,    label: 'Profile' },
];

export default function QRGallery() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-60px' });

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  // Drag state refs (avoid re-renders)
  const dragging        = useRef(false);
  const originX         = useRef(0);
  const originScroll    = useRef(0);
  const velX            = useRef(0);
  const lastX           = useRef(0);
  const lastT           = useRef(0);
  const rafId           = useRef(null);

  // ── Arrow visibility ──────────────────────────────────────────────
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

  // ── Arrow click ───────────────────────────────────────────────────
  const scrollByCard = (dir) => {
    const el   = trackRef.current;
    const card = el.querySelector('.qr-card');
    const step = card ? card.offsetWidth + 16 : 220;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // ── Mouse drag ────────────────────────────────────────────────────
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
    if (el) {
      el.style.userSelect = '';
      el.style.cursor     = 'grab';
    }
    // Momentum coast
    let v = velX.current * 140;
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
      className="qr-gallery"
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Edge fades */}
      <div className="qr-edge qr-edge--left"  aria-hidden />
      <div className="qr-edge qr-edge--right" aria-hidden />

      {/* Nav arrows */}
      <button
        className={`qr-nav qr-nav--left${canLeft ? ' qr-nav--show' : ''}`}
        onClick={() => scrollByCard(-1)}
        aria-label="Scroll left"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        className={`qr-nav qr-nav--right${canRight ? ' qr-nav--show' : ''}`}
        onClick={() => scrollByCard(1)}
        aria-label="Scroll right"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="qr-track"
        onMouseDown={onMouseDown}
      >
        {SCREENSHOTS.map((shot, i) => (
          <motion.div
            key={shot.label}
            className="qr-card"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 + i * 0.055, ease: 'easeOut' }}
          >
            <img
              src={shot.src}
              alt={shot.label}
              className="qr-card-img"
              draggable={false}
            />
            <div className="qr-card-label">{shot.label}</div>
            <div className="qr-card-glow" aria-hidden />
          </motion.div>
        ))}
      </div>

      {/* Scroll hint dots */}
      <div className="qr-hint" aria-hidden>
        <span className="qr-hint-dot" />
        <span className="qr-hint-dot qr-hint-dot--pulse" />
        <span className="qr-hint-dot" />
      </div>
    </motion.div>
  );
}

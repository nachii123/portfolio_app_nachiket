import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Footer from '../components/Footer';
import QRGallery from '../components/QRGallery';
import CaptainGallery from '../components/CaptainGallery';
import BilloGallery from '../components/BilloGallery';
import ScanDineGallery from '../components/ScanDineGallery';
import './Projects.css';

const projects = [
  {
    id: 1,
    tags: [
      { label: 'REACT NATIVE', color: '' },
      { label: 'SpringBoot', color: 'green' },
      { label: 'Razorpay', color: 'purple' },
    ],
    title: 'Restaurant QR Ordering System',
    desc: 'A seamless contactless dining experience designed for high-traffic environments. Features real-time order tracking, digital payments, and instant kitchen notifications.',
    image: 'restaurant-qr',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d2a1a 100%)',
  },
  {
    id: 2,
    tags: [
      { label: 'REACT.JS', color: '' },
      { label: 'NODE.JS', color: 'green' },
      { label: 'MONGODB', color: 'orange' },
    ],
    title: 'billo\'STHRIFT',
    subtitle: 'Y2K Fashion E-commerce',
    desc: 'A premium e-commerce storefront for Nashik\'s first Y2K thrift brand. Features a curated editorial shop, archival drop system, and a cinematic brand experience built from scratch for a real client.',
    features: ['Curated Drop System', 'Editorial Lookbook', 'E-commerce Cart', 'Mobile Responsive'],
    image: 'billo',
    gradient: 'linear-gradient(135deg, #0f0a04 0%, #1a1206 100%)',
    liveUrl: 'https://billostrift-website-app.onrender.com',
  },
  {
    id: 5,
    tags: [
      { label: 'REACT.JS',    color: '' },
      { label: 'NODE.JS',     color: 'green' },
      { label: 'TAILWIND',    color: 'purple' },
    ],
    title: 'ScanDine',
    subtitle: 'Restaurant SaaS Platform',
    desc: 'A full-featured SaaS marketing website for ScanDine — a QR-based restaurant management platform. Built to showcase live dashboards, real-time order flows, AI analytics, and marketing automation to restaurant operators across India.',
    features: ['QR Order Management', 'Live Dashboard Preview', 'AI-powered Analytics', 'Marketing Automation'],
    image: 'scandine',
    gradient: 'linear-gradient(135deg, #040d06 0%, #061208 100%)',
    liveUrl: 'https://scan-dine-web.onrender.com',
  },
  // {
  //   id: 3,
  //   tags: [
  //     { label: 'NEXT.JS', color: '' },
  //     { label: 'POSTGRESQL', color: 'orange' },
  //     { label: 'GRAPHQL', color: 'purple' },
  //   ],
  //   title: 'Project Management System',
  //   desc: 'An enterprise-grade orchestration tool for engineering teams. Distributed task management, automated sprint reporting, and seamless integration with CI/CD pipelines.',
  //   image: 'pm-system',
  //   gradient: 'linear-gradient(135deg, #0a1a33 0%, #1a2a0a 100%)',
  // },
  {
    id: 4,
    tags: [
      { label: 'REACT NATIVE', color: '' },
      { label: 'SPRING BOOT', color: 'green' },
      { label: 'MYSQL', color: 'orange' },
    ],
    title: 'CaptainApp',
    subtitle: 'Restaurant Staff Management',
    desc: 'A mobile-first operational command centre for restaurant staff. Enables captains to manage tables, assign orders, track active sessions, and sync seamlessly with kitchen workflows in real time.',
    features: ['Active Table Management', 'Real-time Order Sync', 'Role-based Access', 'Kitchen Notifications'],
    image: 'captain',
    gradient: 'linear-gradient(135deg, #0f0a1c 0%, #1a0a2e 100%)',
  },
];

/* ── SVG mockups for non-QR cards ── */
function ProjectMockup({ type }) {
  if (type === 'ai-crm') {
    return (
      <svg viewBox="0 0 300 200" className="project-mockup-svg">
        <rect width="300" height="200" fill="transparent"/>
        <rect x="20" y="20" width="260" height="160" rx="8" fill="#0d0a1a" stroke="#a855f7" strokeWidth="1" opacity="0.5"/>
        <rect x="30" y="30" width="80" height="65" rx="4" fill="#1a1030" stroke="#7c3aed" strokeWidth="1"/>
        <rect x="30" y="100" width="38" height="35" rx="3" fill="#a855f7" opacity="0.3"/>
        <rect x="72" y="100" width="38" height="26" rx="3" fill="#00e5ff" opacity="0.22"/>
        <rect x="120" y="30" width="150" height="120" rx="4" fill="#0a0a1a" stroke="#4a5568" strokeWidth="1"/>
        <rect x="130" y="42" width="130" height="6" rx="3" fill="#a855f7" opacity="0.4"/>
        <rect x="130" y="54" width="100" height="4" rx="2" fill="#4a5568"/>
        <rect x="130" y="64" width="118" height="3" rx="2" fill="#2d3748"/>
        <rect x="130" y="76" width="130" height="50" rx="3" fill="#1a1030"/>
        <polyline points="136,118 148,102 160,110 172,94 184,106 196,88 208,100 220,92 232,104 244,96 250,104" fill="none" stroke="#a855f7" strokeWidth="1.5"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 200" className="project-mockup-svg">
      <rect width="300" height="200" fill="transparent"/>
      <rect x="20" y="16" width="260" height="168" rx="8" fill="#0a1a0a" stroke="#34d399" strokeWidth="1" opacity="0.4"/>
      <rect x="30" y="26" width="60" height="148" rx="4" fill="#111520"/>
      <rect x="37" y="35" width="46" height="6" rx="3" fill="#34d399" opacity="0.4"/>
      <rect x="37" y="46" width="38" height="4" rx="2" fill="#4a5568"/>
      <rect x="37" y="55" width="42" height="4" rx="2" fill="#4a5568"/>
      <rect x="37" y="68" width="38" height="4" rx="2" fill="#2d3748"/>
      <rect x="37" y="77" width="42" height="4" rx="2" fill="#2d3748"/>
      <rect x="37" y="90" width="38" height="4" rx="2" fill="#2d3748"/>
      <rect x="98" y="26" width="172" height="148" rx="4" fill="#111520"/>
      <rect x="107" y="36" width="154" height="34" rx="4" fill="#1a2030"/>
      <rect x="107" y="78" width="72" height="46" rx="4" fill="#0a1a30" stroke="#00e5ff" strokeWidth="1" opacity="0.4"/>
      <rect x="185" y="78" width="68" height="46" rx="4" fill="#0a1a30"/>
      <rect x="107" y="132" width="148" height="24" rx="4" fill="#1a1030" stroke="#7c3aed" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

/* ── Standard project card (unchanged) ── */
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-card-content">
        <div className="project-card-tags">
          {project.tags.map(t => (
            <span key={t.label} className={`tag ${t.color}`}>{t.label}</span>
          ))}
        </div>
        <h2 className="project-card-title">{project.title}</h2>
        <p className="project-card-desc">{project.desc}</p>
        <div className="project-card-actions">
          <button className="btn-gradient project-btn">Live Demo</button>
          <button className="project-github-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>
      <div className="project-card-visual" style={{ background: project.gradient }}>
        <ProjectMockup type={project.image} />
      </div>
    </div>
  );
}

/* ── Featured QR card ── */
function QRProjectCard({ project }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="project-card project-card--featured"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Ambient glow behind the card */}
      <div className="featured-glow" aria-hidden />

      <div className="featured-header">
        {/* Badge */}
        <div className="featured-badge">
          <span className="status-dot" />
          <span>FEATURED PROJECT</span>
        </div>

        {/* Tags + title + desc + actions */}
        <div className="project-card-tags" style={{ marginTop: 14 }}>
          {project.tags.map(t => (
            <span key={t.label} className={`tag ${t.color}`}>{t.label}</span>
          ))}
        </div>
        <h2 className="project-card-title featured-title">{project.title}</h2>
        <p className="project-card-desc">{project.desc}</p>

        <div className="project-card-actions">
          <button className="btn-gradient project-btn">Live Demo</button>
          <button className="project-github-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>

      {/* Full-width gallery */}
      <QRGallery />
    </motion.div>
  );
}

/* ── billo'STHRIFT client project card ── */
function BilloProjectCard({ project }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="project-card project-card--featured project-card--billo"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="featured-glow billo-featured-glow" aria-hidden />

      <div className="featured-header">
        <div className="featured-badge billo-featured-badge">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>CLIENT PROJECT — LIVE</span>
        </div>

        <div className="project-card-tags" style={{ marginTop: 14 }}>
          {project.tags.map(t => (
            <span key={t.label} className={`tag ${t.color}`}>{t.label}</span>
          ))}
        </div>

        <h2 className="project-card-title featured-title">
          {project.title}
          {project.subtitle && (
            <span className="billo-subtitle"> — {project.subtitle}</span>
          )}
        </h2>
        <p className="project-card-desc">{project.desc}</p>

        {project.features && (
          <div className="billo-features">
            {project.features.map((f) => (
              <span key={f} className="billo-feature-chip">
                <span className="billo-feature-dot" />
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="project-card-actions" style={{ marginTop: 20 }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-gradient billo-live-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Live Site
              </button>
            </a>
          )}
          <button className="project-github-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>

      <BilloGallery />
    </motion.div>
  );
}

/* ── CaptainApp featured card ── */
function CaptainProjectCard({ project }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="project-card project-card--featured project-card--captain"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Purple ambient glow */}
      <div className="featured-glow captain-featured-glow" aria-hidden />

      <div className="featured-header">
        {/* Badge */}
        <div className="featured-badge captain-featured-badge">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span>STAFF MANAGEMENT APP</span>
        </div>

        {/* Tags + title + subtitle + desc */}
        <div className="project-card-tags" style={{ marginTop: 14 }}>
          {project.tags.map(t => (
            <span key={t.label} className={`tag ${t.color}`}>{t.label}</span>
          ))}
        </div>

        <h2 className="project-card-title featured-title">
          {project.title}
          {project.subtitle && (
            <span className="captain-subtitle"> — {project.subtitle}</span>
          )}
        </h2>
        <p className="project-card-desc">{project.desc}</p>

        {/* Feature chips */}
        {project.features && (
          <div className="captain-features">
            {project.features.map((f) => (
              <span key={f} className="captain-feature-chip">
                <span className="captain-feature-dot" />
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="project-card-actions" style={{ marginTop: 20 }}>
          <button className="btn-gradient project-btn captain-demo-btn">App Preview</button>
          <button className="project-github-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>

      {/* Full-width gallery */}
      <CaptainGallery />
    </motion.div>
  );
}

/* ── ScanDine project card ── */
function ScanDineProjectCard({ project }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="project-card project-card--featured project-card--scandine"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="featured-glow scandine-featured-glow" aria-hidden />

      <div className="featured-header">
        <div className="featured-badge scandine-featured-badge">
          <span className="sd-badge-dot" />
          <span>SAAS PLATFORM — LIVE</span>
        </div>

        <div className="project-card-tags" style={{ marginTop: 14 }}>
          {project.tags.map(t => (
            <span key={t.label} className={`tag ${t.color}`}>{t.label}</span>
          ))}
        </div>

        <h2 className="project-card-title featured-title">
          {project.title}
          {project.subtitle && (
            <span className="scandine-subtitle"> — {project.subtitle}</span>
          )}
        </h2>
        <p className="project-card-desc">{project.desc}</p>

        {project.features && (
          <div className="scandine-features">
            {project.features.map((f) => (
              <span key={f} className="scandine-feature-chip">
                <span className="scandine-feature-dot" />
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="project-card-actions" style={{ marginTop: 20 }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-gradient scandine-live-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Live Site
              </button>
            </a>
          )}
          <button className="project-github-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>

      <ScanDineGallery />
    </motion.div>
  );
}

/* ── Page ── */
export default function Projects() {
  return (
    <div className="projects fade-in">
      <section className="projects-header page">
        <div className="section-label" style={{ marginBottom: 12 }}>CURATED PORTFOLIO</div>
        <h1 className="projects-title">SELECTED WORKS</h1>
        <div className="projects-title-line" />
      </section>

      <section className="projects-list page">
        {projects.map(p => {
          if (p.id === 1) return <QRProjectCard       key={p.id} project={p} />;
          if (p.id === 2) return <BilloProjectCard    key={p.id} project={p} />;
          if (p.id === 4) return <CaptainProjectCard  key={p.id} project={p} />;
          if (p.id === 5) return <ScanDineProjectCard key={p.id} project={p} />;
          return <ProjectCard key={p.id} project={p} />;
        })}
      </section>

      <Footer />
    </div>
  );
}

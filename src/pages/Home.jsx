import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileImage from '../assets/profileImage.jpeg';
import './Home.css';

export default function Home() {
  return (
    <div className="home fade-in">
      {/* Hero */}
      <section className="home-hero page">
        <div className="home-hero-inner">
          {/* Left: text + CTAs */}
          <div>
            <div className="home-status">
              <span className="status-dot" />
              <span className="home-status-text">SYSTEM STATUS: READY TO BUILD</span>
            </div>

            <h1 className="home-headline">
              BUILDING THE{' '}
              <span className="home-headline-accent">FUTURE</span>
              <br />OF DIGITAL
              <br />EXPERIENCES
            </h1>

            <p className="home-sub">
              Building Scalable Web, Mobile &amp; AI Powered Experiences
            </p>

            <div className="home-ctas">
              <Link to="/projects">
                <button className="btn-gradient">View Projects</button>
              </Link>
              <Link to="/experience">
                <button className="btn-outline" style={{ marginTop: 12 }}>Hire Me</button>
              </Link>
              <Link to="/experience" className="home-contact-link">
                Contact Me →
              </Link>
            </div>
          </div>

          {/* Right: profile visual */}
          <div className="home-profile-wrapper">
            <div className="home-profile-badge home-profile-badge--arch">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>E ARCHITECTURE</span>
            </div>

            <div className="home-profile-ring">
              <div className="home-profile-img">
                <img src={profileImage} alt="Profile" className="home-profile-photo" />
              </div>
            </div>

            <div className="home-profile-badge home-profile-badge--ai">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>AI INTEGRATION</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: '0 24px' }} />

      {/* Precision Engineering */}
      <section className="home-precision page">
        <div className="home-precision-desktop">
          {/* Left: title + desc */}
          <div>
            <div className="home-precision-header">
              <h2 className="home-precision-title">
                Fast by default.<br />
                <span style={{ color: 'var(--cyan)' }}> Clean by habit.</span>
              </h2>
              <div className="home-precision-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
            </div>
            <p className="home-precision-desc">
              Crafting high-performance digital solutions that bridge the gap between
              complex backend systems and intuitive user interfaces. Specializing in
              TypeScript, React, and cloud-native AI infrastructures.
            </p>
          </div>

          {/* Right: stats */}
          <div className="home-stats">
            <div className="home-stat card">
              <span className="home-stat-value">7+</span>
              <span className="home-stat-label">DEPLOYMENTS</span>
            </div>
            <div className="home-stat card">
              <span className="home-stat-value" style={{ color: 'var(--cyan)' }}>99%</span>
              <span className="home-stat-label">UPTIME SCORE</span>
            </div>
            <div className="home-stat card">
              <span className="home-stat-value">1.5+</span>
              <span className="home-stat-label">YEARS EXP.</span>
            </div>
            <div className="home-stat card">
              <span className="home-stat-value" style={{ color: 'var(--purple-light)' }}>AI</span>
              <span className="home-stat-label">NATIVE STACK</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

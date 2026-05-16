import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner page">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">▶</span>
          <span className="navbar-logo-text">Nachiket</span>
        </Link>

        {/* Desktop links */}
        <div className="navbar-desktop-links">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-desktop-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link to="/experience" className="navbar-desktop-cta">
          Hire Me
        </Link>

        {/* Mobile hamburger */}
        <button className="navbar-menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className={`hamburger ${open ? 'open' : ''}`}>
            <span /><span /><span />
          </span>
        </button>
      </div>

      {open && (
        <div className="navbar-dropdown">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-dropdown-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

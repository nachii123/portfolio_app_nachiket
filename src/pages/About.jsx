import Footer from '../components/Footer';
import './About.css';

const techStack = [
  { name: 'React.js', color: '#61dafb', bg: '#0a2a3a',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5" width="26" height="26"><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg> },
  // { name: 'Node.js', color: '#68d391', bg: '#0a2a1a',
    // icon: <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><text x="3" y="18" fontSize="14" fontWeight="bold" fill="#68d391" fontFamily="monospace">JS</text></svg> },
  { name: 'Spring Boot', color: '#f6ad55', bg: '#2a1a0a',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f6ad55" strokeWidth="1.5" width="26" height="26"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg> },
  { name: 'React Native', color: '#00e5ff', bg: '#0a2a3a',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" width="26" height="26"><rect x="3" y="2" width="12" height="18" rx="2"/><line x1="7" y1="22" x2="11" y2="22"/></svg> },
  { name: 'MongoDB', color: '#68d391', bg: '#0a2a1a',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#68d391" strokeWidth="1.5" width="26" height="26"><ellipse cx="12" cy="12" rx="6" ry="10"/><path d="M12 2v20"/></svg> },
  { name: 'MySQL', color: '#f6ad55', bg: '#2a1a0a',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f6ad55" strokeWidth="1.5" width="26" height="26"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg> },
  { name: 'Firebase', color: '#fb923c', bg: '#2a1500',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.5" width="26" height="26"><path d="M12 2L4 20l8-4 8 4L12 2z"/><path d="M4 20L12 8l3 6"/></svg> },
  { name: 'Docker', color: '#a855f7', bg: '#1a0a2a',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" width="26" height="26"><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M3 13h18M7 9V7M12 9V7M17 9V7"/></svg> },
];

export default function About() {
  return (
    <div className="about fade-in">
      {/* Header */}
      <section className="about-header page">
        <div className="section-label" style={{ marginBottom: 16 }}>ABOUT ME</div>
        <h1 className="about-title">THE ENGINEER</h1>
        <div className="about-title-line" />

        {/* Desktop: two-column — bio left, terminal right */}
        <div className="about-top-grid" style={{ marginTop: 24 }}>
          <div>
            <div className="card">
              <p className="about-bio">
                I'm a Full Stack Engineer who goes from idea to deployed product quickly. With hands-on experience across React, SpringBoot, and AI integrations, I build things that work — and ship them before the deadline.
              </p>
            </div>

            {/* Vision & Execution */}
            <div className="about-values">
              <div className="about-value">
                <div className="about-value-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <div className="about-value-title">VISION</div>
                  <p className="about-value-text">
                    Building scalable architectures that anticipate future growth and user needs.
                  </p>
                </div>
              </div>
              <div className="about-value">
                <div className="about-value-icon" style={{ color: 'var(--purple-light)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <div>
                  <div className="about-value-title" style={{ color: 'var(--purple-light)' }}>EXECUTION</div>
                  <p className="about-value-text">
                    Meticulous code quality and performance optimization across the entire stack.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="about-terminal">
            <div className="about-terminal-window card">
              <div className="about-terminal-bar">
                <span className="about-terminal-dot" style={{ background: '#ff5f56' }} />
                <span className="about-terminal-dot" style={{ background: '#ffbd2e' }} />
                <span className="about-terminal-dot" style={{ background: '#27c93f' }} />
              </div>
              <div className="about-terminal-body">
                <div className="about-terminal-line">
                  <span className="about-terminal-prompt">~</span>
                  <span className="about-terminal-cmd"> node run app.js</span>
                </div>
                <div className="about-terminal-line about-terminal-output">Initializing full-stack engine...</div>
                <div className="about-terminal-line about-terminal-output">Loading AI modules... <span style={{ color: '#34d399' }}>✓</span></div>
                <div className="about-terminal-line about-terminal-output">React renderer ready... <span style={{ color: '#34d399' }}>✓</span></div>
                <div className="about-terminal-line about-terminal-output">Cloud connectors active... <span style={{ color: '#34d399' }}>✓</span></div>
                <div className="about-terminal-line about-terminal-output">TypeScript compiler: OK... <span style={{ color: '#34d399' }}>✓</span></div>
                <div className="about-terminal-line about-terminal-output">Docker containers up... <span style={{ color: '#34d399' }}>✓</span></div>
                <div className="about-terminal-line">
                  <span className="about-terminal-prompt">~</span>
                  <span className="about-terminal-cursor">_</span>
                </div>
              </div>
            </div>
            <div className="about-system-status">
              <span className="status-dot" />
              <span className="about-system-status-text">SYSTEM_STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: '0 24px' }} />

      {/* Tech Stack */}
      <section className="about-stack page">
        <div className="section-label" style={{ marginBottom: 16 }}>CAPABILITIES</div>
        <h2 className="about-stack-title">TECH STACK</h2>
        <div className="about-stack-grid">
          {techStack.map(tech => (
            <div key={tech.name} className="about-stack-item card">
              <div className="about-stack-icon" style={{ background: tech.bg }}>
                {tech.icon}
              </div>
              <span className="about-stack-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

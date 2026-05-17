import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';
import './Experience.css';

// ── EmailJS credentials ──────────────────────────────────────────────────────
// 1. Sign up free at https://emailjs.com
// 2. Add a Gmail service → copy the Service ID below
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
//    Set "To Email" in the template to nachiket919156@gmail.com
// 4. Copy the Template ID and your Public Key (Account → API Keys)
const EJ_SERVICE  = 'YOUR_SERVICE_ID';
const EJ_TEMPLATE = 'YOUR_TEMPLATE_ID';
const EJ_KEY      = 'YOUR_PUBLIC_KEY';

const timeline = [
  // {
  //   period: 'PRESENT',
  //   title: 'Startup Founder & Architect',
  //   desc: 'Spearheading end-to-end development for a stealth fintech solution. Architecting scalable microservices and high-fidelity mobile experiences.',
  //   tags: [{ label: 'SCALE', color: '' }, { label: 'INNOVATION', color: 'orange' }],
  //   dotColor: '#00e5ff',
  // },
  {
    period: '2025 — Present',
    title: 'Full Stack Developer',
    desc: 'Bridging the gap between robust backend systems and fluid frontend interfaces. Optimized database queries reducing latency by 40%.',
    tags: [{ label: 'REACT', color: '' }, { label: 'NODE.JS', color: 'green' }],
    dotColor: '#a855f7',
  },
  {
    period: '2024 — 2025',
    title: 'Android Developer',
    desc: 'Crafting performance-driven Android applications with Kotlin. Focused on Jetpack Compose and Material Design 3 implementations.',
    tags: [{ label: 'KOTLIN', color: 'orange' }, { label: 'COROUTINES', color: 'purple' }],
    dotColor: '#fb923c',
  },
];

export default function Experience() {
  const [formData, setFormData] = useState({ name: '', email: '', project: '' });

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        EJ_SERVICE,
        EJ_TEMPLATE,
        { from_name: formData.name, from_email: formData.email, message: formData.project },
        EJ_KEY
      );
      alert("Message sent! I'll get back to you soon.");
      setFormData({ name: '', email: '', project: '' });
    } catch {
      alert('Could not send message. Please email me directly at nachiket919156@gmail.com');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="experience fade-in">
      <section className="experience-header page">
        <div className="section-label" style={{ marginBottom: 12 }}>EXPERIENCE</div>
        <h1 className="experience-title">JOURNEY</h1>
        <div className="experience-title-line" />
      </section>

      {/* Desktop: two-column grid wrapping timeline + contact */}
      <section className="page" style={{ paddingBottom: 8 }}>
        <div className="experience-main-grid">
          {/* Timeline */}
          <div className="experience-timeline">
            <div className="timeline-track">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot-col">
                    <div
                      className="timeline-dot"
                      style={{ background: item.dotColor, boxShadow: `0 0 10px ${item.dotColor}66` }}
                    />
                    {i < timeline.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-content card">
                    <div className="timeline-period">{item.period}</div>
                    <h3 className="timeline-job">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                    <div className="timeline-tags">
                      {item.tags.map(t => (
                        <span key={t.label} className={`tag ${t.color}`}>{t.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact / CTA */}
          <div className="experience-contact">
            <div className="experience-contact-card card">
              <h2 className="experience-contact-title">LET'S BUILD</h2>
              <p className="experience-contact-sub">
                Currently accepting high-impact collaborations. Whether it's a startup
                venture or a precision engineering task, let's redefine what's possible.
              </p>
              <form className="experience-form" onSubmit={handleSubmit}>
                <div className="experience-form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="experience-input"
                    required
                  />
                </div>
                <div className="experience-form-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="experience-input"
                    required
                  />
                </div>
                <div className="experience-form-field">
                  <textarea
                    name="project"
                    placeholder="Project Overview"
                    value={formData.project}
                    onChange={handleChange}
                    className="experience-input experience-textarea"
                    rows={4}
                    required
                  />
                </div>
                <button type="submit" className="btn-gradient" style={{ marginTop: 8 }} disabled={sending}>
                  {sending ? 'SENDING...' : 'INITIATE PROJECT'}
                </button>
              </form>
              <a
                href="https://drive.google.com/file/d/1E9Y1wbTq5Pja0yPMF5bsmadnmGzWbWzm/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline experience-resume-btn"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8 }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                DOWNLOAD RESUME →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

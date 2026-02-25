import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageMeta } from '../utils/seo';
import SocialProof from '../components/SocialProof';
import './Home.css';

const TOOLS = [
  { path: '/tools/pdf-to-word', label: 'PDF to Word', desc: 'Edit PDFs in Word format. Preserve layout, extract text.', icon: 'pdf-word', badges: ['Free', 'Instant', 'Secure'] },
  { path: '/tools/word-to-pdf', label: 'Word to PDF', desc: 'Create PDFs from Word. Perfect formatting for submissions.', icon: 'word-pdf', badges: ['Free', 'Instant', 'Secure'] },
  { path: '/tools/reduce-size', label: 'Reduce Size', desc: 'Compress to target size. Same format, smaller file.', icon: 'compress', badges: ['Free', 'Instant', 'Secure'] },
  { path: '/tools/merge-pdf', label: 'Merge PDF', desc: 'Combine PDFs into one. Reorder, merge in seconds.', icon: 'merge', badges: ['Free', 'Instant', 'Secure'] },
  { path: '/tools/merge-docx', label: 'Merge DOCX', desc: 'Combine Word docs. One file, one click.', icon: 'merge-doc', badges: ['Free', 'Instant', 'Secure'] },
  { path: '/tools/add-page-numbers', label: 'Add Page Numbers', desc: 'Add page numbers to PDF or Word. Meet submission rules.', icon: 'numbers', badges: ['Free', 'Instant', 'Secure'] },
  { path: '/tools/remove-watermark', label: 'Remove Watermark', desc: 'Remove DRAFT, CONFIDENTIAL. Clean documents.', icon: 'watermark', badges: ['Free', 'Instant', 'Secure'] },
];

const Icon = ({ name }) => {
  const icons = {
    'pdf-word': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 13H8" strokeWidth="2" strokeLinecap="round"/><path d="M16 17H8" strokeWidth="2" strokeLinecap="round"/></>,
    'word-pdf': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 13h2l1 4 1-4h2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    'compress': <><path d="M21 8V4h-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 8V4h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 16v4h-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16v4h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 3h8" strokeWidth="2" strokeLinecap="round"/><path d="M8 21h8" strokeWidth="2" strokeLinecap="round"/></>,
    'merge': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18v-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15l3 3 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    'merge-doc': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 13H8" strokeWidth="2" strokeLinecap="round"/><path d="M16 17H8" strokeWidth="2" strokeLinecap="round"/><path d="M10 9H8" strokeWidth="2" strokeLinecap="round"/></>,
    'numbers': <><path d="M4 4h16v16H4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 8h8" strokeWidth="2" strokeLinecap="round"/><path d="M8 12h8" strokeWidth="2" strokeLinecap="round"/><path d="M8 16h5" strokeWidth="2" strokeLinecap="round"/></>,
    'watermark': <><path d="M12 3v18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 8l8 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 8l-8 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
  };
  return (
    <svg className="tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {icons[name] || icons['pdf-word']}
    </svg>
  );
};

export default function Home() {
  useEffect(() => {
    setPageMeta({
      title: 'DocEase - Professional Document Tools Free Online | PDF & Word Converter',
      description: 'DocEase: Convert PDF to Word, Word to PDF, merge, compress, add page numbers. Free, secure, no signup. Built for students, educators & government professionals.',
    });
  }, []);

  return (
    <div className="home-page">
      <div className="home-bg-shapes">
        <div className="home-shape home-shape-1" />
        <div className="home-shape home-shape-2" />
        <div className="home-shape home-shape-3" />
        <div className="home-shape home-shape-4" />
      </div>

      <section className="home-hero">
        <span className="home-hero-badge">No Signup • 100% Secure • Fast Processing</span>
        <h1 className="home-hero-title">
          Professional Document Tools. <span className="gradient-text">Simplified.</span>
        </h1>
        <p className="home-hero-subtitle">
          Convert, merge, compress & format PDF and Word files in seconds. Built for students, educators & government professionals.
        </p>
        <div className="home-cta-group">
          <Link to="/tools/pdf-to-word" className="home-cta home-cta-primary btn-ripple" id="start-converting">
            Start Converting Free
          </Link>
          <Link to="/#tools" className="home-cta home-cta-secondary">
            Explore All Tools
          </Link>
        </div>
        <div className="home-audience">
          <span>Students</span>
          <span>Educators</span>
          <span>Government</span>
        </div>
      </section>

      <SocialProof />

      <section className="home-tools" id="tools">
        <h2 className="home-tools-title">Choose your tool</h2>
        <div className="home-tool-grid">
          {TOOLS.map(({ path, label, desc, icon, badges }, i) => (
            <Link key={path} to={path} className="home-tool-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="home-tool-card-icon-wrap">
                <Icon name={icon} />
              </div>
              <h3>{label}</h3>
              <p>{desc}</p>
              <div className="home-tool-badges">
                {badges.map((b) => (
                  <span key={b} className="home-tool-badge">{b}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

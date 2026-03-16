import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SocialProof from './SocialProof';
import './Layout.css';

const TOOLS = [
  { path: '/tools/pdf-to-word', label: 'PDF to Word' },
  { path: '/tools/word-to-pdf', label: 'Word to PDF' },
  { path: '/tools/reduce-size', label: 'Reduce Size' },
  { path: '/tools/merge-pdf', label: 'Merge PDF' },
  { path: '/tools/merge-docx', label: 'Merge DOCX' },
  { path: '/tools/add-page-numbers', label: 'Add Page Numbers' },
  { path: '/tools/remove-watermark', label: 'Remove Watermark' },
];

export default function Layout() {
  const loc = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (loc.pathname === '/' && loc.hash === '#tools') {
      const el = document.getElementById('tools');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loc.pathname, loc.hash]);

  useEffect(() => {
    setToolsOpen(false);
    setMobileOpen(false);
  }, [loc.pathname]);

  const isToolActive = loc.pathname.startsWith('/tools/');

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo-link" onClick={() => setMobileOpen(false)}>
            <h1>DocEase</h1>
          </Link>
          <p className="tagline">Built for students, educators & government professionals</p>

          <button
            type="button"
            className={`nav-toggle ${mobileOpen ? 'nav-toggle-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>

          <nav className={`main-nav ${mobileOpen ? 'main-nav-open' : ''}`}>
            <Link to="/" className={loc.pathname === '/' ? 'active' : ''} onClick={() => setMobileOpen(false)}>
              All Tools
            </Link>
            <div
              className={`nav-dropdown ${toolsOpen ? 'nav-dropdown-open' : ''}`}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                className={`nav-dropdown-trigger ${isToolActive ? 'active' : ''}`}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                onClick={() => setToolsOpen((o) => !o)}
              >
                Tools
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 4.5L6 7.5L9 4.5" />
                </svg>
              </button>
              <div className="nav-dropdown-menu">
                {TOOLS.map(({ path, label }) => (
                  <Link key={path} to={path} className={loc.pathname === path ? 'active' : ''} onClick={() => setMobileOpen(false)}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/blog" className={loc.pathname.startsWith('/blog') ? 'active' : ''} onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
            <Link to="/faq" className={loc.pathname === '/faq' ? 'active' : ''} onClick={() => setMobileOpen(false)}>
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      <div className="social-proof-bar">
        <SocialProof />
      </div>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-section">
            <h4 className="footer-heading">Convert</h4>
            <div className="footer-links">
              <Link to="/tools/pdf-to-word">PDF to Word</Link>
              <Link to="/tools/word-to-pdf">Word to PDF</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Edit & Format</h4>
            <div className="footer-links">
              <Link to="/tools/reduce-size">Reduce Size</Link>
              <Link to="/tools/add-page-numbers">Add Page Numbers</Link>
              <Link to="/tools/remove-watermark">Remove Watermark</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Merge</h4>
            <div className="footer-links">
              <Link to="/tools/merge-pdf">Merge PDF</Link>
              <Link to="/tools/merge-docx">Merge DOCX</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Explore</h4>
            <div className="footer-links">
              <Link to="/">All Tools</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-brand">DocEase</span>
          <span>Files are processed temporarily and deleted immediately after download. Secure & private.</span>
        </div>
      </footer>
    </div>
  );
}

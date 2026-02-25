import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
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
  const isTool = loc.pathname.startsWith('/tools/');

  useEffect(() => {
    if (loc.pathname === '/' && loc.hash === '#tools') {
      const el = document.getElementById('tools');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loc.pathname, loc.hash]);

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo-link">
          <h1>DocEase</h1>
        </Link>
        <p className="tagline">Built for students, educators & government professionals</p>
        <nav className="main-nav">
          <Link to="/" className={loc.pathname === '/' ? 'active' : ''}>All Tools</Link>
          {TOOLS.map(({ path, label }) => (
            <Link key={path} to={path} className={loc.pathname === path ? 'active' : ''}>{label}</Link>
          ))}
          <Link to="/blog" className={loc.pathname.startsWith('/blog') ? 'active' : ''}>Blog</Link>
          <Link to="/faq" className={loc.pathname === '/faq' ? 'active' : ''}>FAQ</Link>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-section">
            <h4 className="footer-heading">Tools</h4>
            <div className="footer-links">
              <Link to="/">All Tools</Link>
              {TOOLS.map(({ path, label }) => (
                <Link key={path} to={path}>{label}</Link>
              ))}
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

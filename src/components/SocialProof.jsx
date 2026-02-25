import { useState, useEffect } from 'react';
import './SocialProof.css';

const STORAGE_KEY = 'doc_conversion_counter';
const BASE_COUNT = 1000;

export default function SocialProof() {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) setCount(parsed);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    const handler = () => {
      setCount((c) => c + 1);
    };
    window.addEventListener('conversion-complete', handler);
    return () => window.removeEventListener('conversion-complete', handler);
  }, []);

  return (
    <div className="social-proof">
      <span className="social-proof-badge">✓</span>
      <p className="social-proof-text">
        Trusted by <strong>{count.toLocaleString()}+</strong> students, educators & professionals
      </p>
    </div>
  );
}

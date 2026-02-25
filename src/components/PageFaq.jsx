import { useState } from 'react';
import FadeInSection from './FadeInSection';
import './PageFaq.css';

export default function PageFaq({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items || items.length === 0) return null;

  return (
    <FadeInSection>
    <div className="page-faq">
      <h3 className="page-faq-title">Frequently Asked Questions</h3>
      <div className="page-faq-list">
        {items.map((item, i) => (
          <div
            key={i}
            className={`page-faq-item ${openIndex === i ? 'open' : ''}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <button className="page-faq-question" type="button" aria-expanded={openIndex === i}>
              {item.q}
              <span className="page-faq-icon">{openIndex === i ? '−' : '+'}</span>
            </button>
            <div className="page-faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </FadeInSection>
  );
}

import { useState, useEffect } from 'react';
import { setPageMeta } from '../utils/seo';
import './PageLayout.css';
import './Faq.css';

const FAQ_ITEMS = [
  {
    q: 'Is DocEase free to use?',
    a: 'Yes. DocEase is completely free. Convert, merge, compress, and format PDF and Word files with no signup or payment required.',
  },
  {
    q: 'Are my files secure?',
    a: 'Yes. Files are processed temporarily on our servers and deleted immediately after you download the result. We do not store or share your documents.',
  },
  {
    q: 'What file formats are supported?',
    a: 'We support PDF (.pdf) and Word (.doc, .docx) files. You can convert between formats, merge multiple files, reduce file size, add page numbers, and remove watermarks.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'We support typical document sizes. Very large files (e.g., hundreds of MB) may take longer to process. For best results, keep files under 50MB.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. DocEase works without any signup or login. Just upload your file and download the result.',
  },
  {
    q: 'Who is DocEase built for?',
    a: 'DocEase is built for students, educators, and government professionals who need reliable, free document tools for assignments, reports, and official documents.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    setPageMeta({
      title: 'FAQ - DocEase',
      description: 'Frequently asked questions about DocEase. Free PDF and Word conversion, merging, compression, and more.',
    });
  }, []);

  return (
    <div className="page-layout faq-page">
      <section className="page-hero">
        <h1 className="page-hero-title">Frequently Asked Questions</h1>
        <p className="page-hero-subheading">Common questions about DocEase and our document tools.</p>
      </section>
      <div className="page-card faq-card">
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? 'open' : ''}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <button className="faq-question" type="button" aria-expanded={openIndex === i}>
              {item.q}
              <span className="faq-icon">{openIndex === i ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

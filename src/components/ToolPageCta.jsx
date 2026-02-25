import FadeInSection from './FadeInSection';
import './ToolPageCta.css';

export default function ToolPageCta({ onScrollToTop }) {
  const handleClick = () => {
    document.getElementById('tool-hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onScrollToTop?.();
  };

  return (
    <FadeInSection>
      <section className="tool-page-cta">
        <h2 className="tool-page-cta-title">Ready to get started?</h2>
        <p className="tool-page-cta-subtitle">Upload your file above and convert in seconds. No signup required.</p>
        <button type="button" className="tool-page-cta-btn" onClick={handleClick}>
          Start Converting Free
        </button>
      </section>
    </FadeInSection>
  );
}

import FadeInSection from './FadeInSection';
import './PageCta.css';

export default function PageCta({ scrollToTool }) {
  const handleClick = () => {
    if (scrollToTool) {
      const el = document.querySelector('.card');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <FadeInSection>
    <div className="page-cta">
      <h3 className="page-cta-title">Ready to convert your file?</h3>
      <p className="page-cta-subtitle">Upload your document and get results in seconds. No signup required.</p>
      <button type="button" className="page-cta-btn btn-glow" onClick={handleClick}>
        Start Converting Free
      </button>
    </div>
    </FadeInSection>
  );
}

import FadeInSection from './FadeInSection';
import './PageWhyChoose.css';

const ITEMS = [
  { icon: '🔒', text: 'Secure processing — files deleted after download' },
  { icon: '💰', text: 'No hidden fees — completely free to use' },
  { icon: '👥', text: 'Designed for students & professionals' },
  { icon: '⚡', text: 'Fast performance — instant results' },
];

export default function PageWhyChoose() {
  return (
    <FadeInSection>
    <div className="page-why-choose">
      <h3 className="page-why-choose-title">Why Choose DocEase?</h3>
      <div className="page-why-choose-grid">
        {ITEMS.map((item, i) => (
          <div key={i} className="page-why-choose-item">
            <span className="page-why-choose-icon">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
    </FadeInSection>
  );
}

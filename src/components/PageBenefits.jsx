import FadeInSection from './FadeInSection';
import './PageBenefits.css';

export default function PageBenefits({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <FadeInSection>
    <div className="page-benefits">
      <h3 className="page-benefits-title">Benefits</h3>
      <ul className="page-benefits-list">
        {items.map((item, i) => {
          const icon = typeof item === 'object' ? item.icon : '✓';
          const text = typeof item === 'object' ? item.text : item;
          return (
            <li key={i} className="page-benefits-item">
              <span className="page-benefits-icon">{icon}</span>
              <span>{text}</span>
            </li>
          );
        })}
      </ul>
    </div>
    </FadeInSection>
  );
}

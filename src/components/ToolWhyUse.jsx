import FadeInSection from './FadeInSection';
import './ToolWhyUse.css';

export default function ToolWhyUse({ title, intro, cards }) {
  if (!cards?.length) return null;

  return (
    <FadeInSection>
      <section className="tool-why-use">
        <h2 className="tool-why-use-title">{title}</h2>
        {intro && <p className="tool-why-use-intro">{intro}</p>}
        <div className="tool-why-use-grid">
          {cards.slice(0, 4).map((card, i) => (
            <div key={i} className="tool-why-use-card">
              <span className="tool-why-use-icon">{card.icon}</span>
              <h3 className="tool-why-use-card-title">{card.title}</h3>
              <p className="tool-why-use-card-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
}

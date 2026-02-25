import FadeInSection from './FadeInSection';
import './ToolHowItWorks.css';

const STEPS = [
  { num: 1, label: 'Upload', desc: 'Drop your file or click to browse' },
  { num: 2, label: 'Process', desc: 'We convert securely in seconds' },
  { num: 3, label: 'Download', desc: 'Get your file instantly' },
];

export default function ToolHowItWorks() {
  return (
    <FadeInSection>
      <section className="tool-how-it-works">
        <h2 className="tool-how-title">How It Works</h2>
        <div className="tool-how-steps">
          {STEPS.map((step, i) => (
            <div key={step.num} className="tool-how-step">
              <div className="tool-how-step-num">{step.num}</div>
              <h3 className="tool-how-step-label">{step.label}</h3>
              <p className="tool-how-step-desc">{step.desc}</p>
              {i < STEPS.length - 1 && <span className="tool-how-arrow">→</span>}
            </div>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
}

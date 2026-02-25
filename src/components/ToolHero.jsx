import { useRef } from 'react';
import FadeInSection from './FadeInSection';
import './ToolHero.css';

const TRUST_ITEMS = ['Secure', 'Instant', 'No Signup', 'Auto-delete files'];

export default function ToolHero({ title, subheading, children, uploadProps }) {
  const inputRef = useRef(null);
  const { accept, multiple, id = 'tool-file-input', onFileChange, file, files, placeholder, label } = uploadProps || {};

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const items = e.dataTransfer?.files;
    if (!items?.length) return;
    if (multiple) {
      onFileChange?.(Array.from(items));
    } else {
      onFileChange?.(items[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const displayText = file ? file.name : (files?.length ? `${files.length} file(s) selected` : placeholder || 'Drop files here or click to browse');

  return (
    <FadeInSection>
      <section className="tool-hero" id="tool-hero">
        <h1 className="tool-hero-title">{title}</h1>
        <p className="tool-hero-subheading">{subheading}</p>
        <div className="tool-hero-trust">
          {TRUST_ITEMS.map((t) => (
            <span key={t} className="tool-hero-trust-item">{t}</span>
          ))}
        </div>
        <div className="tool-hero-upload-wrap">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            id={id}
            onChange={(e) => {
              const items = e.target.files;
              if (multiple) onFileChange?.(Array.from(items || []));
              else onFileChange?.(items?.[0] || null);
            }}
            className="tool-hero-input"
          />
          <div
            className="tool-hero-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => inputRef.current?.click()}
          >
            <span className="tool-hero-dropzone-icon">📄</span>
            <span className="tool-hero-dropzone-text">{displayText}</span>
            <span className="tool-hero-dropzone-hint">{label || 'Click or drag files here'}</span>
          </div>
        </div>
        <div className="tool-hero-form">
          {children}
        </div>
      </section>
    </FadeInSection>
  );
}

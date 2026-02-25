import { useState, useEffect } from 'react';
import { API_BASE } from '../utils/api';
import { setPageMeta } from '../utils/seo';
import { useConverter } from '../hooks/useConverter';
import ToolHero from '../components/ToolHero';
import ToolWhyUse from '../components/ToolWhyUse';
import ToolHowItWorks from '../components/ToolHowItWorks';
import PageFaq from '../components/PageFaq';
import ToolPageCta from '../components/ToolPageCta';
import { PAGE_FAQS, TOOL_WHY_USE } from '../data/pageContent';
import './ToolPage.css';

export default function WordToPdf() {
  const { loading, setLoading, error, setError, canConvert, onSuccess } = useConverter();
  const [file, setFile] = useState(null);

  useEffect(() => {
    setPageMeta({
      title: 'Word to PDF Converter - Free Online | DocEase',
      description: 'Convert Word (.doc, .docx) to PDF instantly. Free, secure, no signup. Preserve formatting.',
    });
  }, []);

  const handleConvert = async () => {
    if (!file) { setError('Please select a Word file'); return; }
    if (!canConvert()) { setError('Daily limit reached.'); return; }
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_BASE}/word-to-pdf`, { method: 'POST', body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Conversion failed');
      }
      const blob = await res.blob();
      onSuccess(blob, file.name.replace(/\.(docx?)$/i, '.pdf'));
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <ToolHero
        title="Word to PDF Converter"
        subheading="Convert Word documents to PDF. Preserve formatting, fonts, and layout. Free, secure, no signup."
        uploadProps={{
          accept: '.docx,.doc',
          id: 'doc-input',
          file,
          onFileChange: setFile,
          placeholder: 'Choose Word file',
          label: 'Click or drag your Word document here',
        }}
      >
        <button className="btn-primary" onClick={handleConvert} disabled={loading || !file}>
          {loading ? 'Converting...' : 'Convert to PDF'}
        </button>
        {error && <p className="error-msg">{error}</p>}
      </ToolHero>

      <ToolWhyUse {...TOOL_WHY_USE['word-to-pdf']} />
      <ToolHowItWorks />
      <PageFaq items={PAGE_FAQS['word-to-pdf']} />
      <ToolPageCta />
    </div>
  );
}

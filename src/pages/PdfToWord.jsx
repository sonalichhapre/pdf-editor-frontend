import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { API_BASE } from '../utils/api';
import { useConverter } from '../hooks/useConverter';
import ToolHero from '../components/ToolHero';
import ToolWhyUse from '../components/ToolWhyUse';
import ToolHowItWorks from '../components/ToolHowItWorks';
import PageFaq from '../components/PageFaq';
import ToolPageCta from '../components/ToolPageCta';
import { PAGE_FAQS, TOOL_WHY_USE } from '../data/pageContent';
import './ToolPage.css';

export default function PdfToWord() {
  const { loading, setLoading, error, setError, canConvert, onSuccess } = useConverter();
  const [file, setFile] = useState(null);

  const handleConvert = async () => {
    if (!file) { setError('Please select a PDF file'); return; }
    if (!canConvert()) { setError('Daily limit reached.'); return; }
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_BASE}/pdf-to-word`, { method: 'POST', body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Conversion failed');
      }
      const blob = await res.blob();
      onSuccess(blob, file.name.replace(/\.pdf$/i, '.docx'));
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <Helmet>
        <title>PDF to Word Converter Free Online — DocEase</title>
        <meta name="description" content="Convert PDF to editable Word document in seconds. Preserve layout, fonts and formatting. Free, no signup, instant download." />
      </Helmet>
      <ToolHero
        title="PDF to Word Converter"
        subheading="Convert PDF to editable Word (.docx) format. Preserve layout, extract text, edit anywhere. Free, secure, no signup."
        uploadProps={{
          accept: '.pdf',
          id: 'pdf-input',
          file,
          onFileChange: setFile,
          placeholder: 'Choose PDF file',
          label: 'Click or drag your PDF here',
        }}
      >
        <button className="btn-primary" onClick={handleConvert} disabled={loading || !file}>
          {loading ? 'Converting...' : 'Convert to Word'}
        </button>
        {error && <p className="error-msg">{error}</p>}
      </ToolHero>
      <ToolWhyUse {...TOOL_WHY_USE['pdf-to-word']} />
      <ToolHowItWorks />
      <PageFaq items={PAGE_FAQS['pdf-to-word']} />
      <ToolPageCta />
    </div>
  );
}

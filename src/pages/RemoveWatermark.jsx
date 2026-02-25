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

export default function RemoveWatermark() {
  const { loading, setLoading, error, setError, canConvert, onSuccess } = useConverter();
  const [file, setFile] = useState(null);

  useEffect(() => {
    setPageMeta({
      title: 'Remove Watermark from PDF & Word - Free Online | DocEase',
      description: 'Remove watermarks from PDF or Word documents. Works with annotation watermarks (PDF) and header watermarks (Word). Free, no signup.',
    });
  }, []);

  const handleConvert = async () => {
    if (!file) { setError('Please select a file'); return; }
    if (!canConvert()) { setError('Daily limit reached.'); return; }
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_BASE}/remove-watermark`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || 'Failed');
      const blob = await res.blob();
      const ext = file.name.split('.').pop()?.toLowerCase();
      const suffix = ext === 'pdf' ? '_no_watermark.pdf' : '_no_watermark.docx';
      onSuccess(blob, file.name.replace(/\.[^.]+$/, suffix));
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <ToolHero
        title="Remove Watermark from PDF & Word"
        subheading="Remove watermarks from PDF or Word. PDF: annotation watermarks. Word: DRAFT, CONFIDENTIAL, header watermarks. Free, secure, no signup."
        uploadProps={{
          accept: '.pdf,.docx,.doc',
          id: 'watermark-input',
          file,
          onFileChange: setFile,
          placeholder: 'Choose PDF or Word file',
          label: 'Click or drag your file here',
        }}
      >
        <button className="btn-primary" onClick={handleConvert} disabled={loading || !file}>
          {loading ? 'Removing...' : 'Remove Watermark'}
        </button>
        {error && <p className="error-msg">{error}</p>}
      </ToolHero>

      <ToolWhyUse {...TOOL_WHY_USE['remove-watermark']} />
      <ToolHowItWorks />
      <PageFaq items={PAGE_FAQS['remove-watermark']} />
      <ToolPageCta />
    </div>
  );
}

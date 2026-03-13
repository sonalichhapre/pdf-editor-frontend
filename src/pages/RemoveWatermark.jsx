import { useState, useEffect } from 'react';
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

function useLiveUserCount(start = 1000) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

export default function RemoveWatermark() {
  const { loading, setLoading, error, setError, canConvert, onSuccess } = useConverter();
  const [file, setFile] = useState(null);
  const userCount = useLiveUserCount(1000);

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
      <Helmet>
        <title>Remove Watermark from PDF Free — DocEase</title>
        <meta name="description" content="Remove DRAFT, CONFIDENTIAL and other watermarks from PDF documents. Clean, instant and free. No signup required." />
      </Helmet>
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', margin: '0 0 8px' }}>
        👥 {userCount.toLocaleString()}+ users served today
      </p>
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

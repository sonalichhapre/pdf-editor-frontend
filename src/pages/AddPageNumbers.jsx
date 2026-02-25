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

export default function AddPageNumbers() {
  const { loading, setLoading, error, setError, canConvert, onSuccess } = useConverter();
  const [file, setFile] = useState(null);
  const [start, setStart] = useState('1');
  const [total, setTotal] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    setPageMeta({
      title: 'Add Page Numbers to PDF & Word - Free Online | DocEase',
      description: 'Add page numbers to PDF or Word documents. Set start number and total. Free, no signup.',
    });
  }, []);

  const handleConvert = async () => {
    if (!file) { setError('Please select a file'); return; }
    if (!canConvert()) { setError('Daily limit reached.'); return; }
    setLoading(true); setError(''); setWarning('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('start', start);
      if (total) fd.append('total', total);
      const res = await fetch(`${API_BASE}/add-page-numbers`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || 'Failed');
      const mismatch = res.headers.get('X-Total-Mismatch');
      if (mismatch) setWarning(mismatch);
      const blob = await res.blob();
      const ext = file.name.split('.').pop()?.toLowerCase();
      const suffix = ext === 'pdf' ? '_numbered.pdf' : '_numbered.docx';
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
        title="Add Page Numbers to PDF & Word"
        subheading="Add page numbers in the bottom-right corner. Set start number and total for &quot;Page X of Y&quot;. Works on PDF and Word. Free, no signup."
        uploadProps={{
          accept: '.pdf,.docx,.doc',
          id: 'page-num-input',
          file,
          onFileChange: setFile,
          placeholder: 'Choose PDF or Word file',
          label: 'Click or drag your file here',
        }}
      >
        <div className="target-row">
          <label htmlFor="start">Start number (first page shows this)</label>
          <input id="start" type="number" min="1" value={start} onChange={(e) => setStart(e.target.value)} className="target-input" style={{ width: '6rem' }} />
        </div>
        <div className="target-row">
          <label htmlFor="total">Total pages (optional; leave blank for actual count)</label>
          <input id="total" type="number" min="1" placeholder="Auto" value={total} onChange={(e) => setTotal(e.target.value)} className="target-input" style={{ width: '6rem' }} />
        </div>
        <button className="btn-primary" onClick={handleConvert} disabled={loading || !file}>
          {loading ? 'Adding...' : 'Add Page Numbers'}
        </button>
        {warning && <p className="warning-msg">{warning}</p>}
        {error && <p className="error-msg">{error}</p>}
      </ToolHero>

      <ToolWhyUse {...TOOL_WHY_USE['add-page-numbers']} />
      <ToolHowItWorks />
      <PageFaq items={PAGE_FAQS['add-page-numbers']} />
      <ToolPageCta />
    </div>
  );
}

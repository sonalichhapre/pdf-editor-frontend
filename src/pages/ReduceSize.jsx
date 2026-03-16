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

export default function ReduceSize() {
  const { loading, setLoading, error, setError, canConvert, onSuccess } = useConverter();
  const [file, setFile] = useState(null);
  const [targetSizeKb, setTargetSizeKb] = useState('');

  const handleConvert = async () => {
    if (!file) { setError('Please select a file'); return; }
    if (!targetSizeKb || parseFloat(targetSizeKb) <= 0) { setError('Please enter a target size (KB)'); return; }
    if (!canConvert()) { setError('Daily limit reached.'); return; }
    const ext = file.name.split('.').pop()?.toLowerCase();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('target_size_kb', targetSizeKb);
      const endpoint = ext === 'pdf' ? '/reduce-pdf' : '/reduce-word';
      const res = await fetch(`${API_BASE}${endpoint}`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || 'Failed');
      const blob = await res.blob();
      const suffix = ext === 'pdf' ? '_reduced.pdf' : '_reduced.docx';
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
        <title>Reduce PDF Size Free — Shrink PDF Files Online — DocEase</title>
        <meta name="description" content="Shrink large PDF files to a target size instantly. Same format, smaller file. Free online tool for students and professionals." />
      </Helmet>
      <ToolHero
        title="Reduce PDF & Word File Size"
        subheading="Compress files to a target size. Same format output—PDF stays PDF, Word stays Word. Meet email limits. Free, secure."
        uploadProps={{
          accept: '.pdf,.docx,.doc',
          id: 'reduce-input',
          file,
          onFileChange: setFile,
          placeholder: 'Choose file',
          label: 'Click or drag your file here',
        }}
      >
        <div className="target-row">
          <label htmlFor="target-size">Target size (KB)</label>
          <input id="target-size" type="number" min="1" step="100" placeholder="e.g. 500" value={targetSizeKb} onChange={(e) => setTargetSizeKb(e.target.value)} className="target-input" />
        </div>
        <button className="btn-primary" onClick={handleConvert} disabled={loading || !file || !targetSizeKb}>
          {loading ? 'Processing...' : 'Reduce & Download'}
        </button>
        {error && <p className="error-msg">{error}</p>}
      </ToolHero>
      <ToolWhyUse {...TOOL_WHY_USE['reduce-size']} />
      <ToolHowItWorks />
      <PageFaq items={PAGE_FAQS['reduce-size']} />
      <ToolPageCta />
    </div>
  );
}

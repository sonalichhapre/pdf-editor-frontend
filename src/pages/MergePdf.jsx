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

function MergePdf() {
  const { loading, setLoading, error, setError, canConvert, onSuccess } = useConverter();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setPageMeta({
      title: 'Merge PDF Files - Free Online | DocEase',
      description: 'Combine multiple PDFs into one. Free, secure. Set order and merge in seconds.',
    });
  }, []);

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const target = index + direction;
    if (target < 0 || target >= newFiles.length) return;
    [newFiles[index], newFiles[target]] = [newFiles[target], newFiles[index]];
    setFiles(newFiles);
  };

  const moveToStart = (i) => { if (i === 0) return; const n = [...files]; const [item] = n.splice(i, 1); setFiles([item, ...n]); };
  const moveToEnd = (i) => { if (i === files.length - 1) return; const n = [...files]; const [item] = n.splice(i, 1); setFiles([...n, item]); };
  const removeFile = (i) => setFiles(files.filter((_, i2) => i2 !== i));

  const handleMerge = async () => {
    if (files.length < 2) { setError('Please select at least 2 PDF files'); return; }
    if (!canConvert()) { setError('Daily limit reached.'); return; }
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append('files', f));
      const res = await fetch(`${API_BASE}/merge-pdf`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || 'Merge failed');
      const blob = await res.blob();
      onSuccess(blob, 'merged.pdf');
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <ToolHero
        title="Merge PDF Files"
        subheading="Combine multiple PDFs into one. Upload 2+ files, reorder with arrows, merge in seconds. Free, secure, no signup."
        uploadProps={{
          accept: '.pdf',
          multiple: true,
          id: 'merge-input',
          files,
          onFileChange: setFiles,
          placeholder: 'Choose PDF files',
          label: 'Click or drag PDF files here',
        }}
      >
        {files.length > 0 && (
          <div className="merge-list">
            <span className="merge-list-hint">Set order:</span>
            {files.map((f, i) => (
              <div key={`${f.name}-${i}`} className="merge-item">
                <span className="merge-order">{i + 1}</span>
                <span className="merge-filename" title={f.name}>{f.name}</span>
                <div className="merge-actions">
                  <button type="button" className="merge-btn" onClick={() => moveToStart(i)} disabled={i === 0} title="Start">⏮</button>
                  <button type="button" className="merge-btn" onClick={() => moveFile(i, -1)} disabled={i === 0} title="Up">↑</button>
                  <button type="button" className="merge-btn" onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} title="Down">↓</button>
                  <button type="button" className="merge-btn" onClick={() => moveToEnd(i)} disabled={i === files.length - 1} title="End">⏭</button>
                  <button type="button" className="merge-btn merge-btn-remove" onClick={() => removeFile(i)} title="Remove">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="btn-primary" onClick={handleMerge} disabled={loading || files.length < 2}>
          {loading ? 'Merging...' : 'Merge PDFs'}
        </button>
        {error && <p className="error-msg">{error}</p>}
      </ToolHero>

      <ToolWhyUse {...TOOL_WHY_USE['merge-pdf']} />
      <ToolHowItWorks />
      <PageFaq items={PAGE_FAQS['merge-pdf']} />
      <ToolPageCta />
    </div>
  );
}

export default MergePdf;

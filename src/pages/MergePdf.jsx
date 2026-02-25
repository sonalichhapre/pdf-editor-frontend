import { useState, useEffect } from 'react';
import { API_BASE } from '../utils/api';
import { setPageMeta } from '../utils/seo';
import { useConverter } from '../hooks/useConverter';
import ToolHero from '../components/ToolHero';
import MergeFileUpload from '../components/MergeFileUpload';
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

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge.');
      return;
    }
    if (!canConvert()) {
      setError('Daily limit reached.');
      return;
    }
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
        subheading="Combine multiple PDFs into one. Add files, reorder with arrows, merge in seconds. Free, secure, no signup."
        hideDefaultUpload
      >
        <MergeFileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf"
          fileTypeLabel="PDF files"
        />
        {files.length === 1 && (
          <p className="merge-validation-msg">Add at least one more file to merge.</p>
        )}
        <button
          className="btn-primary"
          onClick={handleMerge}
          disabled={loading || files.length < 2}
        >
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

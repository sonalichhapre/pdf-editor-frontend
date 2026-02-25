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

export default function MergeDocx() {
  const { loading, setLoading, error, setError, canConvert, onSuccess } = useConverter();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setPageMeta({
      title: 'Merge Word Documents - Free Online | DocEase',
      description: 'Combine multiple Word documents (.docx, .doc) into one. Free, secure. Set order and merge.',
    });
  }, []);

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 Word files to merge.');
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
      const res = await fetch(`${API_BASE}/merge-docx`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || 'Merge failed');
      const blob = await res.blob();
      onSuccess(blob, 'merged.docx');
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <ToolHero
        title="Merge Word Documents"
        subheading="Combine multiple Word files (.docx, .doc) into one. Add files, reorder with arrows, merge in seconds. Free, secure, no signup."
        hideDefaultUpload
      >
        <MergeFileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".docx,.doc"
          fileTypeLabel="Word files"
        />
        {files.length === 1 && (
          <p className="merge-validation-msg">Add at least one more file to merge.</p>
        )}
        <button
          className="btn-primary"
          onClick={handleMerge}
          disabled={loading || files.length < 2}
        >
          {loading ? 'Merging...' : 'Merge DOCX'}
        </button>
        {error && <p className="error-msg">{error}</p>}
      </ToolHero>

      <ToolWhyUse {...TOOL_WHY_USE['merge-docx']} />
      <ToolHowItWorks />
      <PageFaq items={PAGE_FAQS['merge-docx']} />
      <ToolPageCta />
    </div>
  );
}

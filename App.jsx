import { useState } from 'react';
import './App.css';

const API_BASE = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || '/api')
  : (import.meta.env.VITE_API_URL || 'https://pdf-editor-backend-1.onrender.com');

function App() {
  const [activeTab, setActiveTab] = useState('pdf-to-doc');
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [targetSizeKb, setTargetSizeKb] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handlePdfToDoc = async () => {
    if (!file) { setError('Please select a PDF file'); return; }
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_BASE}/pdf-to-word`, { method: 'POST', body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Conversion failed');
      }
      triggerDownload(await res.blob(), file.name.replace(/\.pdf$/i, '.docx'));
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDocToPdf = async () => {
    if (!file) { setError('Please select a Word file'); return; }
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_BASE}/word-to-pdf`, { method: 'POST', body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Conversion failed');
      }
      triggerDownload(await res.blob(), file.name.replace(/\.(docx?)$/i, '.pdf'));
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReduceSize = async () => {
    if (!file) { setError('Please select a file'); return; }
    if (!targetSizeKb || parseFloat(targetSizeKb) <= 0) {
      setError('Please enter a target size (KB)');
      return;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('target_size_kb', targetSizeKb);
      if (ext === 'pdf') {
        const res = await fetch(`${API_BASE}/reduce-pdf`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || 'Failed');
        triggerDownload(await res.blob(), file.name.replace(/\.pdf$/i, '_reduced.pdf'));
      } else {
        const res = await fetch(`${API_BASE}/reduce-word`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || 'Failed');
        triggerDownload(await res.blob(), file.name.replace(/\.(docx?)$/i, '_reduced.docx'));
      }
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const target = index + direction;
    if (target < 0 || target >= newFiles.length) return;
    [newFiles[index], newFiles[target]] = [newFiles[target], newFiles[index]];
    setFiles(newFiles);
  };

  const moveToStart = (index) => {
    if (index === 0) return;
    const newFiles = [...files];
    const [item] = newFiles.splice(index, 1);
    setFiles([item, ...newFiles]);
  };

  const moveToEnd = (index) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    const [item] = newFiles.splice(index, 1);
    setFiles([...newFiles, item]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMergePdf = async () => {
    if (files.length < 2) { setError('Please select at least 2 PDF files'); return; }
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append('files', f));
      const res = await fetch(`${API_BASE}/merge-pdf`, { method: 'POST', body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Merge failed');
      }
      triggerDownload(await res.blob(), 'merged.pdf');
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setFiles([]);
    setTargetSizeKb('');
    setError('');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Document Converter</h1>
        <p className="tagline">PDF ↔ Word • Reduce Size • Merge PDF</p>
      </header>

      <nav className="tabs-nav">
        {[
          { id: 'pdf-to-doc', label: 'PDF to Doc' },
          { id: 'doc-to-pdf', label: 'Doc to PDF' },
          { id: 'reduce-size', label: 'Reduce Size' },
          { id: 'merge-pdf', label: 'Merge PDF' },
        ].map(({ id, label }) => (
          <button
            key={id}
            className={`tab-btn ${activeTab === id ? 'active' : ''}`}
            onClick={() => { setActiveTab(id); reset(); }}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="main">
        {activeTab === 'pdf-to-doc' && (
          <section className="card">
            <h2>PDF to Word</h2>
            <p>Upload a PDF file and convert to editable Word (.docx) format.</p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              id="pdf-input"
            />
            <label htmlFor="pdf-input" className="upload-label">
              {file ? file.name : 'Choose PDF file'}
            </label>
            <button className="btn-primary" onClick={handlePdfToDoc} disabled={loading || !file}>
              {loading ? 'Converting...' : 'Convert to Word'}
            </button>
          </section>
        )}

        {activeTab === 'doc-to-pdf' && (
          <section className="card">
            <h2>Word to PDF</h2>
            <p>Upload a Word document (.docx, .doc) and convert to PDF.</p>
            <input
              type="file"
              accept=".docx,.doc"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              id="doc-input"
            />
            <label htmlFor="doc-input" className="upload-label">
              {file ? file.name : 'Choose Word file'}
            </label>
            <button className="btn-primary" onClick={handleDocToPdf} disabled={loading || !file}>
              {loading ? 'Converting...' : 'Convert to PDF'}
            </button>
          </section>
        )}

        {activeTab === 'reduce-size' && (
          <section className="card">
            <h2>Reduce file size</h2>
            <p>Upload a PDF or Word file and specify a target size (KB). The document will be compressed to fit.</p>
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              id="reduce-input"
            />
            <label htmlFor="reduce-input" className="upload-label">
              {file ? file.name : 'Choose file'}
            </label>
            <div className="target-row">
              <label htmlFor="target-size">Target size (KB)</label>
              <input
                id="target-size"
                type="number"
                min="1"
                step="100"
                placeholder="e.g. 500"
                value={targetSizeKb}
                onChange={(e) => setTargetSizeKb(e.target.value)}
                className="target-input"
              />
            </div>
            <button className="btn-primary" onClick={handleReduceSize} disabled={loading || !file || !targetSizeKb}>
              {loading ? 'Processing...' : 'Reduce & Download'}
            </button>
          </section>
        )}

        {activeTab === 'merge-pdf' && (
          <section className="card">
            <h2>Merge PDF</h2>
            <p>Upload 2 or more PDF files and set the order. First in the list = first in the merged PDF.</p>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              id="merge-input"
            />
            <label htmlFor="merge-input" className="upload-label">
              {files.length ? `${files.length} file(s) selected` : 'Choose PDF files'}
            </label>
            {files.length > 0 && (
              <div className="merge-list">
                <span className="merge-list-hint">Set order (first = start of merged PDF):</span>
                {files.map((f, i) => (
                  <div key={`${f.name}-${i}`} className="merge-item">
                    <span className="merge-order">{i + 1}</span>
                    <span className="merge-filename" title={f.name}>{f.name}</span>
                    <div className="merge-actions">
                      <button
                        type="button"
                        className="merge-btn"
                        onClick={() => moveToStart(i)}
                        disabled={i === 0}
                        title="Move to start"
                      >⏮</button>
                      <button
                        type="button"
                        className="merge-btn"
                        onClick={() => moveFile(i, -1)}
                        disabled={i === 0}
                        title="Move up"
                      >↑</button>
                      <button
                        type="button"
                        className="merge-btn"
                        onClick={() => moveFile(i, 1)}
                        disabled={i === files.length - 1}
                        title="Move down"
                      >↓</button>
                      <button
                        type="button"
                        className="merge-btn"
                        onClick={() => moveToEnd(i)}
                        disabled={i === files.length - 1}
                        title="Move to end"
                      >⏭</button>
                      <button
                        type="button"
                        className="merge-btn merge-btn-remove"
                        onClick={() => removeFile(i)}
                        title="Remove"
                      >✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="btn-primary" onClick={handleMergePdf} disabled={loading || files.length < 2}>
              {loading ? 'Merging...' : 'Merge PDFs'}
            </button>
          </section>
        )}

        {error && <p className="error-msg">{error}</p>}
      </main>

      <footer className="footer">
        <span>Files are processed temporarily and deleted immediately after download.</span>
        <span className="footer-api">API: {API_BASE}</span>
      </footer>
    </div>
  );
}

export default App;

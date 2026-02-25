import { useRef } from 'react';
import './MergeFileUpload.css';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MergeFileUpload({ files, onFilesChange, accept, fileTypeLabel }) {
  const inputRef = useRef(null);

  const appendFiles = (newFiles) => {
    if (!newFiles?.length) return;
    onFilesChange?.([...files, ...Array.from(newFiles)]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const items = e.dataTransfer?.files;
    if (items?.length) appendFiles(items);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const target = index + direction;
    if (target < 0 || target >= newFiles.length) return;
    [newFiles[index], newFiles[target]] = [newFiles[target], newFiles[index]];
    onFilesChange?.(newFiles);
  };

  const removeFile = (index) => {
    onFilesChange?.(files.filter((_, i) => i !== index));
  };

  return (
    <div className="merge-upload">
      <p className="merge-upload-hint">Add two or more files to merge.</p>

      <div
        className="merge-upload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => appendFiles(e.target.files)}
          className="merge-upload-input"
        />
        <span className="merge-upload-dropzone-icon">📄</span>
        <span className="merge-upload-dropzone-text">
          {files.length ? `${files.length} file(s) added` : `Click or drag ${fileTypeLabel} here`}
        </span>
        <span className="merge-upload-dropzone-hint">Select multiple files at once or add more below</span>
      </div>

      {files.length > 0 && (
        <div className="merge-upload-list">
          {files.map((f, i) => (
            <div key={`${i}-${f.name}-${f.size}-${f.lastModified}`} className="merge-upload-item">
              <span className="merge-upload-file-icon">📄</span>
              <div className="merge-upload-file-info">
                <span className="merge-upload-filename" title={f.name}>{f.name}</span>
                <span className="merge-upload-filesize">{formatSize(f.size)}</span>
              </div>
              <div className="merge-upload-actions">
                <button
                  type="button"
                  className="merge-upload-btn"
                  onClick={() => moveFile(i, -1)}
                  disabled={i === 0}
                  title="Move up"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="merge-upload-btn"
                  onClick={() => moveFile(i, 1)}
                  disabled={i === files.length - 1}
                  title="Move down"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="merge-upload-btn merge-upload-btn-remove"
                  onClick={() => removeFile(i)}
                  title="Remove"
                  aria-label="Remove"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        className="merge-upload-add-btn"
        onClick={() => inputRef.current?.click()}
      >
        + Add File
      </button>
    </div>
  );
}

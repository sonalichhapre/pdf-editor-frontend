import { useState, useRef, useEffect, useCallback } from "react";

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Cabinet+Grotesk:wght@400;500;700;800&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f5f3ee;
  --surface:#ffffff;
  --panel:#1c1c1e;
  --panel2:#2c2c2e;
  --border:#e0ddd6;
  --accent:#2563eb;
  --accent-light:#dbeafe;
  --text:#1a1a1a;
  --muted:#888;
  --success:#16a34a;
  --warn:#d97706;
  --danger:#dc2626;
  --shadow:0 2px 12px rgba(0,0,0,0.08);
  --shadow-lg:0 8px 32px rgba(0,0,0,0.14);
}

body{font-family:'Cabinet Grotesk',sans-serif;background:var(--bg);color:var(--text)}

/* APP SHELL */
.app{display:flex;flex-direction:column;height:100vh;overflow:hidden;background:var(--bg)}

/* TOPBAR */
.topbar{
  height:52px;background:var(--panel);
  display:flex;align-items:center;justify-content:space-between;
  padding:0 20px;gap:12px;flex-shrink:0;
  border-bottom:1px solid #333;
}
.topbar-logo{
  font-family:'DM Mono',monospace;font-size:13px;font-weight:500;
  color:#fff;letter-spacing:0.5px;display:flex;align-items:center;gap:8px;
}
.logo-pill{
  background:var(--accent);color:#fff;font-size:9px;font-weight:700;
  padding:2px 7px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;
}
.topbar-actions{display:flex;gap:8px;align-items:center}

/* BUTTONS */
.btn{
  display:inline-flex;align-items:center;gap:6px;
  padding:7px 14px;border-radius:6px;font-size:12px;font-weight:600;
  border:none;cursor:pointer;transition:all 0.15s;font-family:'Cabinet Grotesk',sans-serif;
  white-space:nowrap;
}
.btn-ghost{background:transparent;color:#ccc;border:1px solid #444}
.btn-ghost:hover{background:#333;color:#fff;border-color:#555}
.btn-primary{background:var(--accent);color:#fff}
.btn-primary:hover{background:#1d4ed8}
.btn-success{background:var(--success);color:#fff}
.btn-success:hover{background:#15803d}
.btn:disabled{opacity:0.4;cursor:not-allowed}
.btn-sm{padding:5px 10px;font-size:11px}

/* MAIN LAYOUT */
.main{display:flex;flex:1;overflow:hidden}

/* SIDEBAR */
.sidebar{
  width:280px;min-width:280px;background:var(--panel);
  border-right:1px solid #333;display:flex;flex-direction:column;
  overflow-y:auto;
}
.sidebar-section{padding:16px;border-bottom:1px solid #333}
.sidebar-label{
  font-size:9px;font-family:'DM Mono',monospace;color:#666;
  text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;
}

/* UPLOAD ZONE */
.upload-zone{
  border:2px dashed #444;border-radius:8px;padding:24px 16px;
  text-align:center;cursor:pointer;transition:all 0.2s;position:relative;
}
.upload-zone:hover,.upload-zone.drag{border-color:var(--accent);background:rgba(37,99,235,0.06)}
.upload-zone input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.upload-icon{font-size:32px;margin-bottom:8px}
.upload-text{font-size:12px;color:#888;font-family:'DM Mono',monospace}
.upload-text strong{color:var(--accent)}

/* PAGE THUMBS */
.page-thumbs{display:flex;flex-direction:column;gap:6px;padding:12px}
.page-thumb-item{
  display:flex;align-items:center;gap:10px;padding:8px 10px;
  border-radius:6px;cursor:pointer;transition:all 0.12s;
  border:1px solid transparent;
}
.page-thumb-item:hover{background:#2a2a2c;border-color:#444}
.page-thumb-item.active{background:#1e3a5f;border-color:var(--accent)}
.thumb-canvas-wrap{
  width:44px;height:60px;background:#fff;border-radius:3px;
  overflow:hidden;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.3);
}
.thumb-canvas-wrap canvas{width:100%;height:100%;object-fit:contain}
.thumb-info{flex:1;min-width:0}
.thumb-page-num{font-size:11px;color:#ccc;font-weight:700}
.thumb-edit-count{font-size:10px;color:var(--accent);font-family:'DM Mono',monospace}

/* TOOLBAR */
.toolbar{
  height:44px;background:var(--surface);border-bottom:1px solid var(--border);
  display:flex;align-items:center;padding:0 16px;gap:8px;flex-shrink:0;
}
.tool-sep{width:1px;height:24px;background:var(--border);margin:0 4px}
.tool-btn{
  padding:5px 10px;border-radius:5px;border:1px solid transparent;
  background:transparent;cursor:pointer;font-size:12px;font-weight:600;
  color:var(--muted);transition:all 0.12s;display:flex;align-items:center;gap:5px;
  font-family:'Cabinet Grotesk',sans-serif;
}
.tool-btn:hover{background:var(--border);color:var(--text)}
.tool-btn.active{background:var(--accent-light);color:var(--accent);border-color:var(--accent)}

/* EDITOR AREA */
.editor-area{
  flex:1;overflow:auto;display:flex;justify-content:center;
  padding:32px;background:var(--bg);
}

/* PAGE CANVAS WRAPPER */
.page-wrapper{
  position:relative;background:#fff;
  box-shadow:var(--shadow-lg);
  border-radius:4px;overflow:hidden;
}
.page-canvas{display:block}

/* TEXT OVERLAY LAYER */
.text-layer{
  position:absolute;inset:0;pointer-events:none;
}
.text-block{
  position:absolute;cursor:text;pointer-events:all;
  border:1px solid transparent;border-radius:2px;
  transition:border-color 0.1s,background 0.1s;
  min-width:20px;min-height:10px;
}
.text-block:hover{
  border-color:rgba(37,99,235,0.4);
  background:rgba(37,99,235,0.06);
}
.text-block.editing{
  border-color:var(--accent)!important;
  background:rgba(37,99,235,0.08)!important;
  box-shadow:0 0 0 2px rgba(37,99,235,0.2);
  z-index:10;
}
.text-block.modified{
  border-color:rgba(22,163,74,0.5);
  background:rgba(22,163,74,0.05);
}
.text-block-inner{
  width:100%;height:100%;
  outline:none;border:none;background:transparent;
  resize:none;overflow:hidden;
  font-family:inherit;color:inherit;
  padding:1px 2px;line-height:inherit;
  cursor:text;
}

/* TEXT EDIT TOOLBAR */
.text-toolbar{
  position:absolute;z-index:100;
  background:var(--panel);border:1px solid #444;
  border-radius:8px;padding:8px 10px;
  display:flex;align-items:center;gap:8px;
  box-shadow:var(--shadow-lg);
  pointer-events:all;
}
.text-toolbar input[type=text],.text-toolbar input[type=number]{
  background:#2a2a2c;border:1px solid #444;border-radius:4px;
  color:#fff;font-family:'DM Mono',monospace;font-size:12px;
  padding:4px 8px;outline:none;
}
.text-toolbar input[type=text]:focus,.text-toolbar input[type=number]:focus{border-color:var(--accent)}
.text-toolbar input[type=number]{width:54px}
.text-toolbar input[type=color]{
  width:28px;height:28px;border:none;background:none;cursor:pointer;padding:0;
  border-radius:4px;overflow:hidden;
}
.tt-label{font-size:10px;color:#666;font-family:'DM Mono',monospace}
.tt-sep{width:1px;height:20px;background:#444}

/* EMPTY STATE */
.empty-state{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  height:100%;gap:12px;color:var(--muted);
}
.empty-state-icon{font-size:56px;opacity:0.3}
.empty-state-title{font-size:20px;font-weight:800;color:var(--text)}
.empty-state-sub{font-size:13px;color:var(--muted);font-family:'DM Mono',monospace;text-align:center;line-height:1.6}

/* PROGRESS */
.progress-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;
}
.progress-box{
  background:var(--panel);border:1px solid #444;border-radius:12px;
  padding:32px 40px;text-align:center;
}
.progress-title{color:#fff;font-size:16px;font-weight:700;margin-bottom:8px}
.progress-sub{color:#888;font-size:12px;font-family:'DM Mono',monospace}
.progress-bar-wrap{width:240px;height:4px;background:#333;border-radius:2px;margin-top:16px;overflow:hidden}
.progress-bar{height:100%;background:var(--accent);border-radius:2px;transition:width 0.3s;animation:progressAnim 1.5s infinite}
@keyframes progressAnim{0%{width:10%}50%{width:80%}100%{width:10%}}

/* TOAST */
.toast{
  position:fixed;bottom:24px;right:24px;z-index:9998;
  background:var(--panel);border:1px solid #444;color:#fff;
  font-size:12px;font-family:'DM Mono',monospace;
  padding:12px 18px;border-radius:8px;
  animation:toastIn 0.2s ease;box-shadow:var(--shadow-lg);
  display:flex;align-items:center;gap:8px;
}
.toast.success{border-color:var(--success);color:#4ade80}
.toast.error{border-color:var(--danger);color:#f87171}
@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* STATUS BAR */
.statusbar{
  height:28px;background:var(--panel);border-top:1px solid #333;
  display:flex;align-items:center;padding:0 16px;gap:20px;flex-shrink:0;
}
.status-item{font-size:10px;font-family:'DM Mono',monospace;color:#666;display:flex;align-items:center;gap:5px}
.status-val{color:#aaa}
.status-accent{color:var(--accent)}
`;

/* ─── LOAD EXTERNAL LIBS ─────────────────────────────────────────────────── */
async function loadScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) {
    return new Promise(r => { const check = setInterval(() => { if (window.pdfjsLib || window.PDFLib) { clearInterval(check); r(); } }, 50); });
  }
  return new Promise((res, rej) => {
    const s = document.createElement("script"); s.src = src;
    s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}

async function getPdfJs() {
  if (!window.pdfjsLib) {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
  return window.pdfjsLib;
}

async function getPdfLib() {
  if (!window.PDFLib) {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");
  }
  return window.PDFLib;
}

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function uid() { return Math.random().toString(36).slice(2, 9); }

const SCALE = 1.5; // render scale for crisp display

/* Extract text items from a PDF.js page */
async function extractTextItems(pdfPage, scale) {
  const content = await pdfPage.getTextContent();
  const viewport = pdfPage.getViewport({ scale });
  return content.items
    .filter(item => item.str && item.str.trim())
    .map(item => {
      const tx = window.pdfjsLib.Util.transform(viewport.transform, item.transform);
      const x = tx[4];
      const y = tx[5];
      const fontSize = Math.abs(tx[0]) || Math.abs(tx[1]) || 12;
      const width = item.width * scale;
      const height = item.height > 0 ? item.height * scale : fontSize * 1.2;
      return {
        id: uid(),
        original: item.str,
        text: item.str,
        x: x,
        y: y - height,
        w: Math.max(width, 20),
        h: Math.max(height, fontSize * 1.1),
        fontSize: Math.round(fontSize),
        fontName: item.fontName || "",
        color: "#000000",
        modified: false,
      };
    });
}

/* Render a page to a canvas and return dataURL for thumbnail */
async function renderPage(pdfDoc, pageNum, scale, canvas) {
  const page = await pdfDoc.getPage(pageNum);
  const vp = page.getViewport({ scale });
  canvas.width = vp.width;
  canvas.height = vp.height;
  await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
  return { page, vp };
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function PDFLiveEditor() {
  const [pdfDoc, setPdfDoc] = useState(null);         // pdf.js doc
  const [rawBytes, setRawBytes] = useState(null);     // original ArrayBuffer
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState({ w: 0, h: 0 });
  const [textBlocks, setTextBlocks] = useState({});   // { pageNum: [block, ...] }
  const [editingId, setEditingId] = useState(null);
  const [toolbarPos, setToolbarPos] = useState(null);
  const [thumbs, setThumbs] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [fileName, setFileName] = useState("");
  const [zoom, setZoom] = useState(100);
  const [editCount, setEditCount] = useState({});

  const canvasRef = useRef();
  const fileInputRef = useRef();
  const editorAreaRef = useRef();
  const textRefs = useRef({});

  const showToast = useCallback((msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  /* ── LOAD PDF ── */
  const loadPDF = useCallback(async (file) => {
    setLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const buffer = await file.arrayBuffer();
      setRawBytes(buffer.slice(0));
      const doc = await pdfjsLib.getDocument({ data: buffer }).promise;
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      setCurrentPage(1);
      setTextBlocks({});
      setThumbs({});
      setEditCount({});
      setFileName(file.name);

      // Generate thumbnails for all pages
      const thumbMap = {};
      for (let p = 1; p <= doc.numPages; p++) {
        const c = document.createElement("canvas");
        await renderPage(doc, p, 0.25, c);
        thumbMap[p] = c.toDataURL();
      }
      setThumbs(thumbMap);
      showToast(`✓ Loaded "${file.name}"`, "success");
    } catch (e) {
      showToast("Failed to load PDF: " + e.message, "error");
    }
    setLoading(false);
  }, [showToast]);

  /* ── RENDER CURRENT PAGE ── */
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    (async () => {
      const { vp } = await renderPage(pdfDoc, currentPage, SCALE, canvasRef.current);
      setPageSize({ w: vp.width, h: vp.height });

      // Load text blocks for this page if not yet loaded
      setTextBlocks(prev => {
        if (prev[currentPage]) return prev;
        // async load, update after
        (async () => {
          const page = await pdfDoc.getPage(currentPage);
          const blocks = await extractTextItems(page, SCALE);
          setTextBlocks(p2 => ({ ...p2, [currentPage]: blocks }));
        })();
        return prev;
      });
    })();
  }, [pdfDoc, currentPage]);

  /* ── CLICK OUTSIDE TO DESELECT ── */
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".text-block") && !e.target.closest(".text-toolbar")) {
        setEditingId(null);
        setToolbarPos(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── UPDATE TEXT BLOCK ── */
  const updateBlock = useCallback((id, changes) => {
    setTextBlocks(prev => {
      const blocks = (prev[currentPage] || []).map(b =>
        b.id === id ? { ...b, ...changes, modified: true } : b
      );
      return { ...prev, [currentPage]: blocks };
    });
    setEditCount(prev => ({ ...prev, [currentPage]: (prev[currentPage] || 0) + 1 }));
  }, [currentPage]);

  /* ── SELECT BLOCK ── */
  const selectBlock = useCallback((block, e) => {
    e.stopPropagation();
    setEditingId(block.id);
    const rect = e.currentTarget.getBoundingClientRect();
    const areaRect = editorAreaRef.current.getBoundingClientRect();
    setToolbarPos({
      x: rect.left - areaRect.left,
      y: rect.top - areaRect.top - 52,
    });
    setTimeout(() => {
      const el = textRefs.current[block.id];
      if (el) { el.focus(); el.select && el.select(); }
    }, 30);
  }, []);

  /* ── EXPORT PDF ── */
  const exportPDF = useCallback(async () => {
    if (!rawBytes) return;
    setLoading(true);
    showToast("⏳ Generating PDF...");
    try {
      const PDFLib = await getPdfLib();
      const { PDFDocument, rgb, StandardFonts } = PDFLib;

      const pdfLibDoc = await PDFDocument.load(rawBytes, { ignoreEncryption: true });
      const helvetica = await pdfLibDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfLibDoc.getPages();

      // For each page with modifications, white-out originals and draw new text
      for (const [pageNumStr, blocks] of Object.entries(textBlocks)) {
        const pageNum = parseInt(pageNumStr);
        const modified = blocks.filter(b => b.modified);
        if (!modified.length) continue;

        const pdfPage = pages[pageNum - 1];
        const { width: pW, height: pH } = pdfPage.getSize();
        const scaleX = pW / pageSize.w;
        const scaleY = pH / pageSize.h;

        for (const block of modified) {
          const px = block.x * scaleX;
          const py = pH - (block.y + block.h) * scaleY;
          const fw = block.w * scaleX;
          const fh = block.h * scaleY;

          // White out original
          pdfPage.drawRectangle({ x: px - 2, y: py - 2, width: fw + 4, height: fh + 4, color: rgb(1, 1, 1) });

          // Parse color
          let r = 0, g = 0, b2 = 0;
          const hex = block.color.replace("#", "");
          if (hex.length === 6) {
            r = parseInt(hex.slice(0, 2), 16) / 255;
            g = parseInt(hex.slice(2, 4), 16) / 255;
            b2 = parseInt(hex.slice(4, 6), 16) / 255;
          }

          const fs = Math.max(block.fontSize * scaleY, 6);
          pdfPage.drawText(block.text, {
            x: px, y: py + 2,
            size: fs,
            font: helvetica,
            color: rgb(r, g, b2),
            maxWidth: fw + 8,
          });
        }
      }

      const bytes = await pdfLibDoc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url;
      a.download = fileName.replace(".pdf", "_edited.pdf") || "edited.pdf";
      a.click(); URL.revokeObjectURL(url);
      showToast("✓ PDF exported successfully!", "success");
    } catch (e) {
      showToast("Export error: " + e.message, "error");
    }
    setLoading(false);
  }, [rawBytes, textBlocks, pageSize, fileName, showToast]);

  const currentBlocks = textBlocks[currentPage] || [];
  const editingBlock = currentBlocks.find(b => b.id === editingId);
  const totalEdits = Object.values(editCount).reduce((a, b) => a + b, 0);
  const zoomScale = zoom / 100;

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-logo">
            <span className="logo-pill">LIVE</span>
            PDF Editor
            {fileName && <span style={{ color: "#666", fontSize: 11 }}>— {fileName}</span>}
          </div>
          <div className="topbar-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => fileInputRef.current?.click()}>
              📂 Open PDF
            </button>
            <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }}
              onChange={e => e.target.files[0] && loadPDF(e.target.files[0])} />
            {totalEdits > 0 && (
              <span style={{ fontSize: 11, fontFamily: "DM Mono", color: "#60a5fa" }}>
                {totalEdits} edit{totalEdits !== 1 ? "s" : ""}
              </span>
            )}
            <button className="btn btn-success btn-sm" onClick={exportPDF}
              disabled={!pdfDoc || loading}>
              ↓ Export PDF
            </button>
          </div>
        </div>

        <div className="main">

          {/* SIDEBAR */}
          <div className="sidebar">
            {!pdfDoc ? (
              <div className="sidebar-section">
                <div className="sidebar-label">Open a PDF</div>
                <div className="upload-zone"
                  onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("drag"); }}
                  onDragLeave={e => e.currentTarget.classList.remove("drag")}
                  onDrop={e => {
                    e.preventDefault(); e.currentTarget.classList.remove("drag");
                    const f = e.dataTransfer.files[0];
                    if (f?.name.endsWith(".pdf")) loadPDF(f);
                  }}>
                  <input type="file" accept=".pdf"
                    onChange={e => e.target.files[0] && loadPDF(e.target.files[0])} />
                  <div className="upload-icon">📄</div>
                  <div className="upload-text"><strong>Click or drag</strong> a PDF file</div>
                </div>
              </div>
            ) : (
              <>
                <div className="sidebar-section">
                  <div className="sidebar-label">Pages — {numPages} total</div>
                </div>
                <div className="page-thumbs">
                  {Array.from({ length: numPages }, (_, i) => i + 1).map(p => (
                    <div key={p}
                      className={`page-thumb-item${currentPage === p ? " active" : ""}`}
                      onClick={() => { setCurrentPage(p); setEditingId(null); setToolbarPos(null); }}>
                      <div className="thumb-canvas-wrap">
                        {thumbs[p]
                          ? <img src={thumbs[p]} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                          : <div style={{ width: "100%", height: "100%", background: "#eee" }} />}
                      </div>
                      <div className="thumb-info">
                        <div className="thumb-page-num">Page {p}</div>
                        {editCount[p] > 0 && (
                          <div className="thumb-edit-count">✏ {editCount[p]} edit{editCount[p] !== 1 ? "s" : ""}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* EDITOR COLUMN */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* TOOLBAR */}
            {pdfDoc && (
              <div className="toolbar">
                <button className="tool-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  ← Prev
                </button>
                <span style={{ fontSize: 12, fontFamily: "DM Mono", color: "var(--muted)", minWidth: 80, textAlign: "center" }}>
                  {currentPage} / {numPages}
                </span>
                <button className="tool-btn" onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage === numPages}>
                  Next →
                </button>
                <div className="tool-sep" />
                <span style={{ fontSize: 11, fontFamily: "DM Mono", color: "var(--muted)" }}>Zoom</span>
                <button className="tool-btn btn-sm" onClick={() => setZoom(z => Math.max(50, z - 25))}>−</button>
                <span style={{ fontSize: 12, fontFamily: "DM Mono", width: 44, textAlign: "center" }}>{zoom}%</span>
                <button className="tool-btn btn-sm" onClick={() => setZoom(z => Math.min(200, z + 25))}>+</button>
                <button className="tool-btn btn-sm" onClick={() => setZoom(100)}>Reset</button>
                <div className="tool-sep" />
                <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "DM Mono" }}>
                  💡 Click any text to edit it
                </span>
              </div>
            )}

            {/* EDITOR AREA */}
            <div className="editor-area" ref={editorAreaRef}
              style={{ position: "relative" }}
              onClick={() => { setEditingId(null); setToolbarPos(null); }}>

              {!pdfDoc ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📝</div>
                  <div className="empty-state-title">PDF Live Editor</div>
                  <div className="empty-state-sub">
                    Open a PDF file to start editing.<br />
                    Click on any text in the document<br />
                    to edit it directly.
                  </div>
                  <button className="btn btn-primary" style={{ marginTop: 8 }}
                    onClick={() => fileInputRef.current?.click()}>
                    📂 Open PDF
                  </button>
                </div>
              ) : (
                <div style={{ transform: `scale(${zoomScale})`, transformOrigin: "top center", transition: "transform 0.15s" }}>
                  <div className="page-wrapper" style={{ width: pageSize.w, height: pageSize.h }}>
                    {/* PDF Canvas */}
                    <canvas ref={canvasRef} className="page-canvas" />

                    {/* Text overlay */}
                    <div className="text-layer">
                      {currentBlocks.map(block => (
                        <div
                          key={block.id}
                          className={`text-block${editingId === block.id ? " editing" : ""}${block.modified ? " modified" : ""}`}
                          style={{
                            left: block.x, top: block.y,
                            width: block.w + 8, height: block.h + 4,
                          }}
                          onMouseDown={e => selectBlock(block, e)}
                          title={editingId === block.id ? "" : "Click to edit"}
                        >
                          <textarea
                            ref={el => textRefs.current[block.id] = el}
                            className="text-block-inner"
                            value={block.text}
                            style={{
                              fontSize: block.fontSize,
                              color: block.color,
                              fontFamily: "sans-serif",
                            }}
                            onChange={e => updateBlock(block.id, { text: e.target.value })}
                            onFocus={e => e.stopPropagation()}
                            onClick={e => e.stopPropagation()}
                            readOnly={editingId !== block.id}
                            rows={1}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Floating text toolbar */}
                    {editingBlock && toolbarPos && (
                      <div className="text-toolbar"
                        style={{
                          left: Math.max(0, toolbarPos.x),
                          top: Math.max(0, toolbarPos.y),
                          position: "absolute",
                        }}
                        onMouseDown={e => e.stopPropagation()}>
                        <span className="tt-label">Size</span>
                        <input type="number" value={editingBlock.fontSize} min={6} max={120}
                          style={{ width: 54 }}
                          onChange={e => updateBlock(editingBlock.id, { fontSize: parseInt(e.target.value) || 12 })} />
                        <div className="tt-sep" />
                        <span className="tt-label">Color</span>
                        <input type="color" value={editingBlock.color}
                          onChange={e => updateBlock(editingBlock.id, { color: e.target.value })} />
                        <div className="tt-sep" />
                        <button className="btn btn-ghost btn-sm"
                          onClick={() => updateBlock(editingBlock.id, { text: editingBlock.original, modified: false })}>
                          ↩ Reset
                        </button>
                        <button className="btn btn-ghost btn-sm"
                          onClick={() => { setEditingId(null); setToolbarPos(null); }}>
                          ✓ Done
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="statusbar">
          <div className="status-item">PAGE <span className="status-val">{pdfDoc ? currentPage : "—"}</span></div>
          <div className="status-item">TOTAL <span className="status-val">{pdfDoc ? numPages : "—"}</span></div>
          <div className="status-item">EDITS <span className="status-accent">{totalEdits || "0"}</span></div>
          <div className="status-item">ZOOM <span className="status-val">{zoom}%</span></div>
          {editingBlock && <div className="status-item">EDITING <span className="status-accent">"{editingBlock.original.slice(0, 24)}{editingBlock.original.length > 24 ? "…" : ""}"</span></div>}
        </div>

        {/* LOADING OVERLAY */}
        {loading && (
          <div className="progress-overlay">
            <div className="progress-box">
              <div className="progress-title">Processing PDF…</div>
              <div className="progress-sub">Please wait a moment</div>
              <div className="progress-bar-wrap"><div className="progress-bar" /></div>
            </div>
          </div>
        )}

        {/* TOAST */}
        {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      </div>
    </>
  );
}

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

/* APP SHELL */
.pdfeditor-app{display:flex;flex-direction:column;height:100%;min-height:0;overflow:hidden;background:var(--bg);font-family:'Cabinet Grotesk',sans-serif;}

/* TOPBAR */
.pdfeditor-topbar{
  height:52px;background:var(--panel);
  display:flex;align-items:center;justify-content:space-between;
  padding:0 20px;gap:12px;flex-shrink:0;
  border-bottom:1px solid #333;
}
.pdfeditor-topbar-logo{
  font-family:'DM Mono',monospace;font-size:13px;font-weight:500;
  color:#fff;letter-spacing:0.5px;display:flex;align-items:center;gap:8px;
}
.pdfeditor-logo-pill{
  background:var(--accent);color:#fff;font-size:9px;font-weight:700;
  padding:2px 7px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;
}
.pdfeditor-topbar-actions{display:flex;gap:8px;align-items:center}

/* BUTTONS */
.pdfeditor-btn{
  display:inline-flex;align-items:center;gap:6px;
  padding:7px 14px;border-radius:6px;font-size:12px;font-weight:600;
  border:none;cursor:pointer;transition:all 0.15s;font-family:'Cabinet Grotesk',sans-serif;
  white-space:nowrap;
}
.pdfeditor-btn-ghost{background:transparent;color:#ccc;border:1px solid #444}
.pdfeditor-btn-ghost:hover{background:#333;color:#fff;border-color:#555}
.pdfeditor-btn-primary{background:var(--accent);color:#fff;border:none}
.pdfeditor-btn-primary:hover{background:#1d4ed8}
.pdfeditor-btn-success{background:var(--success);color:#fff;border:none}
.pdfeditor-btn-success:hover{background:#15803d}
.pdfeditor-btn:disabled{opacity:0.4;cursor:not-allowed}
.pdfeditor-btn-sm{padding:5px 10px;font-size:11px}

/* MAIN LAYOUT */
.pdfeditor-main{display:flex;flex:1;overflow:hidden}

/* SIDEBAR */
.pdfeditor-sidebar{
  width:200px;min-width:200px;background:var(--panel);
  border-right:1px solid #333;display:flex;flex-direction:column;
  overflow-y:auto;
}
.pdfeditor-sidebar-section{padding:12px;border-bottom:1px solid #333}
.pdfeditor-sidebar-label{
  font-size:9px;font-family:'DM Mono',monospace;color:#666;
  text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;
}

/* UPLOAD ZONE */
.pdfeditor-upload-zone{
  border:2px dashed #444;border-radius:8px;padding:20px 12px;
  text-align:center;cursor:pointer;transition:all 0.2s;position:relative;
}
.pdfeditor-upload-zone:hover,.pdfeditor-upload-zone.drag{border-color:var(--accent);background:rgba(37,99,235,0.06)}
.pdfeditor-upload-zone input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.pdfeditor-upload-icon{font-size:28px;margin-bottom:6px}
.pdfeditor-upload-text{font-size:11px;color:#888;font-family:'DM Mono',monospace;line-height:1.5}
.pdfeditor-upload-text strong{color:var(--accent)}

/* PAGE THUMBS */
.pdfeditor-page-thumbs{display:flex;flex-direction:column;gap:4px;padding:8px}
.pdfeditor-page-thumb-item{
  display:flex;align-items:center;gap:8px;padding:6px 8px;
  border-radius:6px;cursor:pointer;transition:all 0.12s;
  border:1px solid transparent;
}
.pdfeditor-page-thumb-item:hover{background:#2a2a2c;border-color:#444}
.pdfeditor-page-thumb-item.active{background:#1e3a5f;border-color:var(--accent)}
.pdfeditor-thumb-wrap{
  width:36px;height:50px;background:#fff;border-radius:3px;
  overflow:hidden;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.3);
}
.pdfeditor-thumb-wrap img{width:100%;height:100%;object-fit:contain}
.pdfeditor-thumb-info{flex:1;min-width:0}
.pdfeditor-thumb-page-num{font-size:11px;color:#ccc;font-weight:700}
.pdfeditor-thumb-edit-count{font-size:10px;color:var(--accent);font-family:'DM Mono',monospace}

/* TOOLBAR */
.pdfeditor-toolbar{
  height:44px;background:var(--surface);border-bottom:1px solid var(--border);
  display:flex;align-items:center;padding:0 16px;gap:8px;flex-shrink:0;overflow-x:auto;
}
.pdfeditor-tool-sep{width:1px;height:24px;background:var(--border);margin:0 4px;flex-shrink:0}
.pdfeditor-tool-btn{
  padding:5px 10px;border-radius:5px;border:1px solid transparent;
  background:transparent;cursor:pointer;font-size:12px;font-weight:600;
  color:var(--muted);transition:all 0.12s;display:flex;align-items:center;gap:5px;
  font-family:'Cabinet Grotesk',sans-serif;white-space:nowrap;flex-shrink:0;
}
.pdfeditor-tool-btn:hover{background:var(--border);color:var(--text)}
.pdfeditor-tool-btn:disabled{opacity:0.4;cursor:not-allowed}

/* EDITOR AREA */
.pdfeditor-editor-area{
  flex:1;overflow:auto;display:flex;justify-content:center;
  align-items:flex-start;padding:32px;background:var(--bg);
}

/* PAGE CANVAS WRAPPER */
.pdfeditor-page-wrapper{
  position:relative;background:#fff;
  box-shadow:var(--shadow-lg);
  border-radius:4px;
  flex-shrink:0;
}
.pdfeditor-page-canvas{display:block}

/* TEXT OVERLAY LAYER */
.pdfeditor-text-layer{
  position:absolute;inset:0;pointer-events:none;overflow:hidden;
}

/* FIX: white background covers canvas text so no double text */
.pdfeditor-text-block{
  position:absolute;cursor:text;pointer-events:all;
  border:1px solid transparent;border-radius:2px;
  transition:border-color 0.1s;
  min-width:4px;min-height:4px;
  background:#ffffff;
}
.pdfeditor-text-block:hover{
  border-color:rgba(37,99,235,0.5);
  background:#f0f7ff;
}
.pdfeditor-text-block.active-block{
  border-color:var(--accent)!important;
  background:#fff!important;
  box-shadow:0 0 0 2px rgba(37,99,235,0.2);
  z-index:10;
}
.pdfeditor-text-block.modified{
  border-color:rgba(22,163,74,0.4);
  background:#f0fdf4;
}
.pdfeditor-text-block.active-block.modified{
  border-color:var(--accent)!important;
  background:#fff!important;
}

/* Textarea — fills block, transparent bg, inherits text style */
.pdfeditor-block-textarea{
  position:absolute;inset:0;
  width:100%;height:100%;
  outline:none;border:none;background:transparent;
  resize:none;overflow:hidden;
  padding:0;margin:0;
  line-height:1.2;
  cursor:text;
  font-family:sans-serif;
}

/* TEXT EDIT TOOLBAR */
.pdfeditor-text-toolbar{
  position:absolute;z-index:200;
  background:var(--panel);border:1px solid #444;
  border-radius:8px;padding:8px 10px;
  display:flex;align-items:center;gap:8px;
  box-shadow:var(--shadow-lg);
  pointer-events:all;
  white-space:nowrap;
}
.pdfeditor-text-toolbar input[type=number]{
  background:#2a2a2c;border:1px solid #444;border-radius:4px;
  color:#fff;font-family:'DM Mono',monospace;font-size:12px;
  padding:4px 8px;outline:none;width:54px;
}
.pdfeditor-text-toolbar input[type=number]:focus{border-color:var(--accent)}
.pdfeditor-text-toolbar input[type=color]{
  width:28px;height:28px;border:none;background:none;cursor:pointer;padding:0;
  border-radius:4px;overflow:hidden;vertical-align:middle;
}
.pdfeditor-tt-label{font-size:10px;color:#999;font-family:'DM Mono',monospace}
.pdfeditor-tt-sep{width:1px;height:20px;background:#444;flex-shrink:0}

/* EMPTY STATE */
.pdfeditor-empty-state{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  height:100%;gap:12px;color:var(--muted);width:100%;
}
.pdfeditor-empty-icon{font-size:56px;opacity:0.3}
.pdfeditor-empty-title{font-size:20px;font-weight:800;color:var(--text)}
.pdfeditor-empty-sub{font-size:13px;color:var(--muted);font-family:'DM Mono',monospace;text-align:center;line-height:1.6}

/* PROGRESS */
.pdfeditor-progress-overlay{
  position:absolute;inset:0;background:rgba(0,0,0,0.6);z-index:9999;
  display:flex;align-items:center;justify-content:center;
}
.pdfeditor-progress-box{
  background:var(--panel);border:1px solid #444;border-radius:12px;
  padding:32px 40px;text-align:center;
}
.pdfeditor-progress-title{color:#fff;font-size:16px;font-weight:700;margin-bottom:8px}
.pdfeditor-progress-sub{color:#888;font-size:12px;font-family:'DM Mono',monospace}
.pdfeditor-progress-bar-wrap{width:240px;height:4px;background:#333;border-radius:2px;margin-top:16px;overflow:hidden}
.pdfeditor-progress-bar{height:100%;background:var(--accent);border-radius:2px;animation:pdfProgressAnim 1.5s infinite}
@keyframes pdfProgressAnim{0%{width:10%}50%{width:80%}100%{width:10%}}

/* TOAST */
.pdfeditor-toast{
  position:absolute;bottom:24px;right:24px;z-index:9998;
  background:var(--panel);border:1px solid #444;color:#fff;
  font-size:12px;font-family:'DM Mono',monospace;
  padding:12px 18px;border-radius:8px;
  animation:pdfToastIn 0.2s ease;box-shadow:var(--shadow-lg);
  display:flex;align-items:center;gap:8px;
}
.pdfeditor-toast.success{border-color:var(--success);color:#4ade80}
.pdfeditor-toast.error{border-color:var(--danger);color:#f87171}
@keyframes pdfToastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* STATUS BAR */
.pdfeditor-statusbar{
  height:28px;background:var(--panel);border-top:1px solid #333;
  display:flex;align-items:center;padding:0 16px;gap:20px;flex-shrink:0;
}
.pdfeditor-status-item{font-size:10px;font-family:'DM Mono',monospace;color:#666;display:flex;align-items:center;gap:5px}
.pdfeditor-status-val{color:#aaa}
.pdfeditor-status-accent{color:var(--accent)}
`;

/* ─── LOAD EXTERNAL LIBS ─────────────────────────────────────────────────── */
async function loadScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) {
    return new Promise(r => {
      const check = setInterval(() => {
        if (window.pdfjsLib || window.PDFLib) { clearInterval(check); r(); }
      }, 50);
    });
  }
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = rej;
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

const SCALE = 1.5;

/* Extract text blocks from a pdf.js page */
async function extractTextItems(pdfPage, scale) {
  const content = await pdfPage.getTextContent();
  const viewport = pdfPage.getViewport({ scale });
  const items = [];
  for (const item of content.items) {
    if (!item.str || !item.str.trim()) continue;
    const tx = window.pdfjsLib.Util.transform(viewport.transform, item.transform);
    const x = tx[4];
    const y = tx[5];
    const fontSize = Math.abs(tx[0]) || Math.abs(tx[1]) || 12;
    const width = item.width * scale;
    const height = item.height > 0 ? item.height * scale : fontSize * 1.2;
    items.push({
      id: uid(),
      original: item.str,
      text: item.str,
      x: Math.round(x),
      y: Math.round(y - height),
      w: Math.max(Math.round(width), 10),
      h: Math.max(Math.round(height), Math.round(fontSize * 1.1)),
      fontSize: Math.round(fontSize),
      color: "#000000",
      modified: false,
    });
  }
  return items;
}

/* Render thumbnail (with text, just for sidebar preview) */
async function renderThumb(pdfDoc, pageNum) {
  const page = await pdfDoc.getPage(pageNum);
  const vp = page.getViewport({ scale: 0.2 });
  const c = document.createElement("canvas");
  c.width = vp.width; c.height = vp.height;
  await page.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise;
  return c.toDataURL();
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function PDFLiveEditor() {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [rawBytes, setRawBytes] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizes, setPageSizes] = useState({});
  const [textBlocks, setTextBlocks] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [toolbarPos, setToolbarPos] = useState(null);
  const [thumbs, setThumbs] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [fileName, setFileName] = useState("");
  const [zoom, setZoom] = useState(100);
  const [modifiedBlocks, setModifiedBlocks] = useState({});

  const canvasRef = useRef();
  const fileInputRef = useRef();
  const wrapperRef = useRef();
  const textRefs = useRef({});

  const showToast = useCallback((msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
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
      setModifiedBlocks({});
      setPageSizes({});
      setFileName(file.name);

      // Generate thumbnails in background (with text, just for the sidebar)
      (async () => {
        for (let p = 1; p <= doc.numPages; p++) {
          const dataUrl = await renderThumb(doc, p);
          setThumbs(prev => ({ ...prev, [p]: dataUrl }));
        }
      })();

      showToast(`✓ Loaded "${file.name}"`, "success");
    } catch (e) {
      showToast("Failed to load PDF: " + e.message, "error");
    }
    setLoading(false);
  }, [showToast]);

  /* ── RENDER CURRENT PAGE ── */
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        const vp = page.getViewport({ scale: SCALE });
        if (cancelled) return;

        const canvas = canvasRef.current;
        canvas.width = vp.width;
        canvas.height = vp.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, vp.width, vp.height);

        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        if (cancelled) return;

        setPageSizes(prev => ({ ...prev, [currentPage]: { w: vp.width, h: vp.height } }));

        // Extract text blocks if not yet done for this page
        setTextBlocks(prev => {
          if (prev[currentPage]) return prev;
          (async () => {
            const blocks = await extractTextItems(page, SCALE);
            if (!cancelled) {
              setTextBlocks(p2 => ({ ...p2, [currentPage]: blocks }));
            }
          })();
          return prev;
        });
      } catch (e) {
        console.error("Render error:", e);
      }
    })();
    return () => { cancelled = true; };
  }, [pdfDoc, currentPage]); // eslint-disable-line

  /* ── WHITE OUT canvas text once text blocks load ── */
  /* This is the core double-text fix: paint white over every text region  */
  /* so the canvas version disappears and only the overlay textareas show. */
  useEffect(() => {
    const blocks = textBlocks[currentPage];
    if (!canvasRef.current || !blocks || blocks.length === 0) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#ffffff";
    for (const b of blocks) {
      // Slightly larger rect to fully cover the rendered text
      ctx.fillRect(b.x - 3, b.y - 3, b.w + 12, b.h + 8);
    }
  }, [textBlocks, currentPage]);

  /* ── CLICK OUTSIDE TO DESELECT ── */
  useEffect(() => {
    const handler = (e) => {
      if (
        !e.target.closest(".pdfeditor-text-block") &&
        !e.target.closest(".pdfeditor-text-toolbar")
      ) {
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
        b.id === id
          ? { ...b, ...changes, modified: "modified" in changes ? changes.modified : true }
          : b
      );
      return { ...prev, [currentPage]: blocks };
    });
    if (!("modified" in changes) || changes.modified !== false) {
      setModifiedBlocks(prev => ({
        ...prev,
        [currentPage]: { ...(prev[currentPage] || {}), [id]: true },
      }));
    }
  }, [currentPage]);

  /* ── SELECT BLOCK — single click enters edit mode immediately ── */
  const selectBlock = useCallback((block, e) => {
    e.stopPropagation();
    setEditingId(block.id);

    const rect = e.currentTarget.getBoundingClientRect();
    const wrapRect = wrapperRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    setToolbarPos({
      x: rect.left - wrapRect.left,
      y: Math.max(0, rect.top - wrapRect.top - 56),
    });

    // Focus immediately — no readOnly, single click to type
    const el = textRefs.current[block.id];
    if (el) {
      el.focus();
      const len = el.value.length;
      try { el.setSelectionRange(len, len); } catch (_) {}
    }
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

      for (const [pageNumStr, blocks] of Object.entries(textBlocks)) {
        const pageNum = parseInt(pageNumStr);
        const modified = blocks.filter(b => b.modified);
        if (!modified.length) continue;

        const pdfPage = pages[pageNum - 1];
        const { width: pW, height: pH } = pdfPage.getSize();
        const ps = pageSizes[pageNum];
        if (!ps || !ps.w || !ps.h) continue;

        const scaleX = pW / ps.w;
        const scaleY = pH / ps.h;

        for (const block of modified) {
          const px = block.x * scaleX;
          const py = pH - (block.y + block.h) * scaleY;
          const fw = block.w * scaleX;
          const fh = block.h * scaleY;

          // White out original text in PDF
          pdfPage.drawRectangle({
            x: px - 3, y: py - 3,
            width: fw + 12, height: fh + 8,
            color: rgb(1, 1, 1),
          });

          // Parse hex color
          let r = 0, g = 0, b2 = 0;
          const hex = (block.color || "#000000").replace("#", "");
          if (hex.length === 6) {
            r = parseInt(hex.slice(0, 2), 16) / 255;
            g = parseInt(hex.slice(2, 4), 16) / 255;
            b2 = parseInt(hex.slice(4, 6), 16) / 255;
          }

          if (block.text.trim()) {
            pdfPage.drawText(block.text, {
              x: px,
              y: py + 2,
              size: Math.max(block.fontSize * scaleY, 6),
              font: helvetica,
              color: rgb(r, g, b2),
              maxWidth: fw + 8,
            });
          }
        }
      }

      const bytes = await pdfLibDoc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (fileName || "document").replace(/\.pdf$/i, "") + "_edited.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast("✓ PDF exported successfully!", "success");
    } catch (e) {
      showToast("Export error: " + e.message, "error");
    }
    setLoading(false);
  }, [rawBytes, textBlocks, pageSizes, fileName, showToast]);

  /* ── DERIVED ── */
  const currentPageSize = pageSizes[currentPage] || { w: 0, h: 0 };
  const currentBlocks = textBlocks[currentPage] || [];
  const editingBlock = currentBlocks.find(b => b.id === editingId) || null;
  const totalEdits = Object.values(modifiedBlocks).reduce(
    (sum, m) => sum + Object.keys(m).length, 0
  );
  const editCount = Object.fromEntries(
    Object.entries(modifiedBlocks).map(([p, m]) => [p, Object.keys(m).length])
  );
  const zoomScale = zoom / 100;

  return (
    <>
      <style>{CSS}</style>
      <div className="pdfeditor-app" style={{ position: "relative" }}>

        {/* TOP BAR */}
        <div className="pdfeditor-topbar">
          <div className="pdfeditor-topbar-logo">
            <span className="pdfeditor-logo-pill">LIVE</span>
            PDF Editor
            {fileName && (
              <span style={{ color: "#555", fontSize: 11, maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                — {fileName}
              </span>
            )}
          </div>
          <div className="pdfeditor-topbar-actions">
            <button className="pdfeditor-btn pdfeditor-btn-ghost pdfeditor-btn-sm"
              onClick={() => fileInputRef.current?.click()}>
              📂 Open PDF
            </button>
            <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }}
              onChange={e => e.target.files[0] && loadPDF(e.target.files[0])} />
            {totalEdits > 0 && (
              <span style={{ fontSize: 11, fontFamily: "DM Mono", color: "#60a5fa" }}>
                {totalEdits} edit{totalEdits !== 1 ? "s" : ""}
              </span>
            )}
            <button
              className="pdfeditor-btn pdfeditor-btn-success pdfeditor-btn-sm"
              onClick={exportPDF}
              disabled={!pdfDoc || loading}
            >
              ↓ Export PDF
            </button>
          </div>
        </div>

        <div className="pdfeditor-main">

          {/* SIDEBAR */}
          <div className="pdfeditor-sidebar">
            {!pdfDoc ? (
              <div className="pdfeditor-sidebar-section">
                <div className="pdfeditor-sidebar-label">Open a PDF</div>
                <div className="pdfeditor-upload-zone"
                  onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("drag"); }}
                  onDragLeave={e => e.currentTarget.classList.remove("drag")}
                  onDrop={e => {
                    e.preventDefault(); e.currentTarget.classList.remove("drag");
                    const f = e.dataTransfer.files[0];
                    if (f?.name.toLowerCase().endsWith(".pdf")) loadPDF(f);
                  }}>
                  <input type="file" accept=".pdf"
                    onChange={e => e.target.files[0] && loadPDF(e.target.files[0])} />
                  <div className="pdfeditor-upload-icon">📄</div>
                  <div className="pdfeditor-upload-text">
                    <strong>Click or drag</strong><br />a PDF file
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="pdfeditor-sidebar-section">
                  <div className="pdfeditor-sidebar-label">Pages — {numPages} total</div>
                </div>
                <div className="pdfeditor-page-thumbs">
                  {Array.from({ length: numPages }, (_, i) => i + 1).map(p => (
                    <div key={p}
                      className={`pdfeditor-page-thumb-item${currentPage === p ? " active" : ""}`}
                      onClick={() => { setCurrentPage(p); setEditingId(null); setToolbarPos(null); }}>
                      <div className="pdfeditor-thumb-wrap">
                        {thumbs[p]
                          ? <img src={thumbs[p]} alt={`Page ${p}`} />
                          : <div style={{ width: "100%", height: "100%", background: "#333" }} />}
                      </div>
                      <div className="pdfeditor-thumb-info">
                        <div className="pdfeditor-thumb-page-num">Page {p}</div>
                        {editCount[p] > 0 && (
                          <div className="pdfeditor-thumb-edit-count">✏ {editCount[p]}</div>
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

            {pdfDoc && (
              <div className="pdfeditor-toolbar">
                <button className="pdfeditor-tool-btn"
                  onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); setEditingId(null); }}
                  disabled={currentPage === 1}>← Prev</button>
                <span style={{ fontSize: 12, fontFamily: "DM Mono", color: "var(--muted)", minWidth: 70, textAlign: "center" }}>
                  {currentPage} / {numPages}
                </span>
                <button className="pdfeditor-tool-btn"
                  onClick={() => { setCurrentPage(p => Math.min(numPages, p + 1)); setEditingId(null); }}
                  disabled={currentPage === numPages}>Next →</button>
                <div className="pdfeditor-tool-sep" />
                <span style={{ fontSize: 11, fontFamily: "DM Mono", color: "var(--muted)" }}>Zoom</span>
                <button className="pdfeditor-tool-btn pdfeditor-btn-sm"
                  onClick={() => setZoom(z => Math.max(50, z - 25))}>−</button>
                <span style={{ fontSize: 12, fontFamily: "DM Mono", width: 44, textAlign: "center" }}>{zoom}%</span>
                <button className="pdfeditor-tool-btn pdfeditor-btn-sm"
                  onClick={() => setZoom(z => Math.min(200, z + 25))}>+</button>
                <button className="pdfeditor-tool-btn pdfeditor-btn-sm"
                  onClick={() => setZoom(100)}>Reset</button>
                <div className="pdfeditor-tool-sep" />
                <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "DM Mono" }}>
                  💡 Click any text to edit
                </span>
              </div>
            )}

            <div className="pdfeditor-editor-area"
              onClick={() => { setEditingId(null); setToolbarPos(null); }}>

              {!pdfDoc ? (
                <div className="pdfeditor-empty-state">
                  <div className="pdfeditor-empty-icon">📝</div>
                  <div className="pdfeditor-empty-title">PDF Live Editor</div>
                  <div className="pdfeditor-empty-sub">
                    Open a PDF to start editing.<br />
                    Click on any text to edit it directly.
                  </div>
                  <button className="pdfeditor-btn pdfeditor-btn-primary" style={{ marginTop: 8 }}
                    onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                    📂 Open PDF
                  </button>
                </div>
              ) : (
                <div style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: "top center",
                  transition: "transform 0.15s",
                }}>
                  <div
                    ref={wrapperRef}
                    className="pdfeditor-page-wrapper"
                    style={{ width: currentPageSize.w, height: currentPageSize.h }}
                  >
                    {/* Canvas — text gets whited out by useEffect after blocks load */}
                    <canvas ref={canvasRef} className="pdfeditor-page-canvas" />

                    {/* Text overlay — only source of text the user sees */}
                    <div className="pdfeditor-text-layer">
                      {currentBlocks.map(block => (
                        <div
                          key={block.id}
                          className={[
                            "pdfeditor-text-block",
                            editingId === block.id ? "active-block" : "",
                            block.modified ? "modified" : "",
                          ].filter(Boolean).join(" ")}
                          style={{
                            left: block.x - 2,
                            top: block.y - 2,
                            width: block.w + 10,
                            height: block.h + 6,
                          }}
                          onMouseDown={e => { e.stopPropagation(); selectBlock(block, e); }}
                        >
                          <textarea
                            ref={el => { textRefs.current[block.id] = el; }}
                            className="pdfeditor-block-textarea"
                            value={block.text}
                            style={{
                              fontSize: `${block.fontSize}px`,
                              color: block.color,
                            }}
                            onChange={e => updateBlock(block.id, { text: e.target.value })}
                            onMouseDown={e => e.stopPropagation()}
                            onClick={e => e.stopPropagation()}
                            onFocus={e => e.stopPropagation()}
                            spellCheck={false}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Floating style toolbar */}
                    {editingBlock && toolbarPos && (
                      <div
                        className="pdfeditor-text-toolbar"
                        style={{
                          position: "absolute",
                          left: Math.max(0, Math.min(toolbarPos.x, (currentPageSize.w || 600) - 340)),
                          top: Math.max(0, toolbarPos.y),
                        }}
                        onMouseDown={e => e.stopPropagation()}
                      >
                        <span className="pdfeditor-tt-label">Size</span>
                        <input
                          type="number"
                          value={editingBlock.fontSize}
                          min={6} max={120}
                          onChange={e => updateBlock(editingBlock.id, { fontSize: parseInt(e.target.value) || 12 })}
                        />
                        <div className="pdfeditor-tt-sep" />
                        <span className="pdfeditor-tt-label">Color</span>
                        <input
                          type="color"
                          value={editingBlock.color}
                          onChange={e => updateBlock(editingBlock.id, { color: e.target.value })}
                        />
                        <div className="pdfeditor-tt-sep" />
                        <button
                          className="pdfeditor-btn pdfeditor-btn-ghost pdfeditor-btn-sm"
                          onClick={() => updateBlock(editingBlock.id, { text: editingBlock.original, modified: false })}
                        >↩ Reset</button>
                        <button
                          className="pdfeditor-btn pdfeditor-btn-ghost pdfeditor-btn-sm"
                          onClick={() => { setEditingId(null); setToolbarPos(null); }}
                        >✓ Done</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="pdfeditor-statusbar">
          <div className="pdfeditor-status-item">
            PAGE <span className="pdfeditor-status-val">{pdfDoc ? currentPage : "—"}</span>
          </div>
          <div className="pdfeditor-status-item">
            TOTAL <span className="pdfeditor-status-val">{pdfDoc ? numPages : "—"}</span>
          </div>
          <div className="pdfeditor-status-item">
            EDITS <span className="pdfeditor-status-accent">{totalEdits || "0"}</span>
          </div>
          <div className="pdfeditor-status-item">
            ZOOM <span className="pdfeditor-status-val">{zoom}%</span>
          </div>
          {editingBlock && (
            <div className="pdfeditor-status-item">
              EDITING <span className="pdfeditor-status-accent">
                "{editingBlock.original.slice(0, 20)}{editingBlock.original.length > 20 ? "…" : ""}"
              </span>
            </div>
          )}
        </div>

        {loading && (
          <div className="pdfeditor-progress-overlay">
            <div className="pdfeditor-progress-box">
              <div className="pdfeditor-progress-title">Processing PDF…</div>
              <div className="pdfeditor-progress-sub">Please wait a moment</div>
              <div className="pdfeditor-progress-bar-wrap">
                <div className="pdfeditor-progress-bar" />
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className={`pdfeditor-toast ${toast.type}`}>{toast.msg}</div>
        )}
      </div>
    </>
  );
}

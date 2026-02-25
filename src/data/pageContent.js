export const PAGE_FAQS = {
  'pdf-to-word': [
    { q: 'What PDF formats are supported for conversion?', a: 'We support standard PDF files (.pdf). The output is editable Word (.docx) format, compatible with Microsoft Word and Google Docs.' },
    { q: 'Will my formatting be preserved when converting PDF to Word?', a: 'We preserve text, layout, and structure as much as possible. Complex layouts may need minor adjustments in Word. Tables and lists are typically preserved well.' },
    { q: 'Is there a file size limit for PDF to Word conversion?', a: 'We support typical document sizes. For best results, keep files under 50MB. Larger files may take longer to process.' },
    { q: 'Are my files secure? When are they deleted?', a: 'Yes. Files are processed on secure servers and automatically deleted immediately after you download the result. We never store or share your documents.' },
    { q: 'Can I convert password-protected PDFs?', a: 'Password-protected PDFs must be unlocked before upload. Remove the password in your PDF reader first, then convert.' },
    { q: 'Does it work on mobile?', a: 'Yes. DocEase works on any device—desktop, tablet, or phone. Use Chrome, Safari, Firefox, or Edge.' },
  ],
  'word-to-pdf': [
    { q: 'What Word formats work for conversion?', a: 'We support .docx (Word 2007+) and .doc (Word 97–2003) formats. Both convert to high-quality PDF output.' },
    { q: 'Will fonts and formatting be preserved in the PDF?', a: 'Yes. Your document formatting, fonts, images, and layout are preserved in the PDF output. The PDF will look the same as your Word document.' },
    { q: 'Can I convert multiple Word files at once?', a: 'Convert one file at a time. For batch conversion, use the tool repeatedly or try our Merge DOCX tool to combine documents first.' },
    { q: 'Is the conversion free and do I need to sign up?', a: 'Yes. Conversion is completely free with no signup required. Just upload, convert, and download.' },
    { q: 'What devices and browsers are supported?', a: 'DocEase works on desktop and mobile—Windows, Mac, iOS, and Android. Use any modern browser (Chrome, Firefox, Safari, Edge).' },
    { q: 'Is there a daily limit?', a: 'We have fair-use limits to keep the service free for everyone. Typical usage is well within these limits.' },
  ],
  'reduce-size': [
    { q: 'Does the output stay in the same format?', a: 'Yes. PDF stays PDF, Word stays Word. We compress without changing format. Your file type remains the same.' },
    { q: 'How much can I reduce the file size?', a: 'You specify a target size in KB. We compress as close as possible while keeping the document readable. Aggressive targets may reduce quality slightly.' },
    { q: 'Will quality be affected when compressing?', a: 'Some quality reduction may occur with heavy compression. We balance size and readability. For best results, choose a realistic target size.' },
    { q: 'Are my files deleted after processing?', a: 'Yes. Files are processed temporarily and deleted immediately after you download. We never store your documents.' },
    { q: 'What file size limits apply?', a: 'We support typical document sizes. Keep files under 50MB for optimal performance.' },
    { q: 'Will my document look the same after compression?', a: 'We balance size and quality. Light compression keeps documents nearly identical. Heavy compression may slightly reduce image quality.' },
  ],
  'merge-pdf': [
    { q: 'How many PDFs can I merge?', a: 'You can merge 2 or more PDF files. There is no strict upper limit, but very large merges (20+ files) may take longer to process.' },
    { q: 'Can I reorder the pages before merging?', a: 'Yes. Use the up/down arrows to set the order. The first file in the list becomes the first pages in the merged PDF.' },
    { q: 'Will bookmarks or links be preserved?', a: 'Internal structure is merged. Some advanced features like bookmarks may need adjustment in a PDF editor after merging.' },
    { q: 'Is merging PDFs free and secure?', a: 'Yes. Merging is free with no signup. Files are processed securely and deleted immediately after you download the result.' },
    { q: 'What if my PDFs have different page sizes?', a: 'All pages are merged in order. Different page sizes are preserved—each page keeps its original dimensions.' },
    { q: 'Can I add more files after selecting?', a: 'Yes. Click the upload area again to replace your selection with a new set of files.' },
  ],
  'merge-docx': [
    { q: 'What formats can I merge?', a: 'We support .docx and .doc. All files are merged into a single .docx output, compatible with Word and Google Docs.' },
    { q: 'How is the order determined when merging?', a: 'You set the order with the arrows. The first file in the list appears first in the merged document. Drag to reorder before merging.' },
    { q: 'Will styles be preserved when merging Word documents?', a: 'Content and basic formatting are preserved. Complex styles may be normalized for consistency across the merged document.' },
    { q: 'Do I need an account to merge Word files?', a: 'No. Merging is free with no signup. Just upload, set order, and merge.' },
    { q: 'Are my documents secure?', a: 'Yes. Files are processed on secure servers and deleted immediately after download. We never store or share your documents.' },
    { q: 'What output format do I get?', a: 'A single .docx file containing all merged content in the order you specified.' },
  ],
  'add-page-numbers': [
    { q: 'Where do page numbers appear?', a: 'Page numbers are added in the bottom-right corner of each page. This format meets most submission requirements for reports and theses.' },
    { q: 'What if I specify a different total than the actual page count?', a: 'If your specified total differs from the actual page count, we show a warning. The numbers are still added. Use the total for "Page X of Y" display.' },
    { q: 'Can I choose a different position for page numbers?', a: 'Currently we support bottom-right. This works well for reports, theses, and official submissions. More options may be added later.' },
    { q: 'Does it work on both PDF and Word?', a: 'Yes. Add page numbers to PDF or Word (.docx, .doc). Same simple process for both formats.' },
    { q: 'Are my files kept private?', a: 'Yes. Files are processed and deleted immediately after download. We never store your documents.' },
    { q: 'Can I customize the page number format?', a: 'We add numbers in the standard bottom-right format (Page X of Y). This meets most submission requirements.' },
  ],
  'remove-watermark': [
    { q: 'What types of watermarks are removed?', a: 'PDF: annotation-based watermarks. Word: header-based watermarks (e.g. DRAFT, CONFIDENTIAL, SAMPLE).' },
    { q: 'Will it work on all watermarks?', a: 'It works on common watermark types. Watermarks embedded in images or as part of the page background may not be fully removable.' },
    { q: 'Is the original content preserved?', a: 'Yes. Only the watermark layer is removed. Your document content, formatting, and images stay intact.' },
    { q: 'Is watermark removal free?', a: 'Yes. Free, no signup. Upload, remove, and download. Files are deleted after processing.' },
    { q: 'What file formats are supported?', a: 'PDF (.pdf) and Word (.docx, .doc). Both formats are supported for watermark removal.' },
    { q: 'Will my document content be changed?', a: 'No. Only the watermark layer is removed. All text, images, and formatting remain unchanged.' },
  ],
};

export const TOOL_WHY_USE = {
  'pdf-to-word': {
    title: 'Why Use This Tool?',
    intro: 'Convert PDFs to editable Word documents in seconds. Perfect for students, professionals, and anyone who needs to edit or reuse PDF content.',
    cards: [
      { icon: '✏️', title: 'Edit Anywhere', description: 'Open your converted file in Word, Google Docs, or any editor. Make changes, add sections, reformat with ease.' },
      { icon: '📄', title: 'Formatting Preserved', description: 'We maintain layout, tables, and structure so your document looks right when you open it.' },
      { icon: '🔒', title: '100% Secure', description: 'Files are processed and deleted immediately. We never store or share your documents.' },
      { icon: '⚡', title: 'Instant Results', description: 'No signup, no waiting. Upload and download in seconds. Works on any device.' },
    ],
  },
  'word-to-pdf': {
    title: 'Why Use This Tool?',
    intro: 'Create professional PDFs from Word documents. Preserve your formatting and share with confidence.',
    cards: [
      { icon: '📤', title: 'Submission Ready', description: 'Convert assignments, reports, and forms to PDF for email, portals, or official submissions.' },
      { icon: '🎨', title: 'Formatting Intact', description: 'Fonts, images, and layout stay exactly as you designed them in Word.' },
      { icon: '🔒', title: 'Private & Secure', description: 'Your documents are processed securely and deleted right after download.' },
      { icon: '⚡', title: 'No Account Needed', description: 'Free conversion. Just upload, convert, and download. Works on desktop and mobile.' },
    ],
  },
  'reduce-size': {
    title: 'Why Use This Tool?',
    intro: 'Compress PDF or Word files to meet size limits. Same format, smaller file—ideal for email and uploads.',
    cards: [
      { icon: '📉', title: 'Hit Your Target', description: 'Specify the exact size in KB. We compress as close as possible while keeping quality.' },
      { icon: '📄', title: 'Same Format Out', description: 'PDF stays PDF, Word stays Word. No format conversion—just smaller files.' },
      { icon: '📧', title: 'Email Friendly', description: 'Meet attachment limits for submissions, job applications, and official forms.' },
      { icon: '🔒', title: 'Secure Processing', description: 'Files are processed and auto-deleted. No storage, no signup required.' },
    ],
  },
  'merge-pdf': {
    title: 'Why Use This Tool?',
    intro: 'Combine multiple PDFs into one document. Reorder pages, merge reports, and create polished deliverables.',
    cards: [
      { icon: '📑', title: 'Combine Anything', description: 'Merge reports, chapters, forms, or scans into a single PDF. Full control over order.' },
      { icon: '↕️', title: 'Reorder Easily', description: 'Use arrows to set the exact order. First in list = first in the merged file.' },
      { icon: '🔒', title: 'Secure & Free', description: 'No signup. Files processed and deleted immediately after download.' },
      { icon: '⚡', title: 'Merge in Seconds', description: 'Upload, reorder, merge. Built for students, professionals, and government users.' },
    ],
  },
  'merge-docx': {
    title: 'Why Use This Tool?',
    intro: 'Combine multiple Word documents into one. Perfect for theses, reports, and multi-part documents.',
    cards: [
      { icon: '📑', title: 'One Document', description: 'Merge chapters, sections, or drafts into a single .docx file. Set your own order.' },
      { icon: '↕️', title: 'Simple Reordering', description: 'Use up/down arrows to arrange files. First in list appears first in the output.' },
      { icon: '🔒', title: 'Secure & Private', description: 'Files are processed and deleted. No account, no storage, no fees.' },
      { icon: '⚡', title: 'Fast Merging', description: 'Built for students and professionals. Merge in seconds, download instantly.' },
    ],
  },
  'add-page-numbers': {
    title: 'Why Use This Tool?',
    intro: 'Add page numbers to PDF or Word documents. Meet submission requirements for reports, theses, and official forms.',
    cards: [
      { icon: '📋', title: 'Meet Requirements', description: 'Many submissions require page numbers. We add them in the standard bottom-right position.' },
      { icon: '🔢', title: 'Customize Start & Total', description: 'Set start number and total for "Page X of Y" display. Works for multi-part documents.' },
      { icon: '📄', title: 'PDF & Word', description: 'Same tool for both formats. Add numbers to any document in seconds.' },
      { icon: '🔒', title: 'Free & Secure', description: 'No signup. Files processed and deleted immediately after download.' },
    ],
  },
  'remove-watermark': {
    title: 'Why Use This Tool?',
    intro: 'Remove watermarks from PDF or Word. Clean documents for final submission or distribution.',
    cards: [
      { icon: '✨', title: 'Clean Documents', description: 'Remove DRAFT, CONFIDENTIAL, or other watermarks. Ready for final submission.' },
      { icon: '📄', title: 'Content Preserved', description: 'Only the watermark is removed. Your text, images, and formatting stay intact.' },
      { icon: '🔒', title: 'Secure Processing', description: 'Files are processed and deleted. No storage, no signup, completely free.' },
      { icon: '⚡', title: 'Instant Removal', description: 'Upload, remove, download. Works on PDF annotations and Word header watermarks.' },
    ],
  },
};

export const PAGE_BENEFITS = {
  'pdf-to-word': [
    { icon: '⚡', text: 'Fast conversion — results in seconds' },
    { icon: '📄', text: 'Formatting preserved — layout and structure maintained' },
    { icon: '🔒', text: 'Secure processing — files deleted after download' },
    { icon: '🚫', text: 'No signup — start converting immediately' },
    { icon: '📱', text: 'Cross-device support — works on desktop and mobile' },
  ],
  'word-to-pdf': [
    { icon: '⚡', text: 'Instant conversion — PDF ready in seconds' },
    { icon: '📄', text: 'Formatting preserved — fonts and layout intact' },
    { icon: '🔒', text: 'Secure processing — private and confidential' },
    { icon: '🚫', text: 'No signup — convert without an account' },
    { icon: '📱', text: 'Works everywhere — any device, any browser' },
  ],
  'reduce-size': [
    { icon: '📉', text: 'Hit target size — specify exact KB limit' },
    { icon: '📄', text: 'Same format — PDF stays PDF, Word stays Word' },
    { icon: '🔒', text: 'Secure — files deleted after download' },
    { icon: '🚫', text: 'No signup — free compression' },
    { icon: '⚡', text: 'Fast — meet email limits quickly' },
  ],
  'merge-pdf': [
    { icon: '📑', text: 'Combine reports, chapters, or forms into one' },
    { icon: '↕️', text: 'Reorder with drag — control exact flow' },
    { icon: '🔒', text: 'Secure — files processed and deleted' },
    { icon: '🚫', text: 'No signup — merge for free' },
    { icon: '⚡', text: 'Instant — merge in seconds' },
  ],
  'merge-docx': [
    { icon: '📑', text: 'Combine chapters or drafts into one document' },
    { icon: '↕️', text: 'Set order with simple controls' },
    { icon: '🔒', text: 'Secure — no storage, files deleted' },
    { icon: '🚫', text: 'No account — free merging' },
    { icon: '⚡', text: 'Fast — built for students and professionals' },
  ],
  'add-page-numbers': [
    { icon: '📋', text: 'Meet submission rules — reports, theses, official docs' },
    { icon: '🔢', text: 'Customize start and total — multi-part documents' },
    { icon: '📄', text: 'PDF and Word — both formats supported' },
    { icon: '🔒', text: 'Secure — files deleted after download' },
    { icon: '⚡', text: 'Instant — no signup required' },
  ],
  'remove-watermark': [
    { icon: '✨', text: 'Clean documents for final submission' },
    { icon: '📄', text: 'Remove DRAFT, CONFIDENTIAL from Word' },
    { icon: '🔒', text: 'Secure — annotation watermarks removed from PDF' },
    { icon: '🚫', text: 'No signup — free removal' },
    { icon: '⚡', text: 'Instant — content preserved' },
  ],
};

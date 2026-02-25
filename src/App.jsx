import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PdfToWord from './pages/PdfToWord';
import WordToPdf from './pages/WordToPdf';
import ReduceSize from './pages/ReduceSize';
import MergePdf from './pages/MergePdf';
import MergeDocx from './pages/MergeDocx';
import AddPageNumbers from './pages/AddPageNumbers';
import RemoveWatermark from './pages/RemoveWatermark';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Faq from './pages/Faq';
import '../App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="tools/word-to-pdf" element={<WordToPdf />} />
          <Route path="tools/reduce-size" element={<ReduceSize />} />
          <Route path="tools/merge-pdf" element={<MergePdf />} />
          <Route path="tools/merge-docx" element={<MergeDocx />} />
          <Route path="tools/add-page-numbers" element={<AddPageNumbers />} />
          <Route path="tools/remove-watermark" element={<RemoveWatermark />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="faq" element={<Faq />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageMeta } from '../utils/seo';
import { blogPosts } from '../data/blogPosts';
import './PageLayout.css';
import './Blog.css';

export default function Blog() {
  useEffect(() => {
    setPageMeta({
      title: 'Blog - DocEase Tips & Guides',
      description: 'Tips and guides for PDF conversion, Word to PDF, file compression, and document merging.',
    });
  }, []);

  return (
    <div className="page-layout blog-page">
      <section className="page-hero">
        <h1 className="page-hero-title">Blog</h1>
        <p className="page-hero-subheading">Tips and guides for students, educators & professionals.</p>
      </section>
      <div className="blog-list">
        {blogPosts.map((post) => (
          <article key={post.slug} className="blog-card">
            <Link to={`/blog/${post.slug}`}>
              <h3>{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

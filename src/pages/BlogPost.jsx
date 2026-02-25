import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { setPageMeta } from '../utils/seo';
import { blogPosts } from '../data/blogPosts';
import './PageLayout.css';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      setPageMeta({
        title: `${post.title} | DocEase Blog`,
        description: post.excerpt,
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="page-layout blog-post-page">
        <section className="page-hero">
          <p>Post not found.</p>
          <Link to="/blog" className="blog-back">← Back to Blog</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page-layout blog-post-page">
      <section className="page-hero">
        <Link to="/blog" className="blog-back">← Back to Blog</Link>
        <h1 className="page-hero-title">{post.title}</h1>
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
      </section>
      <article className="page-card blog-article">
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}

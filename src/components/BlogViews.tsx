import { useState } from "react";
import { PageId, BlogPost } from "../types";
import { BLOG_POSTS } from "../data";
import { Clock, User, Calendar, BookOpen, ChevronRight, HelpCircle, ArrowLeft, Bookmark } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

interface BlogViewsProps {
  onNavigate: (page: PageId, slug?: string) => void;
  activeSlug?: string;
}

export default function BlogViews({ onNavigate, activeSlug }: BlogViewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract all categories
  const categories = ["All", ...Array.from(new Set(BLOG_POSTS.map((post) => post.category)))];

  // Blog list filter
  const filteredPosts = selectedCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  // If viewing a post
  if (activeSlug) {
    const post = BLOG_POSTS.find((p) => p.slug === activeSlug);

    if (!post) {
      return (
        <div className="max-w-md mx-auto text-center py-16 space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
          <button onClick={() => onNavigate("blog")} className="text-blue-600 hover:underline">
            Back to Blog Listing
          </button>
        </div>
      );
    }

    // Related posts: same category or simply different posts
    const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug && (p.category === post.category || Math.random() > 0.5)).slice(0, 3);

    return (
      <div className="max-w-6xl mx-auto px-4 py-8" id="blog-post-page">
        <Breadcrumbs
          items={[
            { label: "Blog", pageId: "blog" },
            { label: post.title, active: true },
          ]}
          onNavigate={onNavigate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <main className="lg:col-span-3 bg-white p-6 sm:p-10 border border-slate-100 rounded-2xl shadow-md">
            <article>
              {/* Header meta */}
              <div className="space-y-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center"><User className="h-4 w-4 mr-1 text-slate-300" /> {post.author}</span>
                  <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-slate-300" /> {post.publishedDate}</span>
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1 text-slate-300" /> {post.readTime}</span>
                </div>
              </div>

              {/* Placeholder graphic banner */}
              <div className="bg-slate-50 border border-slate-100 w-full h-48 sm:h-64 rounded-xl flex items-center justify-center mb-8 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-slate-900 text-slate-200 text-xs px-2.5 py-1 rounded font-semibold flex items-center">
                  <Bookmark className="h-3.5 w-3.5 mr-1 text-blue-400" /> Premium Guide
                </div>
                <div className="text-center space-y-2 p-4">
                  <BookOpen className="h-10 w-10 text-slate-400 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">Expert Article: {post.title}</p>
                  <p className="text-xs text-slate-400">Written & Approved by HR Editorial Team</p>
                </div>
              </div>

              {/* Table of Contents for article */}
              {post.toc && post.toc.length > 0 && (
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl mb-8">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Table of Contents</h3>
                  <ul className="space-y-2.5 text-sm list-none p-0 m-0">
                    {post.toc.map((tocItem, i) => (
                      <li key={i} className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                        <ChevronRight className="h-4 w-4 mr-1 text-slate-400 shrink-0" />
                        <span className="font-medium cursor-pointer">{tocItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Render content paragraphs */}
              <div className="prose prose-slate max-w-none text-slate-600 space-y-5 leading-relaxed text-sm">
                {post.content.map((pText, i) => (
                  <p key={i}>{pText}</p>
                ))}
              </div>

              {/* Post specific FAQs */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Article FAQ
                  </h3>
                  <div className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800 mb-1">Q: {faq.question}</h4>
                        <p className="text-xs text-slate-500 mt-1">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </main>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
              <h3 className="font-bold text-base leading-snug">Build Your ATS-Friendly Resume Now</h3>
              <p className="text-xs text-slate-300">Generate professional, high-scoring resumes for free in minutes. Free PDF download, no signups required.</p>
              <button
                onClick={() => onNavigate("builder")}
                className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 rounded-lg shadow transition-colors cursor-pointer"
              >
                Launch Resume Builder
              </button>
            </div>

            {/* Related Articles */}
            <div className="bg-white p-5 border border-slate-100 rounded-2xl space-y-4">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map((rp) => (
                  <div
                    key={rp.slug}
                    onClick={() => onNavigate("blog-post", rp.slug)}
                    className="group cursor-pointer space-y-1"
                  >
                    <span className="text-[10px] uppercase font-bold text-blue-500">{rp.category}</span>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {rp.title}
                    </h4>
                    <p className="text-[10px] text-slate-400">{rp.publishedDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Blog Listing View
  return (
    <div className="max-w-6xl mx-auto px-4 py-8" id="blog-listing-page">
      <Breadcrumbs items={[{ label: "Blog Articles", active: true }]} onNavigate={onNavigate} />

      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Career Guides & Writing Advice</h1>
        <p className="text-slate-500">Expert articles hand-crafted by recruitment specialists to help you build highly competitive, ATS-friendly resumes.</p>
      </div>

      {/* Categories Horizontal filters */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Listing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-grid">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            onClick={() => onNavigate("blog-post", post.slug)}
            className="group cursor-pointer bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden"
          >
            {/* Visual Thumbnail Placeholder */}
            <div className="bg-slate-50 h-36 flex items-center justify-center border-b border-slate-50 relative overflow-hidden">
              <span className="absolute top-3 left-3 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {post.category}
              </span>
              <BookOpen className="h-8 w-8 text-slate-300" />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-50 font-medium">
                <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {post.readTime}</span>
                <span className="text-blue-600 group-hover:underline">Read Guide &rarr;</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

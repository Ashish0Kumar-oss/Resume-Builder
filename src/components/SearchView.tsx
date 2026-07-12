import { useState } from "react";
import { PageId } from "../types";
import { BLOG_POSTS, RESUME_EXAMPLES } from "../data";
import { Search, FileText, BookOpen, ChevronRight, HelpCircle } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

interface SearchViewProps {
  onNavigate: (page: PageId, slug?: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
}

export default function SearchView({ onNavigate, query, onQueryChange }: SearchViewProps) {
  // Perform search
  const filteredBlog = query
    ? BLOG_POSTS.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredExamples = query
    ? RESUME_EXAMPLES.filter(
        (ex) =>
          ex.role.toLowerCase().includes(query.toLowerCase()) ||
          ex.introduction.toLowerCase().includes(query.toLowerCase()) ||
          ex.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const totalResults = filteredBlog.length + filteredExamples.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="search-page-container">
      <Breadcrumbs items={[{ label: "Global Search", active: true }]} onNavigate={onNavigate} />

      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Search Our Career Database</h1>
        <p className="text-slate-500">Search guides, writing advice, and specific resume template pages instantly.</p>
      </div>

      {/* Large Input */}
      <div className="relative mb-10 max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Type keywords (e.g. software engineer, mistakes, summary...)"
          className="block w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-md"
          autoFocus
        />
      </div>

      {query ? (
        <div className="space-y-8">
          <p className="text-sm text-slate-400 font-medium">Found {totalResults} matching results for "{query}"</p>

          {/* Examples results */}
          {filteredExamples.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 flex items-center">
                <FileText className="h-4 w-4 mr-1.5" /> Resume Example Pages ({filteredExamples.length})
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {filteredExamples.map((ex) => (
                  <div
                    key={ex.slug}
                    onClick={() => onNavigate("examples-post", ex.slug)}
                    className="p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm">{ex.role} Resume Sample & Guide</h3>
                      <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{ex.introduction}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog results */}
          {filteredBlog.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-1.5" /> Career Blog Articles ({filteredBlog.length})
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {filteredBlog.map((post) => (
                  <div
                    key={post.slug}
                    onClick={() => onNavigate("blog-post", post.slug)}
                    className="p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm">{post.title}</h3>
                      <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{post.summary}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalResults === 0 && (
            <div className="text-center py-12 bg-white border border-slate-100 rounded-2xl">
              <p className="text-slate-400 text-sm">No articles or resume pages match your search terms.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100 max-w-xl mx-auto space-y-3">
          <HelpCircle className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="text-slate-600 text-sm font-medium">Try typing some career keywords</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {["Software Engineer", "Fresher", "ATS Guide", "Resume Mistakes", "Nurse", "Accountant"].map((tag) => (
              <button
                key={tag}
                onClick={() => onQueryChange(tag)}
                className="px-3 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

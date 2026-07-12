import { useState } from "react";
import { FileText, Menu, X, Search, Briefcase } from "lucide-react";
import { PageId } from "../types";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, slug?: string) => void;
  onSearchOpen: () => void;
}

export default function Navbar({ currentPage, onNavigate, onSearchOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home" as PageId, label: "Home" },
    { id: "builder" as PageId, label: "Resume Builder" },
    { id: "blog" as PageId, label: "Blog" },
    { id: "examples" as PageId, label: "Resume Examples" },
    { id: "faq" as PageId, label: "FAQ" },
    { id: "about" as PageId, label: "About Us" },
    { id: "contact" as PageId, label: "Contact" },
  ];

  const handleItemClick = (pageId: PageId) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 border-b border-zinc-100 shadow-[0_1px_2px_rgba(0,0,0,0.01)] backdrop-blur-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div 
            onClick={() => handleItemClick("home")} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-8 h-8 bg-zinc-950 text-white rounded-lg flex items-center justify-center group-hover:bg-zinc-900 transition-colors shadow-xs">
              <FileText className="h-5 w-5" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-zinc-900">
              EasyResume<span className="text-zinc-950 font-extrabold underline decoration-2 decoration-zinc-900 underline-offset-4">Builder</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === item.id || 
                  (item.id === "blog" && currentPage === "blog-post") ||
                  (item.id === "examples" && currentPage === "examples-post")
                    ? "text-zinc-950 bg-zinc-100 font-semibold"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onSearchOpen}
              className="p-2 text-zinc-500 hover:text-zinc-950 rounded-lg hover:bg-zinc-50 cursor-pointer"
              aria-label="Search articles and examples"
              id="nav-search-btn"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleItemClick("builder")}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg shadow-xs transition-colors cursor-pointer tracking-tight"
              id="nav-cta-btn"
            >
              Start Building Free
            </button>
          </div>

          {/* Mobile menu toggle & Search button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onSearchOpen}
              className="p-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-slate-50 cursor-pointer"
              aria-label="Search"
              id="nav-mobile-search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-500 hover:text-zinc-950 rounded-lg hover:bg-zinc-50 cursor-pointer"
              aria-label="Toggle Menu"
              id="nav-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white shadow-md absolute top-16 left-0 w-full" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  currentPage === item.id
                    ? "text-zinc-950 bg-zinc-50 font-semibold"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
                id={`nav-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-2 border-t border-zinc-100 px-3">
              <button
                onClick={() => handleItemClick("builder")}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-base font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                id="nav-mobile-cta"
              >
                Start Building Free
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

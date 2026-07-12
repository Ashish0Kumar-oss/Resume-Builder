import { PageId } from "../types";
import { FileText, Heart, Github, Twitter, Linkedin, ShieldCheck } from "lucide-react";

interface FooterProps {
  onNavigate: (page: PageId, slug?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50/50 text-zinc-600 border-t border-zinc-200/60 no-print font-sans" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div 
              onClick={() => onNavigate("home")} 
              className="flex items-center space-x-2 cursor-pointer group w-fit"
            >
              <div className="w-8 h-8 bg-zinc-950 text-white rounded-lg flex items-center justify-center group-hover:bg-zinc-900 transition-colors shadow-xs">
                <FileText className="h-5 w-5" />
              </div>
              <span className="font-sans font-bold text-xl tracking-tight text-zinc-900">
                EasyResume<span className="text-zinc-950 font-extrabold underline decoration-2 decoration-zinc-900 underline-offset-4">Builder</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Build high-quality, professional, and ATS-friendly resumes for free. 
              No logins, no paywalls, and absolutely no watermarks. Your data stays 100% in your browser.
            </p>
            <div className="flex items-center space-x-2 text-xs text-zinc-700 bg-zinc-100 border border-zinc-200/50 px-3 py-1.5 rounded-lg w-fit font-semibold">
              <ShieldCheck className="h-4 w-4 shrink-0 text-zinc-500" />
              <span>Offline-First / Local Storage</span>
            </div>
          </div>

          {/* Tools & Core pages */}
          <div>
            <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-4">Resume Tools</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate("builder")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Online Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("examples")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Resume Examples & Samples
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("faq")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  FAQ & Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("blog")} className="text-slate-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Career Blog & Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div>
            <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-4">Legal & Compliance</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate("privacy")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("terms")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("disclaimer")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("cookie")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("editorial")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Editorial Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-4">Information</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate("about")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("contact")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("sitemap")} className="text-zinc-500 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors cursor-pointer text-left">
                  HTML Sitemap
                </button>
              </li>
              <li>
                <div className="flex space-x-2 pt-2">
                  <a href="#" className="p-2 bg-zinc-100 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 rounded-lg transition-colors" aria-label="Twitter">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="#" className="p-2 bg-zinc-100 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 rounded-lg transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" className="p-2 bg-zinc-100 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 rounded-lg transition-colors" aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* AdSense Notice Area */}
        <div className="pt-8 border-t border-zinc-200 text-xs text-zinc-400 space-y-4">
          <p className="leading-relaxed text-zinc-400">
            <strong>AdSense Advertising Disclaimer:</strong> This website is monetized through advertisements (such as Google AdSense) which helps us keep this premium service 100% free for job seekers worldwide. These third-party vendors use cookies to serve ads based on your prior visits to our website or other websites on the internet. You can manage your advertising choices anytime in your browser settings.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center pt-2 space-y-4 md:space-y-0 text-zinc-500 border-t border-zinc-100">
            <p className="flex items-center space-x-1 text-xs">
              <span>© {currentYear} Easy Resume Builder. All rights reserved. Made with</span>
              <Heart className="h-3 w-3 text-zinc-400 fill-zinc-400 inline mx-0.5" />
              <span>for a better career path.</span>
            </p>
            <div className="flex items-center space-x-2 text-[10px] font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-lg border border-zinc-200/40">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
              <span>No Login Required • Locally Stored • 100% Free Forever</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

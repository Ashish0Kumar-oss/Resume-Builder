import React, { useState, useEffect, ChangeEvent } from "react";
import { PageId, ResumeData, CustomizationSettings, BlogPost, ResumeExample } from "./types";
import { DEFAULT_RESUME_DATA, BLOG_POSTS, RESUME_EXAMPLES, FAQS } from "./data";
import { generateResumePDF } from "./utils/pdfGenerator";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import FAQAccordion from "./components/FAQAccordion";
import BlogViews from "./components/BlogViews";
import ExampleViews from "./components/ExampleViews";
import SearchView from "./components/SearchView";
import { 
  AboutView, ContactView, PrivacyView, TermsView, DisclaimerView, 
  CookiePolicyView, EditorialPolicyView, SitemapView, NotFoundView 
} from "./components/StaticPages";

// Lucide Icons
import { 
  Sparkles, ShieldCheck, Download, Sliders, LayoutGrid, Palette, 
  ChevronRight, ArrowRight, HelpCircle, BookOpen, FileText, CheckCircle2,
  FileDown, RefreshCw, Zap, Laptop, FileSignature, ArrowUp, ArrowDown
} from "lucide-react";

export default function App() {
  // --- STATE MANAGEMENT ---
  const [page, setPage] = useState<PageId>("home");
  const [slug, setSlug] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Resume Data State
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);

  // Customization Settings State
  const [customization, setCustomization] = useState<CustomizationSettings>({
    templateId: "modern",
    accentColor: "#2563eb", // hex code
    fontFamily: "inter",
    fontSize: "md",
    lineSpacing: "normal",
    pageMargins: "normal",
    sectionOrder: ["experience", "education", "skills", "projects", "certificates", "languages", "references", "interests", "custom"],
  });

  // --- LOCAL STORAGE PERSISTENCE ---
  useEffect(() => {
    // Read from localStorage on mount
    try {
      const savedData = localStorage.getItem("easy_resume_data");
      const savedCustom = localStorage.getItem("easy_resume_customization");

      if (savedData) {
        setResumeData(JSON.parse(savedData));
      }
      if (savedCustom) {
        setCustomization(JSON.parse(savedCustom));
      }
    } catch (e) {
      console.error("Failed to restore data from LocalStorage", e);
    }
  }, []);

  // Sync to localStorage on data changes
  const handleUpdateResumeData = (newData: ResumeData) => {
    setResumeData(newData);
    localStorage.setItem("easy_resume_data", JSON.stringify(newData));
  };

  const handleUpdateCustomization = (newCustom: CustomizationSettings) => {
    setCustomization(newCustom);
    localStorage.setItem("easy_resume_customization", JSON.stringify(newCustom));
  };

  // --- HANDLERS ---
  const handleNavigate = (pageId: PageId, postSlug?: string) => {
    setPage(pageId);
    if (postSlug) {
      setSlug(postSlug);
    } else {
      setSlug("");
    }
    // Auto scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearResume = () => {
    if (window.confirm("Are you sure you want to clear your current resume progress? This action cannot be undone.")) {
      const emptyResume: ResumeData = {
        personalInfo: {
          name: "",
          title: "",
          email: "",
          phone: "",
          website: "",
          location: "",
          github: "",
          linkedin: "",
          photo: "",
          photoOn: false,
        },
        summary: "",
        experiences: [],
        educations: [],
        skills: [],
        projects: [],
        certificates: [],
        languages: [],
        references: [],
        interests: [],
        customSection: { title: "", items: [], enabled: false },
      };
      handleUpdateResumeData(emptyResume);
    }
  };

  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.personalInfo) {
            handleUpdateResumeData(parsed);
            alert("Resume JSON backup successfully restored!");
          } else {
            alert("Invalid JSON structure. Please upload a backup produced by this website.");
          }
        } catch (error) {
          alert("Error parsing file. Please verify it is a valid JSON backup file.");
        }
      };
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    const fileName = `${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, "_") || "resume"}_backup.json`;
    downloadAnchor.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleUseSampleTemplate = (sampleResume: ResumeData) => {
    handleUpdateResumeData(sampleResume);
  };

  // --- RENDERING ROUTER SYSTEM ---
  const renderCurrentView = () => {
    switch (page) {
      case "home":
        return renderHomeView();
      case "builder":
        return renderBuilderView();
      case "faq":
        return <FAQAccordion onNavigate={handleNavigate} />;
      case "blog":
      case "blog-post":
        return <BlogViews onNavigate={handleNavigate} activeSlug={slug} />;
      case "examples":
      case "examples-post":
        return <ExampleViews onNavigate={handleNavigate} activeSlug={slug} onUseTemplate={handleUseSampleTemplate} />;
      case "about":
        return <AboutView onNavigate={handleNavigate} />;
      case "contact":
        return <ContactView onNavigate={handleNavigate} />;
      case "privacy":
        return <PrivacyView onNavigate={handleNavigate} />;
      case "terms":
        return <TermsView onNavigate={handleNavigate} />;
      case "disclaimer":
        return <DisclaimerView onNavigate={handleNavigate} />;
      case "cookie":
        return <CookiePolicyView onNavigate={handleNavigate} />;
      case "editorial":
        return <EditorialPolicyView onNavigate={handleNavigate} />;
      case "sitemap":
        return <SitemapView onNavigate={handleNavigate} />;
      case "search":
        return <SearchView onNavigate={handleNavigate} query={searchQuery} onQueryChange={setSearchQuery} />;
      default:
        return <NotFoundView onNavigate={handleNavigate} />;
    }
  };

  // --- HOME VIEW RENDER ---
  const renderHomeView = () => {
    return (
      <div className="space-y-16 py-4" id="home-view-container">
        {/* Hero Section */}
        <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-8 pb-4">
          <span className="inline-flex items-center px-3 py-1 bg-zinc-100 text-zinc-800 border border-zinc-200/50 rounded-lg text-xs font-bold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5 mr-1 text-zinc-600" /> 100% Free Forever Creator
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-950 tracking-tight leading-tight max-w-4xl mx-auto">
            Build Your Professional Resume <span className="text-zinc-950 font-black italic underline decoration-zinc-900 decoration-3 underline-offset-8">for Free</span>
          </h1>
          <p className="text-zinc-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            No Signup • No Watermark • ATS Friendly • Instant PDF Download. Store your data securely in your local browser.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleNavigate("builder")}
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-white bg-zinc-950 hover:bg-zinc-850 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
              id="hero-cta-btn"
            >
              Start Building Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => handleNavigate("examples")}
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg transition-all cursor-pointer"
            >
              Browse Templates & Samples
            </button>
          </div>

          {/* Core Feature Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-12 max-w-6xl mx-auto">
            {[
              { title: "Free Forever", desc: "No subscriptions, no watermarks" },
              { title: "ATS Friendly", desc: "Passes automated filters" },
              { title: "Multiple Templates", desc: "10 fully responsive presets" },
              { title: "Live Preview", desc: "Edits reflect instantly" },
              { title: "Instant PDF", desc: "Crisp searchable vectors" },
              { title: "Mobile Friendly", desc: "Build on phones or tablets" },
            ].map((f, idx) => (
              <div key={idx} className="p-4 border border-zinc-100 bg-white rounded-xl text-center space-y-1 shadow-xs hover:border-zinc-300 transition-colors">
                <h3 className="font-bold text-sm leading-snug text-zinc-800">{f.title}</h3>
                <p className="text-[10px] text-zinc-500 font-normal leading-normal">{f.desc}</p>
              </div>
            ))}
          </div>
        </header>

        {/* How It Works */}
        <section className="bg-zinc-50/50 border-y border-zinc-200/40 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">Create in 3 Simple Steps</h2>
              <p className="text-sm text-zinc-500 mt-1">Our platform processes everything inside your device, keeping your personal details completely secure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Fill Out Your Details", desc: "Type in your contact details, jobs list, academic credentials, skills, and certifications into our structured accordion fields." },
                { step: "2", title: "Select & Stylize Preset", desc: "Switch instantly between 10 elegant templates. Tweak accent colors, typography fonts, margins, line spacing, and layouts." },
                { step: "3", title: "Download or Print", desc: "With one click, download an ATS-compliant vector PDF file, or trigger standard paper printing for direct presentation." },
              ].map((s, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-zinc-200/50 shadow-xs relative space-y-3">
                  <span className="absolute -top-4 -left-2 bg-zinc-950 text-white font-bold h-8 w-8 rounded-lg flex items-center justify-center shadow-xs">
                    {s.step}
                  </span>
                  <h3 className="font-bold text-base text-zinc-800 pt-2">{s.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Templates Showroom */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">10 Professional Templates Ready</h2>
            <p className="text-zinc-500 text-sm mt-1">Switch layouts instantly with zero data loss. Styled to align with expert HR recruitment guidelines.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: "modern", label: "Modern Template" },
              { id: "classic", label: "Classic Template" },
              { id: "professional", label: "Professional" },
              { id: "executive", label: "Executive Layout" },
              { id: "minimal", label: "Minimalist Style" },
              { id: "corporate", label: "Corporate Design" },
              { id: "simple", label: "Simple & Clean" },
              { id: "ats-friendly", label: "ATS Scanner Perfect" },
              { id: "student", label: "Student & Intern" },
              { id: "creative", label: "Creative Layout" },
            ].map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  handleUpdateCustomization({ ...customization, templateId: t.id });
                  handleNavigate("builder");
                }}
                className="bg-white border border-zinc-100 hover:border-zinc-950 p-4 rounded-xl shadow-xs text-center cursor-pointer transition-all space-y-2 group"
              >
                <div className="bg-zinc-50 h-24 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-zinc-100 group-hover:text-zinc-950 transition-colors">
                  <FileText className="h-8 w-8" />
                </div>
                <p className="text-xs font-bold text-zinc-700 group-hover:text-zinc-950 group-hover:underline decoration-1 underline-offset-2 transition-colors">{t.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Resources Previews: Blog & Examples */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
          {/* Latest Articles column */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
              <h2 className="text-xl font-extrabold text-zinc-950">Expert Career Writing Blog</h2>
              <button onClick={() => handleNavigate("blog")} className="text-xs font-bold text-zinc-900 hover:underline cursor-pointer">
                View All Guides &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <div
                  key={post.slug}
                  onClick={() => handleNavigate("blog-post", post.slug)}
                  className="p-4 bg-white border border-zinc-150 rounded-xl shadow-xs hover:border-zinc-300 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5 pr-4">
                    <span className="text-[9px] uppercase font-bold text-zinc-500">{post.category}</span>
                    <h3 className="font-bold text-zinc-800 text-sm group-hover:text-zinc-950 group-hover:underline decoration-1 underline-offset-2 transition-colors line-clamp-1">{post.title}</h3>
                    <p className="text-xs text-zinc-400 font-medium">{post.publishedDate} • {post.readTime}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-300 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Latest Examples column */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
              <h2 className="text-xl font-extrabold text-zinc-950">Resume Templates & Examples</h2>
              <button onClick={() => handleNavigate("examples")} className="text-xs font-bold text-zinc-900 hover:underline cursor-pointer">
                View All Samples &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {RESUME_EXAMPLES.slice(0, 3).map((ex) => (
                <div
                  key={ex.slug}
                  onClick={() => handleNavigate("examples-post", ex.slug)}
                  className="p-4 bg-white border border-zinc-150 rounded-xl shadow-xs hover:border-zinc-300 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-zinc-800 text-sm group-hover:text-zinc-950 group-hover:underline decoration-1 underline-offset-2 transition-colors">{ex.role} Resume Sample</h3>
                    <p className="text-xs text-zinc-400 font-normal line-clamp-1">{ex.introduction}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-300 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic FAQ segment preview */}
        <section className="bg-zinc-50/50 border-t border-zinc-200/40 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">Got Questions? We Have Answers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto pt-4">
              {FAQS.slice(0, 4).map((faq, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-zinc-200/50 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm text-zinc-800 flex items-start">
                    <HelpCircle className="h-4 w-4 text-zinc-500 mr-1.5 shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleNavigate("faq")}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-zinc-900 hover:underline cursor-pointer"
            >
              Browse Complete Help Center (20 FAQs) &rarr;
            </button>
          </div>
        </section>
      </div>
    );
  };

  // --- BUILDER VIEW RENDER ---
  const renderBuilderView = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="resume-builder-canvas">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (Edit block) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Template & Visual Tweak Sidebar panel */}
            <div className="bg-white p-5 border border-zinc-200/60 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.01)] space-y-4 no-print">
              <div className="border-b border-zinc-100 pb-2">
                <h3 className="text-sm font-bold text-zinc-900 flex items-center">
                  <Sliders className="h-4.5 w-4.5 text-zinc-700 mr-1.5" />
                  Template & Styling Options
                </h3>
              </div>

              {/* Template Select Preset */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Select Template Preset</label>
                <select
                  value={customization.templateId}
                  onChange={(e) => handleUpdateCustomization({ ...customization, templateId: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-950 outline-none bg-white transition-all"
                >
                  <option value="modern">Modern Layout</option>
                  <option value="classic">Classic Centered</option>
                  <option value="professional">Professional Block</option>
                  <option value="executive">Executive Slate</option>
                  <option value="minimal">Minimal Clean</option>
                  <option value="corporate">Corporate Standard</option>
                  <option value="simple">Simple & Clean</option>
                  <option value="ats-friendly">ATS-Friendly Parser</option>
                  <option value="student">Student/Academic Focus</option>
                  <option value="creative">Creative Layout</option>
                </select>
              </div>

              {/* Theme Accent Color */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Accent Theme Color</label>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { color: "#2563eb", name: "Royal Blue" },
                    { color: "#10b981", name: "Emerald" },
                    { color: "#374151", name: "Charcoal" },
                    { color: "#ef4444", name: "Red Wine" },
                    { color: "#8b5cf6", name: "Purple" },
                    { color: "#f59e0b", name: "Gold" },
                    { color: "#0d9488", name: "Teal" },
                    { color: "#64748b", name: "Slate Grey" },
                  ].map((preset) => (
                    <button
                      key={preset.color}
                      type="button"
                      onClick={() => handleUpdateCustomization({ ...customization, accentColor: preset.color })}
                      className={`h-7 w-7 rounded-full border-2 cursor-pointer transition-all hover:scale-105 ${
                        customization.accentColor === preset.color ? "scale-110 border-zinc-950 shadow-sm" : "border-transparent"
                      }`}
                      style={{ backgroundColor: preset.color }}
                      title={preset.name}
                    />
                  ))}
                  
                  {/* Custom Color Input with visual HTML5 picker */}
                  <div className="flex items-center space-x-1.5 border border-zinc-200 rounded-lg p-1 bg-zinc-50 hover:bg-zinc-100 transition-all">
                    <input
                      type="color"
                      value={customization.accentColor}
                      onChange={(e) => handleUpdateCustomization({ ...customization, accentColor: e.target.value })}
                      className="h-6 w-6 border-0 p-0 cursor-pointer rounded-md bg-transparent"
                      title="Choose custom color"
                    />
                    <input
                      type="text"
                      value={customization.accentColor}
                      onChange={(e) => handleUpdateCustomization({ ...customization, accentColor: e.target.value })}
                      className="w-16 text-[10px] font-mono text-zinc-600 bg-transparent border-0 p-0 focus:ring-0 uppercase focus:outline-none"
                      placeholder="#2563eb"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Photo Toggle Switch */}
              <div className="flex items-center justify-between p-2.5 bg-zinc-50/50 border border-zinc-200/40 rounded-xl">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-zinc-800">Include Profile Photo</span>
                  <p className="text-[10px] text-zinc-400">Toggle image visibility instantly</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={resumeData.personalInfo.photoOn}
                    onChange={(e) => {
                      const updated = {
                        ...resumeData,
                        personalInfo: {
                          ...resumeData.personalInfo,
                          photoOn: e.target.checked
                        }
                      };
                      handleUpdateResumeData(updated);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-zinc-900"></div>
                </label>
              </div>

              {/* Typography Font Picker */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Typography Font Family</label>
                <select
                  value={customization.fontFamily}
                  onChange={(e) => handleUpdateCustomization({ ...customization, fontFamily: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-950 outline-none bg-white transition-all"
                >
                  <option value="inter">Inter (Modern Sans)</option>
                  <option value="space">Space Grotesk (Tech Sans)</option>
                  <option value="playfair">Playfair Display (Serif)</option>
                  <option value="mono">JetBrains Mono (Technical)</option>
                  <option value="merriweather">Merriweather (Readability Serif)</option>
                  <option value="roboto">Roboto (Clean Sans)</option>
                  <option value="lato">Lato (Soft Sans)</option>
                </select>
              </div>

              {/* Font Size & Line Spacing */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Font Sizing</label>
                  <select
                    value={customization.fontSize}
                    onChange={(e) => handleUpdateCustomization({ ...customization, fontSize: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-950 outline-none bg-white transition-all"
                  >
                    <option value="sm">Small (Compact)</option>
                    <option value="md">Medium (Balanced)</option>
                    <option value="lg">Large (Spacious)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Line Spacing</label>
                  <select
                    value={customization.lineSpacing}
                    onChange={(e) => handleUpdateCustomization({ ...customization, lineSpacing: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-950 outline-none bg-white transition-all"
                  >
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>
              </div>

              {/* Page Margins */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Page Margins</label>
                <select
                  value={customization.pageMargins}
                  onChange={(e) => handleUpdateCustomization({ ...customization, pageMargins: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-950 outline-none bg-white transition-all"
                >
                  <option value="compact">Compact Margins (High content density)</option>
                  <option value="normal">Normal Margins (Highly balanced)</option>
                  <option value="spacious">Spacious Margins (Highly elegant)</option>
                </select>
              </div>

              {/* Sidebar Section Reordering */}
              <div className="space-y-2 border-t border-zinc-100 pt-3">
                <div className="space-y-0.5">
                  <label className="block text-[11px] font-semibold text-zinc-500">Section Order</label>
                  <p className="text-[10px] text-zinc-400">Reorder sections on the preview canvas</p>
                </div>
                <div className="space-y-1 max-h-[170px] overflow-y-auto border border-zinc-100 rounded-xl p-1 bg-zinc-50/50">
                  {customization.sectionOrder.map((secId, idx) => {
                    const labelMap: Record<string, string> = {
                      experience: "Experience",
                      education: "Education",
                      skills: "Skills",
                      projects: "Projects",
                      certificates: "Certifications",
                      languages: "Languages",
                      references: "References",
                      interests: "Interests",
                      custom: "Custom Section",
                    };
                    return (
                      <div key={secId} className="flex items-center justify-between px-2 py-1 bg-white border border-zinc-200/50 rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.01)] transition-colors hover:bg-zinc-50">
                        <span className="text-[11px] text-zinc-700 font-medium ml-1">{labelMap[secId] || secId}</span>
                        <div className="flex items-center space-x-0.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const order = [...customization.sectionOrder];
                              if (idx > 0) {
                                const temp = order[idx];
                                order[idx] = order[idx - 1];
                                order[idx - 1] = temp;
                                handleUpdateCustomization({ ...customization, sectionOrder: order });
                              }
                            }}
                            disabled={idx === 0}
                            className="p-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 disabled:opacity-20 rounded transition-colors cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const order = [...customization.sectionOrder];
                              if (idx < order.length - 1) {
                                const temp = order[idx];
                                order[idx] = order[idx + 1];
                                order[idx + 1] = temp;
                                handleUpdateCustomization({ ...customization, sectionOrder: order });
                              }
                            }}
                            disabled={idx === customization.sectionOrder.length - 1}
                            className="p-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 disabled:opacity-20 rounded transition-colors cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Editable Form accordion fields */}
            <ResumeForm
              data={resumeData}
              onChangeData={handleUpdateResumeData}
              settings={customization}
              onChangeSettings={handleUpdateCustomization}
              onClear={handleClearResume}
              onDownloadPDF={() => generateResumePDF(resumeData, customization)}
              onPrint={() => window.print()}
              onImportJSON={handleImportJSON}
              onExportJSON={handleExportJSON}
            />
          </div>

          {/* Right Preview Pane */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-20">
            <div className="flex items-center justify-between no-print px-1">
              <h2 className="text-sm font-bold text-zinc-900 flex items-center">
                <LayoutGrid className="h-4.5 w-4.5 text-zinc-700 mr-1.5" />
                Live PDF Print Preview
              </h2>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase">WYSIWYG Mode</span>
            </div>
            
            {/* Scrollable sheet container */}
            <div className="overflow-y-auto max-h-[85vh] border border-zinc-200 bg-zinc-100 p-6 sm:p-8 shadow-inner no-print" id="wysiwyg-preview-container">
              <ResumePreview data={resumeData} settings={customization} />
            </div>

            {/* Print elements (hidden on screen, active on print) */}
            <div className="hidden print:block">
              <ResumePreview data={resumeData} settings={customization} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-800 flex flex-col justify-between">
      {/* SEO Injector */}
      <SEOHead 
        page={page} 
        blogPost={page === "blog-post" ? BLOG_POSTS.find(p => p.slug === slug) : undefined} 
        examplePost={page === "examples-post" ? RESUME_EXAMPLES.find(e => e.slug === slug) : undefined}
        searchQuery={searchQuery}
      />

      {/* Sticky Top Header */}
      <Navbar 
        currentPage={page} 
        onNavigate={handleNavigate} 
        onSearchOpen={() => handleNavigate("search")} 
      />

      {/* Main Page Layout Wrapper */}
      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      {/* Footer block */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

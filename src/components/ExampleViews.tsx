import { useState } from "react";
import { PageId, ResumeExample, ResumeData } from "../types";
import { RESUME_EXAMPLES } from "../data";
import { generateResumePDF } from "../utils/pdfGenerator";
import { 
  FileText, ArrowLeft, Star, Download, Sparkles, CheckCircle, 
  HelpCircle, ChevronRight, Bookmark, Award, FileSpreadsheet, Briefcase, UserCheck 
} from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

interface ExampleViewsProps {
  onNavigate: (page: PageId, slug?: string) => void;
  activeSlug?: string;
  onUseTemplate: (sampleData: ResumeData) => void;
}

export default function ExampleViews({ onNavigate, activeSlug, onUseTemplate }: ExampleViewsProps) {
  const [copiedNotification, setCopiedNotification] = useState(false);

  // If viewing a post
  if (activeSlug) {
    const example = RESUME_EXAMPLES.find((e) => e.slug === activeSlug);

    if (!example) {
      return (
        <div className="max-w-md mx-auto text-center py-16 space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Example Not Found</h2>
          <button onClick={() => onNavigate("examples")} className="text-blue-600 hover:underline">
            Back to All Resume Examples
          </button>
        </div>
      );
    }

    const handleUseThisTemplate = () => {
      onUseTemplate(example.sampleResume);
      setCopiedNotification(true);
      setTimeout(() => {
        setCopiedNotification(false);
        onNavigate("builder");
      }, 1000);
    };

    const handleDownloadPDF = () => {
      const defaultSettings = {
        templateId: "professional",
        accentColor: "#2563eb",
        fontFamily: "inter",
        fontSize: "md" as "md",
        lineSpacing: "normal" as "normal",
        pageMargins: "normal" as "normal",
        sectionOrder: ["experience", "education", "skills", "projects", "certificates", "languages", "references", "interests", "custom"],
      };
      generateResumePDF(example.sampleResume, defaultSettings);
    };

    return (
      <div className="max-w-6xl mx-auto px-4 py-8" id="example-post-page">
        <Breadcrumbs
          items={[
            { label: "Resume Examples", pageId: "examples" },
            { label: `${example.role} Resume`, active: true },
          ]}
          onNavigate={onNavigate}
        />

        {/* Floating Notification */}
        {copiedNotification && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-lg border border-slate-800 flex items-center space-x-2 text-sm">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <span>Template data loaded. Opening Builder...</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <main className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 sm:p-10 border border-slate-100 rounded-2xl shadow-md space-y-4">
              <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
                100% Free Sample
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {example.role} Resume Example & Guide
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed">{example.introduction}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={handleUseThisTemplate}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer transition-colors"
                >
                  <Sparkles className="h-4 w-4 mr-1.5" /> Use This Template
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4 mr-1.5" /> Download Sample PDF
                </button>
              </div>
            </div>

            {/* Core Skills block */}
            <div className="bg-white p-6 sm:p-8 border border-slate-100 rounded-2xl shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-base uppercase tracking-wider border-b border-slate-100 pb-2">
                Key Skills for {example.role}s
              </h3>
              <p className="text-xs text-slate-500">Incorporate these highly sought-after industry terms into your summary and skill list to score high on ATS screeners:</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {example.skills.map((sk, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-700 text-xs font-semibold rounded-md shadow-sm">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Structured Tips */}
            <div className="bg-white p-6 sm:p-8 border border-slate-100 rounded-2xl shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-base uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-600" />
                Expert Resume Writing Tips
              </h3>
              <ul className="space-y-3 list-none pl-0 m-0">
                {example.tips.map((tip, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600 leading-relaxed">
                    <span className="p-1 bg-blue-50 text-blue-600 rounded-lg mr-2.5 shrink-0 mt-0.5 font-bold text-xs">
                      {i + 1}
                    </span>
                    <p>{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Post FAQs */}
            {example.faqs && example.faqs.length > 0 && (
              <div className="bg-white p-6 sm:p-8 border border-slate-100 rounded-2xl shadow-sm space-y-3">
                <h3 className="font-bold text-slate-800 text-base uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4 pt-2">
                  {example.faqs.map((faq, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <h4 className="text-sm font-bold text-slate-800">Q: {faq.question}</h4>
                      <p className="text-xs text-slate-500">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Right Preview Card */}
          <aside className="space-y-6">
            <div className="bg-white p-5 border border-slate-100 rounded-2xl shadow-md space-y-4">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                Sample Live Preview
              </h3>
              <p className="text-xs text-slate-500">Below is the layout of our optimized sample resume. Click "Use This Template" above to edit this exact content.</p>
              
              {/* Scaled-down static preview block */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3 text-[10px] text-slate-400 select-none">
                <div className="border-b border-slate-200 pb-2 text-center">
                  <p className="font-bold text-slate-700 text-xs">{example.sampleResume.personalInfo.name}</p>
                  <p className="text-slate-500 font-semibold">{example.sampleResume.personalInfo.title}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-600 uppercase tracking-wide border-b border-slate-100 pb-0.5">Experience</p>
                  <div className="space-y-2 mt-1">
                    {example.sampleResume.experiences.map((exp) => (
                      <div key={exp.id}>
                        <p className="font-semibold text-slate-600">{exp.role} - {exp.company}</p>
                        <p className="text-[9px] text-slate-400 leading-snug line-clamp-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Example Listing View
  return (
    <div className="max-w-6xl mx-auto px-4 py-8" id="examples-listing-page">
      <Breadcrumbs items={[{ label: "Resume Examples", active: true }]} onNavigate={onNavigate} />

      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Industry-Specific Resume Examples</h1>
        <p className="text-slate-500">Browse and use our collection of 100% free resume examples crafted to follow ATS-compliant guidelines and secure callbacks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="examples-grid">
        {RESUME_EXAMPLES.map((ex) => (
          <div
            key={ex.slug}
            onClick={() => onNavigate("examples-post", ex.slug)}
            className="group cursor-pointer bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden"
          >
            <div className="bg-slate-50 h-32 flex items-center justify-center border-b border-slate-50 relative overflow-hidden">
              <span className="absolute top-3 left-3 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center">
                <Star className="h-3 w-3 mr-1 fill-emerald-500 text-emerald-500" /> ATS Perfect
              </span>
              <Briefcase className="h-8 w-8 text-slate-300" />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-snug">
                  {ex.role} Resume Guide & Sample
                </h3>
                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {ex.introduction}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-50 font-medium">
                <span className="text-slate-500 font-semibold">{ex.sampleResume.experiences.length} Experience rows</span>
                <span className="text-blue-600 group-hover:underline">View Example &rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

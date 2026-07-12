import { useState } from "react";
import { PageId } from "../types";
import { FAQS } from "../data";
import { HelpCircle, ChevronDown, ChevronUp, Search, FileQuestion } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

interface FAQAccordionProps {
  onNavigate: (page: PageId, slug?: string) => void;
}

export default function FAQAccordion({ onNavigate }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="faq-page">
      <Breadcrumbs items={[{ label: "FAQ & Help Center", active: true }]} onNavigate={onNavigate} />

      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-fit mx-auto mb-4">
          <FileQuestion className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Frequently Asked Questions</h1>
        <p className="text-slate-500">Have questions about ATS scanners, downloading PDF records, or data storage? Browse our comprehensive help archive.</p>
      </div>

      {/* Search bar inside FAQ */}
      <div className="relative mb-8 max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions or answers..."
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
        />
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => {
            // Find actual index in original FAQS list to match
            const originalIndex = FAQS.indexOf(faq);
            const isOpen = openIndex === originalIndex;

            return (
              <div
                key={originalIndex}
                className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden hover:border-slate-200 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(originalIndex)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm pr-4 flex items-start">
                    <span className="text-blue-500 font-bold mr-2 text-base">Q:</span>
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-50 text-slate-600 text-sm leading-relaxed bg-slate-50/20">
                    <div className="flex items-start">
                      <span className="text-emerald-500 font-bold mr-2 text-base shrink-0">A:</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-white border border-slate-100 rounded-2xl">
            <p className="text-slate-400 text-sm">No matching questions found. Try typing another keyword.</p>
          </div>
        )}
      </div>

      <div className="text-center mt-12 py-6 bg-slate-50 rounded-xl border border-slate-100 max-w-3xl mx-auto">
        <h3 className="text-sm font-bold text-slate-800 mb-1">Still need help?</h3>
        <p className="text-xs text-slate-500 mb-4">Our editorial team is ready to assist you. Drop us a line from our dedicated Contact page.</p>
        <button
          onClick={() => onNavigate("contact")}
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
        >
          Contact Our Helpdesk &rarr;
        </button>
      </div>
    </div>
  );
}

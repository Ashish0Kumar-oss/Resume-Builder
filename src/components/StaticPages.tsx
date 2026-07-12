import React, { useState } from "react";
import { PageId } from "../types";
import { 
  ShieldCheck, HelpCircle, Mail, MapPin, Send, CheckCircle, 
  HelpCircle as QuestionIcon, Map, Award, BookOpen, Clock, Heart, 
  UserCheck, Terminal, AlertTriangle, ChevronRight, Home, ChevronDown, Check, ArrowRight 
} from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import { BLOG_POSTS, RESUME_EXAMPLES, FAQS } from "../data";

interface PageProps {
  onNavigate: (page: PageId, slug?: string) => void;
}

// ================= CONTACT VIEW =================
export function ContactView({ onNavigate }: PageProps) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="contact-page">
      <Breadcrumbs items={[{ label: "Contact Us", active: true }]} onNavigate={onNavigate} />
      
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Get in Touch</h1>
        <p className="text-slate-500">Have questions about our builder, advertising inquiries, or bug reports? Drop us a line. We typically reply within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-md">
        {/* Info Column */}
        <div className="space-y-6 md:border-r md:border-slate-100 md:pr-8">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm">
                <Mail className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Support Desk</p>
                  <a href="mailto:support@easyresumebuilder.com" className="text-blue-600 hover:underline">support@easyresumebuilder.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Mail className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Media & Ad Partnerships</p>
                  <a href="mailto:ads@easyresumebuilder.com" className="text-blue-600 hover:underline">ads@easyresumebuilder.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Postal Address</p>
                  <p className="text-slate-500">Suite 450, 201 Mission St,<br />San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed">
            <strong>AdSense Compliance:</strong> No payment details are requested here. Our resume building services are 100% free with no backend transaction data collected.
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-4" id="contact-success-state">
              <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Message Sent Successfully!</h2>
              <p className="text-sm text-slate-500 max-w-sm">Thank you for contacting us. A member of our editorial or support panel will review your submission and follow up via email.</p>
              <button
                onClick={() => {
                  setFormState({ name: "", email: "", message: "" });
                  setIsSubmitted(false);
                }}
                className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="e.g. john@email.com"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Message Body</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Please type your inquiries, suggestions, or comments here..."
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                <Send className="h-4 w-4 mr-1.5" /> Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= ABOUT VIEW =================
export function AboutView({ onNavigate }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="about-page">
      <Breadcrumbs items={[{ label: "About Us", active: true }]} onNavigate={onNavigate} />

      <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-md">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">About Our Mission</h1>
        <p className="text-slate-500 text-center text-base max-w-xl mx-auto mb-10 leading-relaxed">
          We believe high-quality resume creation shouldn't cost a dime. We're here to democratize job seeking by providing robust offline tools that put your privacy first.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              <span className="p-1 bg-blue-50 text-blue-600 rounded-lg mr-2"><Award className="h-4 w-4" /></span>
              Our Mission
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our core mission is to provide equal career opportunities to job applicants worldwide. Traditional online builders lock critical downloading tools behind high monthly subscriptions, watermarking your hard work or baiting you with fake 'free' templates. We built a fully manual, lightweight resume builder that is 100% free, forever, with no watermarks and no hidden upsells.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              <span className="p-1 bg-emerald-50 text-emerald-600 rounded-lg mr-2"><ShieldCheck className="h-4 w-4" /></span>
              Why Offline-First?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We care deeply about your personal information. When you use other online tools, your phone number, email address, locations, and workplace histories are transmitted to remote cloud databases. We designed this platform to operate entirely inside your local browser using HTML5 and LocalStorage technology. Your data never leaves your computer.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Who We Are & How We Operate</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Easy Resume Builder is run by a dedicated team of former recruitment directors, HR managers, and full-stack software development specialists. We write manual, expert career guides and templates with direct input from corporate recruiters.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            To fund the hosting operations, domain registration, and continuous maintenance of our platform, we display high-quality, contextual non-intrusive advertisements sponsored by premium networks like Google AdSense. This advertising revenue model allows us to sustain this essential builder completely free of charge for thousands of job seekers.
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate("builder")}
            className="inline-flex items-center px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Start Crafting Your Resume <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </article>
    </div>
  );
}

// ================= PRIVACY POLICY VIEW =================
export function PrivacyView({ onNavigate }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="privacy-page">
      <Breadcrumbs items={[{ label: "Privacy Policy", active: true }]} onNavigate={onNavigate} />

      <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-md space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-slate-500 text-xs">Last Updated: July 11, 2026</p>
        
        <p className="text-slate-600 text-sm leading-relaxed">
          At Easy Resume Builder, accessible from easyresumebuilder.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information we collect and record, and how we use it. We adhere strictly to local privacy principles and maintain complete compliance with Google AdSense terms of service.
        </p>

        <h2 className="text-lg font-bold text-slate-800">1. Complete Data Privacy: Offline & LocalStorage</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Unlike traditional software systems, Easy Resume Builder does not maintain or collect any of your resume data on remote cloud servers. All personal details, summary blocks, work histories, schools, and custom fields that you enter into our builder are processed and stored locally inside your browser's <strong>LocalStorage</strong> directory. No data transmission occurs over the internet. You can clear your details entirely from our system by choosing the 'Clear Data' button inside the tool or deleting your browser cache.
        </p>

        <h2 className="text-lg font-bold text-slate-800">2. Cookies and Log Files</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Like many other standard websites, we utilize cookies and standard web logging parameters. Cookies are small data tags used to analyze page metrics, traffic volume, user trends, and page navigation routes. Standard log files capture IP addresses, ISP details, browser variants, operating platform versions, timestamps, and page click telemetry. This data is strictly non-personally identifiable and is utilized solely for continuous maintenance and load optimization of our platforms.
        </p>

        <h2 className="text-lg font-bold text-slate-800">3. Google AdSense & Third-Party Advertisers</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          We work with Google AdSense as our primary third-party advertisement vendor. Google and other third-party networks use cookies (such as the DART cookie) to serve relevant, contextual ads to our users based on their visits to our site and other pages on the internet. You may opt out of the use of customized ads by visiting the Google Ad and Content Network Privacy Policy.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          Note that Easy Resume Builder has no access to or control over cookies that are utilized by third-party advertisers. Please consult the respective Privacy Policies of these third-party ad networks for more detailed descriptions of their choices.
        </p>

        <h2 className="text-lg font-bold text-slate-800">4. CCPA and GDPR Compliance</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Under CCPA (California Consumer Privacy Act) and GDPR (General Data Protection Regulation), users have right to request deletion of data, access to records, and portability of information. Because our architecture does not transmit or store any user data in cloud databases, you already hold 100% complete authority and ownership over your data.
        </p>
      </article>
    </div>
  );
}

// ================= TERMS OF SERVICE VIEW =================
export function TermsView({ onNavigate }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="terms-page">
      <Breadcrumbs items={[{ label: "Terms and Conditions", active: true }]} onNavigate={onNavigate} />

      <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-md space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Terms and Conditions</h1>
        <p className="text-slate-500 text-xs">Last Updated: July 11, 2026</p>

        <p className="text-slate-600 text-sm leading-relaxed">
          Welcome to Easy Resume Builder. By accessing our tools, websites, and career resources, you agree to comply with and be bound by the following Terms and Conditions of service.
        </p>

        <h2 className="text-lg font-bold text-slate-800">1. Permitted Use</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Our online resume builder, downloadable PDF structures, blog publications, and educational advice panels are provided 100% free of charge for individual personal job-seeking efforts. Commercial reproduction, scraping, reselling, or redistribution of our templates, database elements, or blog materials is strictly prohibited without explicit written consent.
        </p>

        <h2 className="text-lg font-bold text-slate-800">2. Limitation of Liability</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          While we strive to ensure that all PDF templates are completely ATS-compliant and our structural guides are highly effective, we make no guarantees regarding interview callbacks, employment offers, or hiring outcomes. All services are provided on an 'as is' and 'as available' basis.
        </p>

        <h2 className="text-lg font-bold text-slate-800">3. Data Integrity & Loss</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Because we rely on local client browser directories to persist resume configurations, we are not responsible for any accidental deletion of resume information resulting from cleared cookies, private window sessions, or browser updates. We recommend utilizing the 'Export JSON' option to back up your text details regularly.
        </p>
      </article>
    </div>
  );
}

// ================= DISCLAIMER VIEW =================
export function DisclaimerView({ onNavigate }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="disclaimer-page">
      <Breadcrumbs items={[{ label: "Disclaimer", active: true }]} onNavigate={onNavigate} />

      <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-md space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Disclaimer</h1>
        <p className="text-slate-500 text-xs">Last Updated: July 11, 2026</p>

        <p className="text-slate-600 text-sm leading-relaxed">
          The information contained on the Easy Resume Builder website (the 'Service') is for general guidance and informational purposes only.
        </p>

        <h2 className="text-lg font-bold text-slate-800">No Professional Advice</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          The career advisory tips, resumes examples, resume samples, and blog articles provided here do not constitute professional legal, financial, or formal employment guidance. Job standards, hiring regulations, and corporate selection practices vary widely by industry and region. Seek professional advice tailored to your specific circumstances if needed.
        </p>

        <h2 className="text-lg font-bold text-slate-800">No Warranties</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          We make no warranties, representations, or guarantees regarding the completeness, security, or accuracy of the information displayed. We do not guarantee that your downloaded resumes will pass every corporate screening tool or secure placement offers.
        </p>
      </article>
    </div>
  );
}

// ================= COOKIE POLICY VIEW =================
export function CookiePolicyView({ onNavigate }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="cookie-page">
      <Breadcrumbs items={[{ label: "Cookie Policy", active: true }]} onNavigate={onNavigate} />

      <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-md space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Cookie Policy</h1>
        <p className="text-slate-500 text-xs">Last Updated: July 11, 2026</p>

        <p className="text-slate-600 text-sm leading-relaxed">
          This is the Cookie Policy for Easy Resume Builder, accessible from easyresumebuilder.com. To ensure complete transparency, this policy details how we and our advertising partners use cookies.
        </p>

        <h2 className="text-lg font-bold text-slate-800">How We Use Cookies</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          We use cookies for a variety of reasons detailed below. In most cases, there are no industry-standard choices for disabling cookies without completely shutting down the features and functionality they add to our platforms. It is highly recommended that you leave cookies active if you are unsure whether you need them or not.
        </p>

        <h2 className="text-lg font-bold text-slate-800">Third-Party Cookies (Google AdSense)</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          This site uses Google AdSense to serve highly relevant, contextual ads to our visitors. AdSense uses third-party cookies (such as the DoubleClick cookie) to track user trends across other web networks to serve ads that match your interests. You can easily opt out of personalized tracking in your Google Account Settings or by visiting aboutads.info.
        </p>
      </article>
    </div>
  );
}

// ================= EDITORIAL POLICY VIEW =================
export function EditorialPolicyView({ onNavigate }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="editorial-page">
      <Breadcrumbs items={[{ label: "Editorial Policy", active: true }]} onNavigate={onNavigate} />

      <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-md space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Editorial Policy</h1>
        <p className="text-slate-500 text-xs">Last Updated: July 11, 2026</p>

        <p className="text-slate-600 text-sm leading-relaxed">
          At Easy Resume Builder, we are committed to providing the highest quality of informational integrity, technical depth, and actionable accuracy across our entire catalog of career guides, resume samples, templates advice, and professional insights.
        </p>

        <h2 className="text-lg font-bold text-slate-800">1. Original & Expert Content Creation</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Every guide, tutorial, and resume example listed on our portal is hand-crafted and manually compiled by our editorial panel of recruitment consultants, human resources directors, and industry experts. We strictly forbid scraped, automated, or duplicate content. This standard ensures high utility for our audience and complies with premium AdSense quality guidelines.
        </p>

        <h2 className="text-lg font-bold text-slate-800">2. Periodic Reviews & Updates</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          The corporate landscape and hiring technology (like ATS filters) evolve constantly. Our expert career advisors review our entire database of articles and resume templates bi-annually to guarantee they match modern screening standards.
        </p>
      </article>
    </div>
  );
}

// ================= SITEMAP VIEW =================
export function SitemapView({ onNavigate }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="sitemap-page">
      <Breadcrumbs items={[{ label: "Sitemap", active: true }]} onNavigate={onNavigate} />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-md">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">HTML Site Map</h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">Explore all the interactive tools, expert articles, policies, and industry resume examples available on Easy Resume Builder.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Core Tools */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-600 mr-2"></span> Core Platforms
            </h2>
            <ul className="space-y-2 text-sm text-slate-600 pl-4 list-disc">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-blue-600 cursor-pointer text-left">
                  Home Landing Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("builder")} className="hover:text-blue-600 cursor-pointer text-left font-semibold text-blue-600">
                  Online Resume Builder Tool
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("faq")} className="hover:text-blue-600 cursor-pointer text-left">
                  FAQ Accordion & Answers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("search")} className="hover:text-blue-600 cursor-pointer text-left">
                  Live Search Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Industry Resume Examples */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-600 mr-2"></span> Resume Examples
            </h2>
            <ul className="space-y-2 text-sm text-slate-600 pl-4 list-disc">
              <li>
                <button onClick={() => onNavigate("examples")} className="hover:text-blue-600 cursor-pointer text-left font-medium">
                  All Resume Samples Index
                </button>
              </li>
              {RESUME_EXAMPLES.map((ex) => (
                <li key={ex.slug}>
                  <button onClick={() => onNavigate("examples-post", ex.slug)} className="hover:text-blue-600 cursor-pointer text-left text-xs">
                    {ex.role} Resume Sample
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Articles */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-600 mr-2"></span> Career Guides & Blog
            </h2>
            <ul className="space-y-2 text-sm text-slate-600 pl-4 list-disc">
              <li>
                <button onClick={() => onNavigate("blog")} className="hover:text-blue-600 cursor-pointer text-left font-medium">
                  Blog Articles Index
                </button>
              </li>
              {BLOG_POSTS.map((bp) => (
                <li key={bp.slug}>
                  <button onClick={() => onNavigate("blog-post", bp.slug)} className="hover:text-blue-600 cursor-pointer text-left text-xs truncate max-w-[200px]">
                    {bp.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Compliance and Info */}
          <div className="space-y-3 lg:col-span-3">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-600 mr-2"></span> Legal, Policy & Author Tree
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-slate-600 pl-4 list-disc">
              <div>
                <button onClick={() => onNavigate("about")} className="hover:text-blue-600 cursor-pointer text-left">About Us Page</button>
              </div>
              <div>
                <button onClick={() => onNavigate("contact")} className="hover:text-blue-600 cursor-pointer text-left">Contact Form</button>
              </div>
              <div>
                <button onClick={() => onNavigate("privacy")} className="hover:text-blue-600 cursor-pointer text-left">Privacy Guidelines</button>
              </div>
              <div>
                <button onClick={() => onNavigate("terms")} className="hover:text-blue-600 cursor-pointer text-left">Terms of Service</button>
              </div>
              <div>
                <button onClick={() => onNavigate("disclaimer")} className="hover:text-blue-600 cursor-pointer text-left">Disclaimer Notice</button>
              </div>
              <div>
                <button onClick={() => onNavigate("cookie")} className="hover:text-blue-600 cursor-pointer text-left">Cookie Policy Page</button>
              </div>
              <div>
                <button onClick={() => onNavigate("editorial")} className="hover:text-blue-600 cursor-pointer text-left">Editorial Guidelines</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= 404 VIEW =================
export function NotFoundView({ onNavigate }: PageProps) {
  return (
    <div className="max-w-md mx-auto text-center px-4 py-16 space-y-6" id="notfound-page">
      <div className="bg-amber-100 text-amber-600 p-4 rounded-full w-fit mx-auto">
        <AlertTriangle className="h-16 w-16" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404 - Profile Not Found</h1>
      <p className="text-slate-500 leading-relaxed">Oops! It looks like this section of your resume was filtered out by our routing filters. The URL you tried to access doesn't exist.</p>
      <div className="flex justify-center space-x-3 pt-4">
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors"
        >
          <Home className="h-4 w-4 mr-1.5" /> Return Home
        </button>
        <button
          onClick={() => onNavigate("builder")}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
        >
          Start Builder
        </button>
      </div>
    </div>
  );
}

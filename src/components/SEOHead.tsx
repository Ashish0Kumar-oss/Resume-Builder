import { useEffect } from "react";
import { PageId, BlogPost, ResumeExample } from "../types";

interface SEOHeadProps {
  page: PageId;
  blogPost?: BlogPost;
  examplePost?: ResumeExample;
  searchQuery?: string;
}

export default function SEOHead({ page, blogPost, examplePost, searchQuery }: SEOHeadProps) {
  useEffect(() => {
    // 1. Determine Title and Meta Description
    let title = "100% Free Resume Builder | No Signup, No Watermark, ATS Friendly";
    let description = "Build your professional resume instantly. Choose from 10 customizable, ATS-friendly templates. Easy drag-and-drop, instant PDF download. 100% free forever.";
    let canonical = "https://easyresumebuilder.com";
    let keywords = "free resume builder, resume maker, online resume, ats friendly resume, professional resume templates, no signup resume builder";
    let schemas: any[] = [];

    // Base Website & Organization Schemas
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Easy Resume Builder",
      "url": "https://easyresumebuilder.com",
      "logo": "https://easyresumebuilder.com/logo.png",
      "sameAs": [
        "https://twitter.com/easyresumebuilder",
        "https://linkedin.com/company/easyresumebuilder"
      ]
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Easy Resume Builder",
      "url": "https://easyresumebuilder.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://easyresumebuilder.com/#search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    schemas.push(orgSchema, websiteSchema);

    switch (page) {
      case "builder":
        title = "Build Your Professional Resume Free | Easy Resume Builder";
        description = "Create and customize your professional resume with our easy builder. Select from 10 ATS-compliant templates, adjust fonts, sizes, and colors. Download free PDF.";
        canonical = "https://easyresumebuilder.com/#builder";
        break;

      case "blog":
        title = "Career Advice Blog & Resume Guides | Easy Resume Builder";
        description = "Explore professional resume writing guides, templates advice, HR interview preparation tips, and latest job-seeking insights from our experts.";
        canonical = "https://easyresumebuilder.com/#blog";
        break;

      case "blog-post":
        if (blogPost) {
          title = `${blogPost.title} | Career Advice Blog`;
          description = blogPost.summary;
          canonical = `https://easyresumebuilder.com/#blog/${blogPost.slug}`;
          keywords = `${blogPost.category.toLowerCase()}, resume guide, career coach advice, resume examples`;

          // Article Schema
          schemas.push({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": blogPost.title,
            "description": blogPost.summary,
            "datePublished": blogPost.publishedDate,
            "author": {
              "@type": "Person",
              "name": blogPost.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Easy Resume Builder",
              "logo": {
                "@type": "ImageObject",
                "url": "https://easyresumebuilder.com/logo.png"
              }
            }
          });

          // FAQ Schema for Blog Post
          if (blogPost.faqs && blogPost.faqs.length > 0) {
            schemas.push({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": blogPost.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            });
          }
        }
        break;

      case "examples":
        title = "Free Resume Examples & Industry Specific Samples | Easy Resume Builder";
        description = "Review our collection of professional resume examples for Software Engineers, Students, Nurses, Teachers, Accountants, HRs, and more. Customizable & downloadable.";
        canonical = "https://easyresumebuilder.com/#examples";
        break;

      case "examples-post":
        if (examplePost) {
          title = `${examplePost.title} - Free Sample & Template | Easy Resume Builder`;
          description = examplePost.introduction;
          canonical = `https://easyresumebuilder.com/#examples/${examplePost.slug}`;
          keywords = `${examplePost.role.toLowerCase()} resume, professional ${examplePost.role.toLowerCase()} sample, free pdf template`;

          // Custom Schema for Product/Sample
          schemas.push({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": examplePost.title,
            "headline": examplePost.title,
            "description": examplePost.introduction,
            "genre": "Resume Example",
            "creator": {
              "@type": "Organization",
              "name": "Easy Resume Builder"
            }
          });

          // FAQ Schema for Example Post
          if (examplePost.faqs && examplePost.faqs.length > 0) {
            schemas.push({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": examplePost.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            });
          }
        }
        break;

      case "about":
        title = "About Our Mission & Story | Easy Resume Builder";
        description = "Learn why we built the world's best 100% free resume builder. Our mission is to democratize career success with zero paywalls and complete data privacy.";
        canonical = "https://easyresumebuilder.com/#about";
        break;

      case "contact":
        title = "Contact Us | Easy Resume Builder Help Desk";
        description = "Have questions, suggestions, or advertising proposals? Get in touch with our editorial and development team. We reply within 24 hours.";
        canonical = "https://easyresumebuilder.com/#contact";
        break;

      case "faq":
        title = "Frequently Asked Questions (FAQ) | Easy Resume Builder";
        description = "Got questions about PDF downloads, ATS compatibility, data safety, or templates customization? Find comprehensive expert answers here.";
        canonical = "https://easyresumebuilder.com/#faq";
        break;

      case "privacy":
        title = "Privacy Policy | Your Data Security Safeguarded";
        description = "Our complete Privacy Policy explains our offline-first local storage model. Your personal details never leave your device. Safe and AdSense approved.";
        canonical = "https://easyresumebuilder.com/#privacy";
        break;

      case "terms":
        title = "Terms of Service & Usage Guidelines | Easy Resume Builder";
        description = "Read the terms and conditions for using our free resume builder, downloadable templates, and resource assets legally and safely.";
        canonical = "https://easyresumebuilder.com/#terms";
        break;

      case "disclaimer":
        title = "Legal Disclaimer & Liability Notice | Easy Resume Builder";
        description = "Review our liability limits, information accuracy warranties, and Google AdSense advertisement disclosure documentation.";
        canonical = "https://easyresumebuilder.com/#disclaimer";
        break;

      case "cookie":
        title = "Cookie Policy & Advertising Choices | Easy Resume Builder";
        description = "Learn how we and our third-party advertising network partners (like Google AdSense) utilize cookies to tailor your experience.";
        canonical = "https://easyresumebuilder.com/#cookie";
        break;

      case "editorial":
        title = "Editorial Guidelines & Accuracy Commitment | Easy Resume Builder";
        description = "Our editorial policy outlines our high standards of research, manual review, and accuracy guarantees across all our career articles.";
        canonical = "https://easyresumebuilder.com/#editorial";
        break;

      case "sitemap":
        title = "HTML Sitemap - Complete Navigation Tree | Easy Resume Builder";
        description = "Access every page, blog post, resume example, resource guide, policy document, and tool configuration instantly from our structured HTML sitemap.";
        canonical = "https://easyresumebuilder.com/#sitemap";
        break;

      case "search":
        title = searchQuery ? `Search results for "${searchQuery}" | Easy Resume Builder` : "Search Articles & Examples | Easy Resume Builder";
        description = "Search our complete career database, blog archives, resume samples, templates, and FAQ pages instantly with our live search tool.";
        canonical = "https://easyresumebuilder.com/#search";
        break;
    }

    // 2. Set DOM Head Elements
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);

    // Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonical);

    // Inject JSON-LD schemas
    const existingScripts = document.querySelectorAll('script[id^="json-ld-schema"]');
    existingScripts.forEach((s) => s.remove());

    schemas.forEach((schema, idx) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `json-ld-schema-${idx}`;
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [page, blogPost, examplePost, searchQuery]);

  return null; // This component handles side effects only
}

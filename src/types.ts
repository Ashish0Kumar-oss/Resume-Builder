export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  github: string;
  linkedin: string;
  photo: string;
  photoOn: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string; // "Beginner" | "Intermediate" | "Expert" | ""
}

export interface Project {
  id: string;
  title: string;
  role: string;
  technologies: string;
  link: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: string; // "Native" | "Fluent" | "Professional" | "Conversational" | ""
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  contact: string;
}

export interface Interest {
  id: string;
  name: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  title: string;
  items: CustomSectionItem[];
  enabled: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  references: Reference[];
  interests: Interest[];
  customSection: CustomSection;
}

export interface CustomizationSettings {
  templateId: string;
  accentColor: string; // hex code or tailwind color class
  fontFamily: string; // "inter" | "space" | "playfair" | "mono" | "merriweather" | "roboto" | "lato"
  fontSize: "sm" | "md" | "lg";
  lineSpacing: "tight" | "normal" | "relaxed";
  pageMargins: "compact" | "normal" | "spacious";
  sectionOrder: string[]; // List of section IDs to control ordering
}

export type PageId =
  | "home"
  | "builder"
  | "blog"
  | "blog-post"
  | "examples"
  | "examples-post"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "disclaimer"
  | "cookie"
  | "editorial"
  | "faq"
  | "sitemap"
  | "search"
  | "archive"
  | "author";

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedDate: string;
  readTime: string;
  category: string;
  author: string;
  toc: string[];
  content: string[]; // Paragraphs, markdown, or structured headings
  faqs: { question: string; answer: string }[];
}

export interface ResumeExample {
  slug: string;
  title: string;
  role: string;
  introduction: string;
  skills: string[];
  sampleResume: ResumeData;
  tips: string[];
  faqs: { question: string; answer: string }[];
}

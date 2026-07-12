import { ResumeData, BlogPost, ResumeExample } from "./types";

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "Alexander Wright",
    title: "Senior Full Stack Engineer",
    email: "alexander.wright@email.com",
    phone: "+1 (555) 019-2834",
    website: "https://alexwright.dev",
    location: "San Francisco, CA",
    github: "github.com/alexwright",
    linkedin: "linkedin.com/in/alexwright",
    photo: "",
    photoOn: false,
  },
  summary: "Results-driven Senior Full Stack Engineer with over 8 years of experience building scalable web applications and leading high-performance engineering teams. Expert in React, Node.js, TypeScript, and modern cloud architectures. Proven track record of improving application performance by up to 40% and mentoring junior developers.",
  experiences: [
    {
      id: "exp-1",
      company: "TechNova Solutions",
      role: "Lead Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      current: true,
      description: "• Spearheaded migration of legacy monolithic system to a React & Next.js micro-frontend architecture, reducing initial bundle size by 35%.\n• Built and managed a team of 6 engineers to deliver a real-time analytics dashboard used by over 50k enterprise clients.\n• Optimised database queries and API endpoints in Node.js, leading to a 50% decrease in response latency."
    },
    {
      id: "exp-2",
      company: "Innovate Labs",
      role: "Senior Software Engineer",
      location: "Austin, TX",
      startDate: "2018-06",
      endDate: "2022-02",
      current: false,
      description: "• Developed robust RESTful APIs in Express and PostgreSQL supporting 10m+ monthly active requests.\n• Led the implementation of continuous integration/continuous deployment (CI/CD) pipelines, cutting deployment failure rates by 25%.\n• Collaborated closely with product and UX teams to build responsive web interfaces adhering strictly to accessibility standards."
    }
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Stanford University",
      degree: "Master of Science",
      fieldOfStudy: "Computer Science",
      location: "Stanford, CA",
      startDate: "2016-09",
      endDate: "2018-05",
      description: "Specialisation in Software Systems. Graduated with honors (GPA: 3.9/4.0)."
    },
    {
      id: "edu-2",
      institution: "University of Texas",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      location: "Austin, TX",
      startDate: "2012-09",
      endDate: "2016-05",
      description: "Active member of ACM student chapter and competitive programming team."
    }
  ],
  skills: [
    { id: "sk-1", name: "TypeScript", level: "Expert" },
    { id: "sk-2", name: "React / Redux / Next.js", level: "Expert" },
    { id: "sk-3", name: "Node.js / Express", level: "Expert" },
    { id: "sk-4", name: "PostgreSQL / MongoDB", level: "Intermediate" },
    { id: "sk-5", name: "Docker & Kubernetes", level: "Intermediate" },
    { id: "sk-6", name: "AWS (S3, EC2, RDS)", level: "Intermediate" },
    { id: "sk-7", name: "System Architecture", level: "Expert" },
    { id: "sk-8", name: "Agile Methodologies", level: "Expert" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Enterprise Sync Platform",
      role: "Architect & Sole Developer",
      technologies: "TypeScript, WebSocket, React, Redis",
      link: "github.com/alexwright/sync-platform",
      description: "Built a high-performance offline-first data synchronisation library supporting real-time conflict resolution and offline storage across distributed clients."
    },
    {
      id: "proj-2",
      title: "Open Source UI Library",
      role: "Maintainer & Contributor",
      technologies: "React, Tailwind CSS, Radix UI",
      link: "github.com/alexwright/accessible-ui",
      description: "Created a fully responsive, accessible component library with WCAG AA compliance, achieving over 10k stars on GitHub."
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "2024-01",
      link: ""
    },
    {
      id: "cert-2",
      title: "Certified ScrumMaster (CSM)",
      issuer: "Scrum Alliance",
      date: "2021-08",
      link: ""
    }
  ],
  languages: [
    { id: "lang-1", language: "English", proficiency: "Native" },
    { id: "lang-2", language: "Spanish", proficiency: "Conversational" }
  ],
  references: [
    {
      id: "ref-1",
      name: "Dr. Sarah Jenkins",
      title: "VP of Engineering",
      company: "TechNova Solutions",
      contact: "sarah.jenkins@technova.com"
    }
  ],
  interests: [
    { id: "int-1", name: "Open Source Contribution" },
    { id: "int-2", name: "Technical Writing" },
    { id: "int-3", name: "Backpacking & Hiking" }
  ],
  customSection: {
    title: "Publications",
    enabled: true,
    items: [
      {
        id: "cust-1",
        title: "Optimising React Rendering Engine",
        subtitle: "Technical Publication - dev.to",
        date: "2023-11",
        description: "An in-depth analysis of virtual DOM diffing algorithms and techniques to achieve 60fps renders in high-volume real-time financial dashboards."
      }
    ]
  }
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-write-a-resume",
    title: "How to Write a Professional Resume: The Ultimate Step-by-Step Guide",
    summary: "Learn how to write an impactful resume that passes ATS filters, showcases your key achievements, and secures interview callbacks in today's competitive job market.",
    publishedDate: "2026-05-15",
    readTime: "8 min read",
    category: "Career Advice",
    author: "Editorial Team",
    toc: [
      "1. Understand the Goal of Your Resume",
      "2. Choose the Right Format",
      "3. Structure Your Contact Information",
      "4. Craft a Compelling Career Summary",
      "5. Focus on Metrics in Your Experience",
      "6. Match Skills to the Job Description",
      "7. Highlight Your Education and Certificates"
    ],
    content: [
      "Your resume is your personal marketing document. In today's crowded job market, recruitment managers spend an average of six seconds scanning a resume before deciding whether to advance it to the next round. This means your layout must be clean, structured, and instantly highlight your core values.",
      "First, let's look at formatting. The chronological layout is the most widely trusted and highly recommended for professionals with a consistent career trajectory. It places your most recent experience first, guiding recruiters clearly through your growth. If you are switching industries, consider a hybrid or functional format.",
      "When detailing your experience, the absolute biggest mistake is listing tasks instead of results. Instead of writing 'Responsible for writing software code,' write 'Engineered high-throughput cloud services that reduced data synchronisation time by 30%.' Use action verbs, name the specific tools you used, and provide exact percentages or numbers whenever possible.",
      "Finally, customize your skills and professional summary for every role you apply for. Highlight technical qualifications first, then follow up with strong interpersonal competencies. Keep your resume length to 1-2 pages maximum, and export it as an ATS-compliant PDF to keep your formatting locked in."
    ],
    faqs: [
      {
        question: "How long should my resume be?",
        answer: "A standard rule of thumb is one page for every 10 years of experience. Most recruiters prefer a concise one-page resume for junior to mid-level roles, and up to two pages for executive positions."
      },
      {
        question: "Should I include my full address?",
        answer: "No, just listing your City and State is sufficient and highly recommended to protect your privacy."
      }
    ]
  },
  {
    slug: "resume-mistakes",
    title: "Top 10 Resume Mistakes That Are Costing You Job Offers",
    summary: "Discover the most common mistakes job seekers make on their resumes and learn how to fix them to boost your interview callback rate.",
    publishedDate: "2026-05-20",
    readTime: "6 min read",
    category: "Resume Tips",
    author: "Career Coach",
    toc: [
      "1. Grammatical Errors and Typos",
      "2. Using an Unprofessional Email Address",
      "3. Writing an Outdated 'Career Objective'",
      "4. Listing Responsibilities Instead of Achievements",
      "5. Poor Formatting and Heavy Visual Layouts",
      "6. Including Irrelevant Hobbies"
    ],
    content: [
      "A single typo can immediately filter out a highly qualified candidate. It signals a lack of attention to detail that employers fear will carry over into your daily tasks. Proofread your resume multiple times, and ask a colleague or use free online tools to check for grammatical slips.",
      "Avoid old 'Objective' statements like 'Seeking a challenging role in a growth-oriented company.' Modern resumes use a 'Professional Summary' that focuses entirely on what you can offer the company, not what you want from them. Explain in 3-4 sentences your core strengths and achievements.",
      "Ensure you do not use complex graphics, text boxes, or multiple columns that confuse applicant tracking systems (ATS). Keep your layout clean and linear. Simple fonts like Inter, Roboto, or Arial are safe and professional."
    ],
    faqs: [
      {
        question: "Is it okay to use a resume template with columns?",
        answer: "While multi-column resumes look beautiful, very complex layouts can confuse older ATS scanners. A single-column, well-spaced format is always the safest bet."
      }
    ]
  },
  {
    slug: "ats-resume-guide",
    title: "The Comprehensive Guide to ATS-Friendly Resumes",
    summary: "What is an ATS and how does it screen your application? Learn the formatting secrets and keyword strategies to bypass tracking algorithms.",
    publishedDate: "2026-05-28",
    readTime: "7 min read",
    category: "ATS Friendly",
    author: "Recruitment Specialist",
    toc: [
      "1. What is an Applicant Tracking System (ATS)?",
      "2. Font Choices and Font Sizes",
      "3. Parsing Tables, Graphics, and Icons",
      "4. Standard Section Headers",
      "5. Keywords Optimization"
    ],
    content: [
      "Applicant Tracking Systems (ATS) are software applications used by over 95% of Fortune 500 companies to automatically collect, scan, and rank resumes based on job descriptions.",
      "To ensure your resume parses perfectly, avoid placing critical information in headers or footers, as some older scanners completely skip these sections. Use standard fonts, avoid symbols or complex graphic charts, and label your sections with standard headers like 'Experience', 'Education', and 'Skills' rather than creative alternatives like 'Where I've Been'."
    ],
    faqs: [
      {
        question: "Can an ATS parse PDF files?",
        answer: "Yes! Modern ATS software parses PDF files perfectly, provided the PDF contains selectable text rather than flat scanned images."
      }
    ]
  },
  {
    slug: "resume-summary-examples",
    title: "45+ Professional Resume Summary Examples for Every Industry",
    summary: "Struggling to write your resume summary? Review these proven, high-converting examples tailored for tech, finance, education, healthcare, and creative fields.",
    publishedDate: "2026-06-02",
    readTime: "9 min read",
    category: "Resume Summary",
    author: "Senior Recruiter",
    toc: [
      "1. What Makes a Resume Summary High-Converting?",
      "2. Tech Industry Examples",
      "3. Healthcare & Nursing Examples",
      "4. Finance & Accounting Examples",
      "5. Sales & Marketing Examples"
    ],
    content: [
      "Your resume summary is the hook of your document. It is a 3-4 sentence paragraph highlighting your years of experience, primary areas of expertise, and your most significant achievement. It should immediately make the reader want to scroll down to read your experience section.",
      "For example, a high-converting software engineer summary might read: 'Innovative Software Engineer with 5+ years of experience designing and deploying high-availability React applications. Championed migration to cloud microservices, saving $20k in monthly infrastructure costs. Expert in JavaScript, Node.js, and AWS.'"
    ],
    faqs: [
      {
        question: "Should entry-level candidates use a summary?",
        answer: "Yes, but focus it on your academic honors, relevant projects, internships, and core soft skills rather than extensive work experience."
      }
    ]
  },
  {
    slug: "resume-skills-examples",
    title: "Top Skills to Put on Your Resume in 2026 (Hard & Soft)",
    summary: "Discover the highly sought-after hard and soft skills that employers are actively looking for across multiple sectors, and how to represent them on your resume.",
    publishedDate: "2026-06-08",
    readTime: "6 min read",
    category: "Resume Skills",
    author: "HR Advisor",
    toc: [
      "1. Hard Skills vs. Soft Skills",
      "2. Top Technical Skills",
      "3. Crucial Interpersonal Skills",
      "4. How to Structure Your Skills Section"
    ],
    content: [
      "A balanced combination of hard (technical) and soft (interpersonal) skills is the ideal recipe. Hard skills prove you can perform the job tasks, while soft skills show you will collaborate effectively with colleagues and clients.",
      "List hard skills in a dedicated, easy-to-read section. Include soft skills in your summary and contextually weave them into your work experience bullet points rather than just listing 'excellent communication' in a bulleted list."
    ],
    faqs: [
      {
        question: "How many skills should I list on my resume?",
        answer: "Aim for 8 to 15 relevant hard and soft skills to keep your resume focused and highly readable."
      }
    ]
  },
  {
    slug: "resume-for-freshers",
    title: "How to Build a Winner Resume as a Fresher with No Experience",
    summary: "Just graduated and have no corporate experience? Learn how to leverage internships, college projects, leadership positions, and academic achievements.",
    publishedDate: "2026-06-12",
    readTime: "7 min read",
    category: "Freshers",
    author: "University Career Advisor",
    toc: [
      "1. Shift the Focus to Academic Accomplishments",
      "2. List Internships and Volunteer Work",
      "3. Highlight Extracurricular Leadership",
      "4. Detail Relevant Coursework and Projects"
    ],
    content: [
      "If you are a fresher, your academic background and project history are your main strengths. Move your education section to the top, and include details about relevant courses, high GPAs (if above 3.5), and any research projects.",
      "Be sure to describe independent study projects or open-source contributions. This demonstrates initiative, passion, and proof of your capabilities to potential hiring managers."
    ],
    faqs: [
      {
        question: "Can I list volunteer work as experience?",
        answer: "Absolutely! Volunteer work shows commitment, responsibility, and teamwork, which are highly valued qualities in junior employees."
      }
    ]
  },
  {
    slug: "resume-for-students",
    title: "A Student's Guide to Balancing Part-Time Work and Academic Resumes",
    summary: "A practical guide for high school and university students looking to create a resume for internships, part-time jobs, or first professional roles.",
    publishedDate: "2026-06-16",
    readTime: "5 min read",
    category: "Students",
    author: "Student Counsellor",
    toc: [
      "1. Choosing the Student Resume Layout",
      "2. Highlighting Your Academic Strengths",
      "3. Presenting Summer Internships and Freelance Tasks"
    ],
    content: [
      "As a student, your resume should tell a story of ambition and quick learning. Emphasize your ability to multitask and manage deadlines by highlighting school leadership, club memberships, and sports achievements."
    ],
    faqs: [
      {
        question: "Should I include my high school on a university resume?",
        answer: "If you are in your first or second year of university, yes. By your third year, you should phase it out to focus purely on university activities."
      }
    ]
  },
  {
    slug: "software-engineer-resume-guide",
    title: "Software Engineer Resume Guide: Stand Out in Tech",
    summary: "A comprehensive guide on creating a highly technical, ATS-compliant software developer resume that showcases your codebase ownership, systems design, and stack expertise.",
    publishedDate: "2026-06-20",
    readTime: "8 min read",
    category: "Tech Careers",
    author: "Engineering Lead",
    toc: [
      "1. How to Represent Your Technology Stack",
      "2. Documenting System Performance & Metrics",
      "3. Spotlighting Your GitHub and Personal Portfolio"
    ],
    content: [
      "Hiring managers in software engineering want to see what you built, how you built it, and the tangible impact it had. Be specific about your contributions to performance, scale, latency, and engineering velocity."
    ],
    faqs: [
      {
        question: "Should I include side projects?",
        answer: "Yes, especially if they are hosted, have active users, or demonstrate advanced technologies that you don't use in your day job."
      }
    ]
  },
  {
    slug: "teacher-resume-guide",
    title: "Teacher Resume Guide: Crafting the Perfect Lesson",
    summary: "Learn how to highlight lesson planning, classroom management, standardized testing results, and special education experience in your teacher resume.",
    publishedDate: "2026-06-25",
    readTime: "6 min read",
    category: "Education",
    author: "Principal Jenkins",
    toc: [
      "1. Showing Classroom Growth Metrics",
      "2. Detailing Certifications and State Licensure",
      "3. Highlighting Lesson Planning and Educational Tech"
    ],
    content: [
      "An effective educator resume highlights student engagement, academic growth, and integration of educational technology. Clearly document your licenses, teaching credentials, and subject specialties."
    ],
    faqs: [
      {
        question: "Do teachers need to include technology skills?",
        answer: "Yes! Modern teaching relies heavily on digital classrooms, LMS platforms (Canvas, Google Classroom), and interactive tools."
      }
    ]
  },
  {
    slug: "nurse-resume-guide",
    title: "Nurse Resume Guide: Showcasing Clinical Excellence",
    summary: "Step-by-step tips for registered nurses (RN) and clinical specialists to document critical care, patient outcomes, and medical licensing.",
    publishedDate: "2026-06-30",
    readTime: "7 min read",
    category: "Healthcare",
    author: "Director of Nursing",
    toc: [
      "1. Placements of Licensing and Certifications",
      "2. Detailing Clinical Rotations and Specialized Care",
      "3. Documenting Patient Success and Safety Metrics"
    ],
    content: [
      "Place your licenses (RN, BSN, BLS, ACLS) right at the very top of your resume. Healthcare recruiters screen for licensing compliance before checking anything else. Describe your clinical rotations, department experience, and average caseload."
    ],
    faqs: [
      {
        question: "Should I list hospital bed capacity?",
        answer: "Yes, mentioning the size and patient volume of your departments provides valuable context regarding your ability to manage high-stress situations."
      }
    ]
  },
  {
    slug: "accountant-resume-guide",
    title: "Accountant Resume Guide: Balancing Financial Careers",
    summary: "How to detail tax preparation, audit compliance, financial reporting, and ERP software tools on a professional accountant resume.",
    publishedDate: "2026-07-02",
    readTime: "6 min read",
    category: "Finance",
    author: "CPA Auditor",
    toc: [
      "1. Showcasing CPA and Licensure Status",
      "2. Detailing Budgeting and Cost Reduction Achievements",
      "3. Listing ERP and Accounting Software Mastery"
    ],
    content: [
      "Finance resumes thrive on precision and metrics. Emphasize your audit success rates, amount of corporate budgets managed, and your ability to optimize tax processes to save expenditures."
    ],
    faqs: [
      {
        question: "Which software should accountants highlight?",
        answer: "Excel is a must, followed by major ERP and tax tools like SAP, QuickBooks, NetSuite, or Sage."
      }
    ]
  },
  {
    slug: "hr-resume-guide",
    title: "Human Resources Resume: Recruitment & Culture",
    summary: "Learn how to structure your HR resume to focus on talent acquisition metrics, employee retention rates, and policy development.",
    publishedDate: "2026-07-05",
    readTime: "6 min read",
    category: "Human Resources",
    author: "HR Director",
    toc: [
      "1. Presenting Talent Acquisition Metrics",
      "2. Highlighting Employee Relations and Mediation",
      "3. HRIS Tools and Policy Accomplishments"
    ],
    content: [
      "As an HR professional, you are expected to know exactly what makes a resume stand out. Lead by example. Build a highly structured, grammatically perfect resume showcasing your talent pipeline development and corporate policy improvements."
    ],
    faqs: [
      {
        question: "Should I include my SHRM certification?",
        answer: "Yes, PHR or SHRM-CP certifications are highly sought-after and should be prominently listed in your resume summary and education/certificates section."
      }
    ]
  },
  {
    slug: "marketing-resume-guide",
    title: "Marketing Resume Guide: Driving Audience Growth",
    summary: "How to showcase your SEO, social media ad performance, campaign management, and ROI achievements on a marketing resume.",
    publishedDate: "2026-07-08",
    readTime: "7 min read",
    category: "Marketing",
    author: "Growth Marketer",
    toc: [
      "1. Placing ROI and Ad Spend Metrics First",
      "2. Highlighting Specialized Digital Channels",
      "3. Marketing Tools Stack Overview"
    ],
    content: [
      "Marketers are storytellers who sell products. Use those same skills to market yourself. Focus your bullet points on campaign performance metrics: conversions, click-through rates (CTR), client acquisition costs (CAC), and organic traffic growth."
    ],
    faqs: [
      {
        question: "Is a creative layout good for marketing?",
        answer: "A subtle touch of design is great, but do not sacrifice readability or ATS compliance for excessive graphic design."
      }
    ]
  },
  {
    slug: "sales-resume-guide",
    title: "Sales Resume Guide: Crushing Your Quotas",
    summary: "Tips for sales executives, account managers, and business development reps to showcase quota attainment, CRM mastery, and negotiation skills.",
    publishedDate: "2026-07-10",
    readTime: "6 min read",
    category: "Sales",
    author: "VP of Sales",
    toc: [
      "1. Formatting Your Quota Attainment Percentages",
      "2. Detailing Pipeline Management and Deal Sizes",
      "3. CRM and Professional Negotiation Background"
    ],
    content: [
      "Sales is purely numbers-driven. If you hit 120% of your quota, make sure it is the very first bullet point under your experience. List your typical deal size (ACV) and your proficiency in Salesforce or other CRM platforms."
    ],
    faqs: [
      {
        question: "Should I list commission earnings?",
        answer: "Instead of direct earnings, represent it as 'Exceeded sales targets by an average of 15% quarter-over-quarter.'"
      }
    ]
  }
];

export const RESUME_EXAMPLES: ResumeExample[] = [
  {
    slug: "software-engineer-resume",
    title: "Software Engineer Resume Example",
    role: "Software Engineer",
    introduction: "This comprehensive resume example is tailor-made for Software Engineers, Full Stack Developers, and Frontend/Backend specialists. It highlights clean code standards, technical stack categorization, and project metrics.",
    skills: ["TypeScript", "React", "Node.js", "Docker", "AWS", "CI/CD", "PostgreSQL", "System Design"],
    sampleResume: {
      personalInfo: {
        name: "David Chen",
        title: "Software Engineer",
        email: "david.chen@email.com",
        phone: "+1 (555) 012-3456",
        website: "https://davidchen.dev",
        location: "Seattle, WA",
        github: "github.com/davidchen",
        linkedin: "linkedin.com/in/davidchen",
        photo: "",
        photoOn: false,
      },
      summary: "Detail-oriented Software Engineer with 4+ years of professional experience developing responsive web applications and scalable cloud-native backends. Passionate about software architecture, test-driven development, and developer tooling.",
      experiences: [
        {
          id: "sw-exp-1",
          company: "CloudScale Systems",
          role: "Software Engineer II",
          location: "Seattle, WA",
          startDate: "2022-01",
          endDate: "Present",
          current: true,
          description: "• Designed and engineered scalable microservices handling 5,000+ persistent connections using Node.js and Redis.\n• Refactored core web portal into responsive React components, leading to a 45% increase in mobile session duration.\n• Implemented automated integration testing suites, cutting regression defects by over 30%."
        },
        {
          id: "sw-exp-2",
          company: "Nexus Code Corp",
          role: "Junior Developer",
          location: "Redmond, WA",
          startDate: "2020-06",
          endDate: "2021-12",
          current: false,
          description: "• Maintained and shipped features for critical e-commerce backends using Java and Spring Boot.\n• Collaborated in an agile scrum team to ship weekly patches and critical product updates."
        }
      ],
      educations: [
        {
          id: "sw-edu-1",
          institution: "University of Washington",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          location: "Seattle, WA",
          startDate: "2016-09",
          endDate: "2020-05",
          description: "Graduated Magna Cum Lade."
        }
      ],
      skills: [
        { id: "sw-sk-1", name: "JavaScript / TypeScript", level: "Expert" },
        { id: "sw-sk-2", name: "React & React Native", level: "Expert" },
        { id: "sw-sk-3", name: "Node.js & Express", level: "Expert" },
        { id: "sw-sk-4", name: "SQL & NoSQL Databases", level: "Intermediate" }
      ],
      projects: [
        {
          id: "sw-proj-1",
          title: "Real-time Chat Protocol",
          role: "Lead Developer",
          technologies: "Node.js, Socket.io, React",
          link: "github.com/davidchen/chat-protocol",
          description: "Created a low-latency messaging protocol supporting end-to-end encryption and custom chat room groupings."
        }
      ],
      certificates: [
        {
          id: "sw-cert-1",
          title: "AWS Certified Developer – Associate",
          issuer: "Amazon Web Services",
          date: "2023-05",
          link: ""
        }
      ],
      languages: [
        { id: "sw-lang-1", language: "English", proficiency: "Native" },
        { id: "sw-lang-2", language: "Mandarin", proficiency: "Fluent" }
      ],
      references: [],
      interests: [],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Categorize your technical skills: separate programming languages, frameworks, developer tools, and database systems so hiring managers can quickly parse your stack.",
      "Include metrics: detail the volume of requests, scale of deployments, percent performance gains, or hours of manual work saved by your automation tools.",
      "Link to a portfolio: always include clean links to your active GitHub profile or personal website where developers can view your actual code."
    ],
    faqs: [
      {
        question: "Should software engineers include objective statements?",
        answer: "No, a technical professional summary that introduces your primary stack and core architectural capabilities is much more powerful."
      }
    ]
  },
  {
    slug: "student-resume",
    title: "Student Resume Example",
    role: "Student / Intern",
    introduction: "Designed specifically for students applying for internships, research assistants, or entry-level positions. Focuses on academic qualifications, extracurricular activities, and skills.",
    skills: ["Python", "Research", "Project Coordination", "Public Speaking", "Data Entry", "Microsoft Office", "Collaboration"],
    sampleResume: {
      personalInfo: {
        name: "Emily Robinson",
        title: "Computer Science Student",
        email: "emily.robinson@univ.edu",
        phone: "+1 (555) 015-7890",
        website: "",
        location: "Boston, MA",
        github: "github.com/emilyrob",
        linkedin: "linkedin.com/in/emilyrob",
        photo: "",
        photoOn: false,
      },
      summary: "Ambitious Computer Science honor student at Boston University. Eager to leverage strong academic knowledge of algorithms, object-oriented programming, and frontend web development in a challenging summer internship.",
      experiences: [
        {
          id: "st-exp-1",
          company: "Boston University IT",
          role: "Student Help Desk Assistant",
          location: "Boston, MA",
          startDate: "2024-09",
          endDate: "Present",
          current: true,
          description: "• Provide Tier 1 technical support and troubleshooting for over 500+ university students and faculty members daily.\n• Documented troubleshooting procedures for campus-wide Wi-Fi upgrades, reducing support ticket escalations by 15%."
        }
      ],
      educations: [
        {
          id: "st-edu-1",
          institution: "Boston University",
          degree: "Bachelor of Science (Candidate)",
          fieldOfStudy: "Computer Science",
          location: "Boston, MA",
          startDate: "2023-09",
          endDate: "2027-05",
          description: "Current GPA: 3.85/4.00. Dean's List (All Semesters). Relevant coursework: Data Structures, Web Development, Databases."
        }
      ],
      skills: [
        { id: "st-sk-1", name: "Python & Java", level: "Intermediate" },
        { id: "st-sk-2", name: "HTML, CSS & JavaScript", level: "Intermediate" },
        { id: "st-sk-3", name: "Git & GitHub Version Control", level: "Intermediate" }
      ],
      projects: [
        {
          id: "st-proj-1",
          title: "Campus Study Group Finder",
          role: "Team Project Leader",
          technologies: "React, Firebase, Tailwind",
          link: "github.com/emilyrob/study-finder",
          description: "Led a team of three students to design and code a responsive web application connecting class peers for collaborative exam study sessions."
        }
      ],
      certificates: [],
      languages: [],
      references: [],
      interests: [
        { id: "st-int-1", name: "Competitive Hackathons" },
        { id: "st-int-2", name: "Robotics Club" }
      ],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Move education to the top: as a student, your academic accomplishments are your primary assets.",
      "Incorporate coursework: explicitly list relevant courses to show you understand key concepts of the target industry.",
      "List school projects: treat course projects as real work experience, outlining the problem, technology stack, and outcome."
    ],
    faqs: [
      {
        question: "Can I use a student resume for my first full-time role?",
        answer: "Yes! Simply emphasize your internships and major senior design projects to demonstrate corporate readiness."
      }
    ]
  },
  {
    slug: "fresher-resume",
    title: "Fresher Resume Example",
    role: "Entry-Level Professional",
    introduction: "Ideal for recent graduates entering the job market with limited or no prior corporate work experience. This layout emphasizes transferrable skills, internships, and educational achievements.",
    skills: ["Active Learning", "Communication", "Technical Support", "JavaScript", "SQL", "Teamwork", "Problem Solving"],
    sampleResume: {
      personalInfo: {
        name: "Ryan Gallagher",
        title: "Entry-Level Developer",
        email: "ryan.gallagher@email.com",
        phone: "+1 (555) 014-9988",
        website: "",
        location: "Chicago, IL",
        github: "github.com/ryangallagher",
        linkedin: "linkedin.com/in/ryangallagher",
        photo: "",
        photoOn: false,
      },
      summary: "Motivated Computer Science graduate with strong foundational knowledge of object-oriented programming, modern web frameworks, and relational databases. Quick learner eager to contribute to an agile development team.",
      experiences: [
        {
          id: "fr-exp-1",
          company: "Nexus Software",
          role: "Software Engineering Intern",
          location: "Chicago, IL",
          startDate: "2025-05",
          endDate: "2025-08",
          current: false,
          description: "• Assisted senior engineers in fixing UI bugs on client dashboard using React and Tailwind CSS.\n• Participated in daily scrum stand-ups, code reviews, and technical documentation updates.\n• Developed and deployed 3 internal tools using Python scripts to automate daily system configuration checks."
        }
      ],
      educations: [
        {
          id: "fr-edu-1",
          institution: "Illinois Institute of Technology",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          location: "Chicago, IL",
          startDate: "2021-09",
          endDate: "2025-05",
          description: "GPA: 3.67/4.00. Completed capstone project on secure data transfer protocols."
        }
      ],
      skills: [
        { id: "fr-sk-1", name: "Python, C++, Java", level: "Intermediate" },
        { id: "fr-sk-2", name: "HTML5 & Tailwind CSS", level: "Expert" },
        { id: "fr-sk-3", name: "Git Version Control", level: "Intermediate" }
      ],
      projects: [
        {
          id: "fr-proj-1",
          title: "Personal Finance Expense Tracker",
          role: "Solo Creator",
          technologies: "React, LocalStorage, CSS3",
          link: "github.com/ryang/expense-tracker",
          description: "Designed and built an offline expense tracker that visualizes spending behavior via dynamic SVG charts and stores data securely in local storage."
        }
      ],
      certificates: [],
      languages: [],
      references: [],
      interests: [],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Highlight your internships: any technical experience, even unpaid, is incredibly valuable for a fresher.",
      "Emphasize personal coding projects: show that you build software independently, which exhibits drive and capability.",
      "Focus on core computer science foundations like algorithms, database design, and agile methodologies."
    ],
    faqs: [
      {
        question: "Should freshers include non-technical jobs?",
        answer: "If you worked in customer service or retail, list it briefly to show you have strong soft skills like teamwork and client communication."
      }
    ]
  },
  {
    slug: "accountant-resume",
    title: "Accountant Resume Example",
    role: "Accountant",
    introduction: "This professional resume example is tailored for Certified Public Accountants (CPA), corporate auditors, and financial analysts who need to detail ledger accuracy and financial compliance.",
    skills: ["Financial Reporting", "Tax Preparation", "Audit Compliance", "QuickBooks", "SAP ERP", "Advanced Excel", "General Ledger"],
    sampleResume: {
      personalInfo: {
        name: "Marcus Vance",
        title: "Senior Accountant",
        email: "marcus.vance@email.com",
        phone: "+1 (555) 018-4433",
        website: "",
        location: "New York, NY",
        github: "",
        linkedin: "linkedin.com/in/marcusvance",
        photo: "",
        photoOn: false,
      },
      summary: "Detail-oriented Certified Public Accountant (CPA) with 6+ years of corporate accounting experience. Expert in financial statements, tax reporting, audit management, and optimizing ledger workflows. Proven ability to reduce cost discrepancies by 15%.",
      experiences: [
        {
          id: "ac-exp-1",
          company: "Apex Financial Group",
          role: "Senior Staff Accountant",
          location: "New York, NY",
          startDate: "2021-11",
          endDate: "Present",
          current: true,
          description: "• Manage month-end and year-end close processes for corporate accounts totaling $12M in annual revenue.\n• Developed and automated Excel-based financial reporting templates, reducing monthly report compilation time by 4 days.\n• Coordinate annual corporate tax filings, ensuring 100% compliance with federal and state regulations."
        },
        {
          id: "ac-exp-2",
          company: "Vanguard Accounting",
          role: "Junior Auditor",
          location: "Newark, NJ",
          startDate: "2019-06",
          endDate: "2021-10",
          current: false,
          description: "• Conducted internal and external financial audits for 15+ diverse mid-sized businesses.\n• Identified and corrected accounting errors and ledger discrepancies, saving clients over $50k in potential penalties."
        }
      ],
      educations: [
        {
          id: "ac-edu-1",
          institution: "Baruch College",
          degree: "Bachelor of Business Administration",
          fieldOfStudy: "Accounting",
          location: "New York, NY",
          startDate: "2015-09",
          endDate: "2019-05",
          description: "Graduated with honors. Beta Alpha Psi honor society member."
        }
      ],
      skills: [
        { id: "ac-sk-1", name: "Corporate Tax & GAAP", level: "Expert" },
        { id: "ac-sk-2", name: "SAP ERP & QuickBooks", level: "Expert" },
        { id: "ac-sk-3", name: "Advanced Excel (VLOOKUP, Pivots)", level: "Expert" }
      ],
      projects: [],
      certificates: [
        {
          id: "ac-cert-1",
          title: "Certified Public Accountant (CPA)",
          issuer: "AICPA State Licensing Board",
          date: "2020-10",
          link: ""
        }
      ],
      languages: [],
      references: [],
      interests: [],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Detail your software skills: list high-level ERP tools like SAP, Oracle, NetSuite, and QuickBooks.",
      "Quantify your successes: note the sizes of budgets managed, value of assets audited, or percentage of cost cuts."
    ],
    faqs: [
      {
        question: "Is GAAP or IFRS knowledge important to specify?",
        answer: "Yes, clearly state your familiarity with GAAP or IFRS frameworks depending on your region and target employers."
      }
    ]
  },
  {
    slug: "hr-resume",
    title: "HR Specialist Resume Example",
    role: "Human Resources",
    introduction: "Designed for HR managers, coordinators, and talent acquisition specialists. Highlights employee relations, recruitment metrics, and HRIS systems.",
    skills: ["Talent Acquisition", "Employee Relations", "Onboarding", "HRIS", "Compliance", "Conflict Resolution", "Workplace Culture"],
    sampleResume: {
      personalInfo: {
        name: "Chloe Henderson",
        title: "HR Specialist",
        email: "chloe.h@email.com",
        phone: "+1 (555) 016-1122",
        website: "",
        location: "Denver, CO",
        github: "",
        linkedin: "linkedin.com/in/chloehenderson",
        photo: "",
        photoOn: false,
      },
      summary: "Strategic Human Resources professional with 5 years of experience overseeing recruitment, employee onboarding, benefits administration, and compliance. Passionate about designing workplace programs that boost employee retention by over 20%.",
      experiences: [
        {
          id: "hr-exp-1",
          company: "Vortex Tech Industries",
          role: "HR Generalist",
          location: "Denver, CO",
          startDate: "2022-04",
          endDate: "Present",
          current: true,
          description: "• Streamlined candidate pipeline, reducing average time-to-hire from 45 days to 28 days.\n• Designed and launched a remote-first employee onboarding program, improving first-year retention by 25%.\n• Manage benefit inquiries, workers' comp, and employee relation incidents for 200+ staff members."
        }
      ],
      educations: [
        {
          id: "hr-edu-1",
          institution: "University of Colorado",
          degree: "Bachelor of Arts",
          fieldOfStudy: "Human Resources Management",
          location: "Boulder, CO",
          startDate: "2017-09",
          endDate: "2021-05",
          description: "Vice President of SHRM student chapter."
        }
      ],
      skills: [
        { id: "hr-sk-1", name: "Recruiting & Sourcing", level: "Expert" },
        { id: "hr-sk-2", name: "HRIS Tools (Workday, BambooHR)", level: "Expert" },
        { id: "hr-sk-3", name: "Labor Law & Compliance", level: "Expert" }
      ],
      projects: [],
      certificates: [
        {
          id: "hr-cert-1",
          title: "SHRM Certified Professional (SHRM-CP)",
          issuer: "SHRM",
          date: "2023-01",
          link: ""
        }
      ],
      languages: [],
      references: [],
      interests: [],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Show retention and satisfaction metrics: mention results from workplace culture surveys or retention ratios.",
      "List major HRIS databases and ATS tracking tools you have configured."
    ],
    faqs: [
      {
        question: "Should HR candidates list payroll experience?",
        answer: "If you have managed payroll or worked with tools like ADP, definitely specify it as it's highly valuable in smaller companies."
      }
    ]
  },
  {
    slug: "teacher-resume",
    title: "Teacher Resume Example",
    role: "Educator",
    introduction: "Perfect for primary school, secondary school, and specialty subject educators. This resume format showcases licensure, curriculum planning, and classroom success.",
    skills: ["Curriculum Development", "Classroom Management", "Parent-Teacher Relations", "LMS Tools", "Differentiated Instruction", "Lesson Planning"],
    sampleResume: {
      personalInfo: {
        name: "Sarah Miller",
        title: "High School English Teacher",
        email: "sarah.miller@email.com",
        phone: "+1 (555) 013-4455",
        website: "",
        location: "Atlanta, GA",
        github: "",
        linkedin: "",
        photo: "",
        photoOn: false,
      },
      summary: "Dedicated and licensed Secondary English Educator with 7 years of classroom experience. Certified in Advanced Placement (AP) Literature, with a passion for building inclusive environments and improving literature proficiency by 18%.",
      experiences: [
        {
          id: "t-exp-1",
          company: "Oakwood High School",
          role: "English Language Arts Teacher",
          location: "Atlanta, GA",
          startDate: "2021-08",
          endDate: "Present",
          current: true,
          description: "• Deliver AP Literature and ELA curriculum to 120+ students across four daily sections.\n• Integrated student-led discussion modules and LMS platforms, raising state assessment pass rates from 82% to 94%.\n• Lead the extracurricular creative writing club and coordinate parent-teacher communications."
        },
        {
          id: "t-exp-2",
          company: "Pine Creek Academy",
          role: "ELA Teacher (Grades 9-10)",
          location: "Decatur, GA",
          startDate: "2019-08",
          endDate: "2021-06",
          current: false,
          description: "• Formulated daily lesson plans aligning with state guidelines, focusing on vocabulary and critical reading."
        }
      ],
      educations: [
        {
          id: "t-edu-1",
          institution: "Georgia State University",
          degree: "Master of Arts",
          fieldOfStudy: "Secondary Education",
          location: "Atlanta, GA",
          startDate: "2017-09",
          endDate: "2019-05",
          description: "Completed student teaching requirements at local urban high schools."
        }
      ],
      skills: [
        { id: "t-sk-1", name: "Classroom Leadership", level: "Expert" },
        { id: "t-sk-2", name: "LMS Systems (Canvas, Google Class)", level: "Expert" },
        { id: "t-sk-3", name: "Curriculum Design", level: "Expert" }
      ],
      projects: [],
      certificates: [
        {
          id: "t-cert-1",
          title: "Georgia Professional Educator License (Grades 6-12)",
          issuer: "GaPSC",
          date: "2019-06",
          link: ""
        }
      ],
      languages: [],
      references: [],
      interests: [],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Highlight state teaching licenses prominently at the top of your resume.",
      "Incorporate technology tools: indicate your expertise in Zoom, Google Classroom, Canvas, or smartboards."
    ],
    faqs: [
      {
        question: "Should teachers list non-teaching roles?",
        answer: "Only if they involve leading children, coaching sports, camp counseling, or instructional workshops."
      }
    ]
  },
  {
    slug: "nurse-resume",
    title: "Registered Nurse (RN) Resume Example",
    role: "Registered Nurse",
    introduction: "Designed for clinical healthcare professionals and Registered Nurses (RN). Focuses on emergency care, patient triaging, medical administration, and certifications.",
    skills: ["Patient Care", "BLS / ACLS", "Clinical Triage", "EHR Software", "IV Administration", "Infection Control", "Emergency Care"],
    sampleResume: {
      personalInfo: {
        name: "Jessica Taylor",
        title: "Registered Nurse (RN, BSN)",
        email: "jessica.taylor@email.com",
        phone: "+1 (555) 012-7744",
        website: "",
        location: "Miami, FL",
        github: "",
        linkedin: "",
        photo: "",
        photoOn: false,
      },
      summary: "Compassionate and licensed Registered Nurse (RN) with 6 years of clinical experience in busy municipal hospital Emergency Departments. Expert in critical patient triaging, cardiac monitoring, and medical record keeping.",
      experiences: [
        {
          id: "n-exp-1",
          company: "Mercy Health Hospital",
          role: "Emergency Room Staff Nurse",
          location: "Miami, FL",
          startDate: "2021-03",
          endDate: "Present",
          current: true,
          description: "• Administer high-quality critical nursing care to up to 15 emergency patients per shift.\n• Lead triage and assessment workflows in a fast-paced environment, reducing patient wait times by 10%.\n• Collaborate with on-call physicians, trauma teams, and pharmacists to formulate safe patient recovery guidelines."
        }
      ],
      educations: [
        {
          id: "n-edu-1",
          institution: "University of Miami",
          degree: "Bachelor of Science",
          fieldOfStudy: "Nursing (BSN)",
          location: "Miami, FL",
          startDate: "2016-09",
          endDate: "2020-05",
          description: "Dean's List. Graduated with honors."
        }
      ],
      skills: [
        { id: "n-sk-1", name: "Acute Patient Triage", level: "Expert" },
        { id: "n-sk-2", name: "EHR Databases (Epic, Cerner)", level: "Expert" },
        { id: "n-sk-3", name: "Cardiopulmonary Monitoring", level: "Expert" }
      ],
      projects: [],
      certificates: [
        {
          id: "n-cert-1",
          title: "Registered Nurse (RN) State License",
          issuer: "Florida Board of Nursing",
          date: "2020-07",
          link: ""
        },
        {
          id: "n-cert-2",
          title: "Advanced Cardiovascular Life Support (ACLS)",
          issuer: "American Heart Association",
          date: "2021-02",
          link: ""
        }
      ],
      languages: [],
      references: [],
      interests: [],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Always state your clinical licensing (RN, BSN) immediately after your name and in your title.",
      "List hospital sizes: describe bed capacity and average patient volumes to indicate your adaptation capabilities."
    ],
    faqs: [
      {
        question: "Should I include clinical rotations?",
        answer: "If you have less than 2 years of professional experience, yes! List your hours in ICU, ER, or pediatric departments."
      }
    ]
  },
  {
    slug: "java-developer-resume",
    title: "Java Developer Resume Example",
    role: "Java Developer",
    introduction: "Designed for backend engineers, enterprise architects, and Java/Spring specialists. Focuses on systems design, object-oriented concepts, and relational databases.",
    skills: ["Java 17+", "Spring Boot", "Hibernate ORM", "Microservices", "REST APIs", "Docker", "JUnit / Mockito", "SQL / NoSQL"],
    sampleResume: {
      personalInfo: {
        name: "Kevin Peterson",
        title: "Senior Java Developer",
        email: "kevin.p@email.com",
        phone: "+1 (555) 011-8833",
        website: "",
        location: "Dallas, TX",
        github: "github.com/kevinpjava",
        linkedin: "linkedin.com/in/kevinpjava",
        photo: "",
        photoOn: false,
      },
      summary: "Senior Backend Developer with 7+ years of experience engineering high-throughput, fault-tolerant banking systems in Java. Expert in Spring Boot, Hibernate, microservices, and database normalization.",
      experiences: [
        {
          id: "jd-exp-1",
          company: "Apex Banking Tech",
          role: "Senior Backend Engineer",
          location: "Dallas, TX",
          startDate: "2022-02",
          endDate: "Present",
          current: true,
          description: "• Engineered Spring Boot microservices handling $5M in transaction traffic daily with 99.99% system uptime.\n• Transitioned legacy monolithic database to a distributed PostgreSQL cluster, improving write throughput by 35%.\n• Guided a team of 4 developers to build a secure OAuth2 gateway for corporate banking APIs."
        }
      ],
      educations: [
        {
          id: "jd-edu-1",
          institution: "University of Texas at Dallas",
          degree: "Bachelor of Science",
          fieldOfStudy: "Software Engineering",
          location: "Dallas, TX",
          startDate: "2014-09",
          endDate: "2018-05",
          description: "Emphasis on Object Oriented Design."
        }
      ],
      skills: [
        { id: "jd-sk-1", name: "Java Core (EE/SE) & Multithreading", level: "Expert" },
        { id: "jd-sk-2", name: "Spring Framework & Hibernate", level: "Expert" },
        { id: "jd-sk-3", name: "Microservice Architecture & REST", level: "Expert" }
      ],
      projects: [],
      certificates: [
        {
          id: "jd-cert-1",
          title: "Oracle Certified Professional: Java Programmer",
          issuer: "Oracle Corporation",
          date: "2020-04",
          link: ""
        }
      ],
      languages: [],
      references: [],
      interests: [],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Incorporate advanced enterprise concepts: multithreading, microservices, REST design, and containerization.",
      "Always mention your unit testing standards (JUnit, Mockito) which shows a mature engineering practice."
    ],
    faqs: [
      {
        question: "Should Java developers list other coding languages?",
        answer: "Yes, definitely! Mentioning SQL, Python, or TypeScript highlights your versatility in modern web stacks."
      }
    ]
  },
  {
    slug: "customer-service-resume",
    title: "Customer Service Representative Resume Example",
    role: "Customer Service",
    introduction: "Ideal for help desk representatives, client support coordinators, and call center professionals. Highlights communication, client satisfaction, CRM software, and dispute resolution.",
    skills: ["Client Communication", "CRM Software", "Dispute Resolution", "Ticketing Systems", "Active Listening", "Problem Solving"],
    sampleResume: {
      personalInfo: {
        name: "Tyler Jenkins",
        title: "Customer Success Representative",
        email: "tyler.j@email.com",
        phone: "+1 (555) 012-9922",
        website: "",
        location: "Phoenix, AZ",
        github: "",
        linkedin: "",
        photo: "",
        photoOn: false,
      },
      summary: "Empathetic and results-oriented Customer Service Representative with 4 years of experience resolving client inquiries across high-volume chat, phone, and email queues. Standard helper achieving over 98% positive satisfaction ratings.",
      experiences: [
        {
          id: "cs-exp-1",
          company: "Zenith Retail Group",
          role: "Senior Client Support Associate",
          location: "Phoenix, AZ",
          startDate: "2022-09",
          endDate: "Present",
          current: true,
          description: "• Handle an average of 80+ customer inquiries daily regarding product orders, refunds, and shipping details.\n• Decreased typical case resolution times from 12 minutes to 8.5 minutes by creating pre-written response databases.\n• Achieved and maintained a 98.4% Customer Satisfaction (CSAT) rating, leading the division team in metrics."
        }
      ],
      educations: [
        {
          id: "cs-edu-1",
          institution: "Arizona State University",
          degree: "Associate of Arts",
          fieldOfStudy: "Communication",
          location: "Tempe, AZ",
          startDate: "2019-09",
          endDate: "2021-05",
          description: "Excelled in public speaking and conflict negotiation classes."
        }
      ],
      skills: [
        { id: "cs-sk-1", name: "Zendesk & Salesforce CRM", level: "Expert" },
        { id: "cs-sk-2", name: "De-escalation & Active Listening", level: "Expert" },
        { id: "cs-sk-3", name: "Multi-channel Support (Chat, Phone)", level: "Expert" }
      ],
      projects: [],
      certificates: [],
      languages: [
        { id: "cs-lang-1", language: "English", proficiency: "Native" },
        { id: "cs-lang-2", language: "French", proficiency: "Conversational" }
      ],
      references: [],
      interests: [],
      customSection: { title: "", items: [], enabled: false }
    },
    tips: [
      "Spotlight your customer satisfaction rates: quote your CSAT scores, Net Promoter Score (NPS), or average response times.",
      "Detail your software proficiency: list industry-standard help desks like Zendesk, Freshdesk, Intercom, or Salesforce."
    ],
    faqs: [
      {
        question: "Can I list retail experience for help desk jobs?",
        answer: "Yes, retail is pure customer service! Translating those offline communication skills into digital ones is highly effective."
      }
    ]
  }
];

export const FAQS = [
  {
    question: "Is this resume builder really 100% free?",
    answer: "Yes, completely! You can create, edit, customize, and download your resume as many times as you like. There are no paywalls, premium features, hidden costs, or watermarks."
  },
  {
    question: "Do I need to create an account to build my resume?",
    answer: "No registration is required. You can start editing immediately. Your progress is saved automatically to your browser's local storage so you can resume later."
  },
  {
    question: "What is an ATS-friendly resume?",
    answer: "An ATS (Applicant Tracking System) friendly resume uses clear formatting, standard section titles, and selectable text that automated recruitment scanners can easily read. All templates on our platform are designed to be 100% ATS-friendly."
  },
  {
    question: "Are my resumes stored on your servers?",
    answer: "No. Your privacy is our top priority. We do not store any of your personal information on our servers. Your data is kept strictly inside your browser's local storage. If you clear your browser cache, your saved resume will be deleted."
  },
  {
    question: "How can I download my resume as a PDF?",
    answer: "Once you have completed your resume, click the 'Download PDF' button in the toolbar. It will generate a high-quality, printable PDF in standard A4 format with all your custom styles applied instantly."
  },
  {
    question: "Can I import my existing resume to edit it?",
    answer: "Yes! You can export your data as a JSON file from the toolbar to create a backup. To resume editing later on another computer, simply upload this JSON file using the 'Import JSON' button."
  },
  {
    question: "How many templates do you offer?",
    answer: "We offer 10 professional resume templates: Modern, Classic, Professional, Executive, Minimal, Corporate, Simple, ATS Friendly, Student, and Creative. You can switch templates instantly without re-typing any data."
  },
  {
    question: "Can I customize the fonts and colors of my resume?",
    answer: "Yes, you have full control over customization! You can alter the accent color, choose from various elegant typography fonts, change the text size, set the line spacing, adjust the page margins, toggle profile pictures, and even change the order of sections."
  },
  {
    question: "Is my personal information secure on this website?",
    answer: "Yes, because your data never leaves your computer. All processing, editing, and PDF exports are handled entirely client-side in your own browser, guaranteeing complete data security."
  },
  {
    question: "How do I add custom sections to my resume?",
    answer: "Our builder includes a dedicated 'Custom Section' where you can define a unique title (such as Publications, Awards, or Volunteering) and add custom items containing titles, subtitles, dates, and descriptions."
  },
  {
    question: "What is the best font size for a professional resume?",
    answer: "Generally, body text should be between 10pt and 11.5pt, headings should be 12pt to 14pt, and your name should be 18pt to 24pt. Our 'sm', 'md', and 'lg' options configure these relative ranges automatically to keep your resume well-balanced."
  },
  {
    question: "Should I include references on my resume?",
    answer: "Unless explicitly requested in the job description, it is better to leave references off to save space for achievements, or simply include them if you have extra room. Our resume builder supports both!"
  },
  {
    question: "How long should a professional resume be?",
    answer: "For most junior and mid-level roles, a concise one-page resume is optimal. If you have more than 10 years of highly relevant experience, a two-page resume is perfectly acceptable."
  },
  {
    question: "Can I use this resume builder on my mobile phone?",
    answer: "Yes, our website is fully responsive. You can edit, customize, and export your resume on desktops, laptops, tablets, and smartphones easily."
  },
  {
    question: "What are the most common resume mistakes to avoid?",
    answer: "Typos, grammatical errors, listing generic responsibilities instead of measurable metrics, using an unprofessional email address, and over-complicating formatting with dense graphs or text boxes."
  },
  {
    question: "How do I tailor my resume for a specific job description?",
    answer: "Review the target job description and note the primary hard and soft skills requested. Weave those key terms naturally into your professional summary and experience descriptions."
  },
  {
    question: "Do your templates support profile pictures?",
    answer: "Yes, you can toggle the profile picture on or off under the customization settings. Note that in some countries (like the US or UK), recruiters prefer resumes without pictures to avoid bias, while in Europe, pictures are standard."
  },
  {
    question: "Can I export my data to backup and edit later?",
    answer: "Yes, the 'Export JSON' option acts as your local database backup. It downloads a simple file containing all your text, which can be imported back into our builder at any time."
  },
  {
    question: "Does this resume builder have a watermark?",
    answer: "No. Unlike other builders, our PDF downloads contain absolutely zero watermarks, site credits, or hidden references, ensuring a high level of professionalism."
  },
  {
    question: "Why is this service free? How do you make money?",
    answer: "We support the operations of this free service through contextual advertising (like Google AdSense) displayed on our resource and informational pages. This allows us to keep the core builder 100% free with no premium paywalls for job seekers."
  }
];

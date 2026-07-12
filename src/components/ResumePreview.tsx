import { ResumeData, CustomizationSettings } from "../types";
import { Mail, Phone, Globe, MapPin, Linkedin, Github } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  settings: CustomizationSettings;
}

export default function ResumePreview({ data, settings }: ResumePreviewProps) {
  const {
    templateId,
    accentColor,
    fontFamily,
    fontSize,
    lineSpacing,
    pageMargins,
    sectionOrder,
  } = settings;

  // Font family mappings
  const fontClassMap: Record<string, string> = {
    inter: "font-inter",
    space: "font-space",
    playfair: "font-playfair",
    mono: "font-mono",
    merriweather: "font-merriweather",
    roboto: "font-roboto",
    lato: "font-lato",
  };

  const selectedFontClass = fontClassMap[fontFamily] || "font-sans";

  // Margins mapping
  const marginClassMap: Record<string, string> = {
    compact: "p-6 sm:p-8",
    normal: "p-8 sm:p-10",
    spacious: "p-10 sm:p-14",
  };
  const selectedMarginClass = marginClassMap[pageMargins] || "p-8";

  // Font size mapping (body, heading, name)
  const sizeClassMap: Record<string, { body: string; head: string; name: string; meta: string }> = {
    sm: {
      body: "text-[11px]",
      head: "text-sm",
      name: "text-xl",
      meta: "text-[10px]",
    },
    md: {
      body: "text-[13px]",
      head: "text-base",
      name: "text-2xl",
      meta: "text-xs",
    },
    lg: {
      body: "text-[15px]",
      head: "text-lg",
      name: "text-3xl",
      meta: "text-sm",
    },
  };
  const selectedSizes = sizeClassMap[fontSize] || sizeClassMap.md;

  // Line spacing mapping
  const spacingClassMap: Record<string, string> = {
    tight: "leading-snug space-y-1",
    normal: "leading-normal space-y-1.5",
    relaxed: "leading-relaxed space-y-2",
  };
  const selectedSpacing = spacingClassMap[lineSpacing] || "leading-normal";

  const { name, title, email, phone, website, location, github, linkedin, photo, photoOn } = data.personalInfo;

  // Render contacts as clean list
  const contactItems = [
    email && { icon: <Mail className="h-3 w-3 shrink-0" />, text: email, href: `mailto:${email}` },
    phone && { icon: <Phone className="h-3 w-3 shrink-0" />, text: phone, href: `tel:${phone}` },
    location && { icon: <MapPin className="h-3 w-3 shrink-0" />, text: location },
    website && { icon: <Globe className="h-3 w-3 shrink-0" />, text: website, href: website.startsWith("http") ? website : `https://${website}` },
    linkedin && { icon: <Linkedin className="h-3 w-3 shrink-0" />, text: linkedin, href: linkedin.startsWith("http") ? linkedin : `https://${linkedin}` },
    github && { icon: <Github className="h-3 w-3 shrink-0" />, text: github, href: github.startsWith("http") ? github : `https://${github}` },
  ].filter(Boolean) as any[];

  // Styles helpers
  const accentStyle = { color: accentColor };
  const accentBgStyle = { backgroundColor: accentColor };
  const accentBorderColorStyle = { borderColor: accentColor };

  // --- Dynamic Templates Header Renders ---
  const renderHeader = () => {
    switch (templateId) {
      case "modern":
        return (
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-100 pb-5 mb-5">
            <div className="flex items-center space-x-4">
              {photoOn && photo && (
                <img src={photo} alt={name} className="h-16 w-16 rounded-xl object-cover border-2 border-zinc-100 shadow-sm" referrerPolicy="no-referrer" />
              )}
              <div>
                <h1 className={`${selectedSizes.name} font-bold text-zinc-900 tracking-tight`}>{name || "Unnamed Professional"}</h1>
                {title && <p className="text-sm font-semibold tracking-wide" style={accentStyle}>{title}</p>}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 text-zinc-500 text-xs font-medium sm:text-right sm:items-end">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="sm:order-2 sm:ml-2" style={accentStyle}>{item.icon}</span>
                  {item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.text}</a> : <span>{item.text}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case "classic":
        return (
          <div className="text-center border-b border-zinc-200 pb-5 mb-5 flex flex-col items-center">
            {photoOn && photo && (
              <img src={photo} alt={name} className="h-20 w-20 rounded-full object-cover mb-3 border-2 border-zinc-200 shadow-sm" referrerPolicy="no-referrer" />
            )}
            <h1 className={`${selectedSizes.name} font-serif font-bold text-zinc-900 tracking-tight`}>{name || "Unnamed Professional"}</h1>
            {title && <p className={`mt-1 text-sm uppercase tracking-widest font-semibold font-serif`} style={accentStyle}>{title}</p>}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-3 text-zinc-500 text-xs font-medium">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  <span style={accentStyle}>{item.icon}</span>
                  {item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.text}</a> : <span>{item.text}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case "professional":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-zinc-200 pb-5 mb-5">
            <div className="md:col-span-2 space-y-2">
              {photoOn && photo && (
                <img src={photo} alt={name} className="h-14 w-14 rounded-lg object-cover mb-2 border border-zinc-200 shadow-sm" referrerPolicy="no-referrer" />
              )}
              <h1 className={`${selectedSizes.name} font-extrabold text-zinc-900 tracking-tight`}>{name || "Unnamed Professional"}</h1>
              {title && <span className="inline-block px-2.5 py-0.5 text-xs text-white rounded font-semibold tracking-wide uppercase shadow-sm" style={accentBgStyle}>{title}</span>}
            </div>
            <div className="flex flex-col space-y-1 text-zinc-600 text-xs font-medium justify-center border-l border-zinc-150 pl-4 md:pl-6">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span style={accentStyle}>{item.icon}</span>
                  {item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[180px]">{item.text}</a> : <span className="truncate max-w-[180px]">{item.text}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case "executive":
        return (
          <div className="border-l-4 pl-5 py-2 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={accentBorderColorStyle}>
            <div>
              <h1 className={`${selectedSizes.name} font-extrabold text-zinc-900 tracking-tight uppercase`}>{name || "Unnamed Professional"}</h1>
              {title && <p className="text-sm uppercase tracking-widest font-semibold text-zinc-500 mt-1">{title}</p>}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-600 text-xs font-medium">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  <span style={accentStyle}>{item.icon}</span>
                  {item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.text}</a> : <span>{item.text}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="mb-6 flex justify-between items-end border-b border-zinc-100 pb-4">
            <div>
              <h1 className={`${selectedSizes.name} font-light text-zinc-950 tracking-wide`}>{name || "Unnamed Professional"}</h1>
              {title && <p className="text-xs uppercase tracking-widest text-zinc-400 mt-0.5">{title}</p>}
            </div>
            <div className="text-right text-[11px] text-zinc-500 font-mono space-y-0.5">
              {contactItems.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center justify-end space-x-1">
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "corporate":
        return (
          <div className="border-b-4 border-double pb-4 mb-5 text-center" style={accentBorderColorStyle}>
            <h1 className={`${selectedSizes.name} font-bold text-zinc-900 uppercase tracking-widest`}>{name || "Unnamed Professional"}</h1>
            {title && <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mt-1">{title}</p>}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-3 text-zinc-600 text-xs font-semibold">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  <span style={accentStyle}>{item.icon}</span>
                  {item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.text}</a> : <span>{item.text}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case "simple":
        return (
          <div className="pb-4 mb-4 border-b border-zinc-100">
            <h1 className={`${selectedSizes.name} font-bold text-zinc-900`}>{name || "Unnamed Professional"}</h1>
            {title && <p className="text-sm font-medium text-zinc-600 mt-0.5">{title}</p>}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-zinc-500 text-xs font-medium">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  <span>{item.text}</span>
                  {idx < contactItems.length - 1 && <span className="text-zinc-300">•</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case "ats-friendly":
        return (
          <div className="border-b-2 border-black pb-4 mb-5 text-center font-mono">
            <h1 className="text-2xl font-bold uppercase text-black tracking-tight">{name || "Unnamed Professional"}</h1>
            {title && <p className="text-sm font-semibold uppercase tracking-wider text-black mt-1">{title}</p>}
            <p className="text-xs text-black mt-2 flex flex-wrap justify-center gap-x-3">
              {contactItems.map((item, idx) => (
                <span key={idx}>
                  {item.text} {idx < contactItems.length - 1 ? " | " : ""}
                </span>
              ))}
            </p>
          </div>
        );

      case "student":
        return (
          <div className="flex justify-between items-start border-b-2 pb-4 mb-5" style={accentBorderColorStyle}>
            <div className="space-y-1">
              {photoOn && photo && (
                <img src={photo} alt={name} className="h-16 w-16 rounded-full object-cover border shadow-sm mb-1" referrerPolicy="no-referrer" />
              )}
              <h1 className={`${selectedSizes.name} font-bold text-zinc-900`}>{name || "Unnamed Scholar"}</h1>
              {title && <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{title}</p>}
            </div>
            <div className="flex flex-col space-y-1 text-right text-zinc-600 text-xs font-medium font-serif">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-end space-x-1.5">
                  <span>{item.text}</span>
                  <span style={accentStyle}>{item.icon}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="text-white p-6 sm:p-8 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 rounded-t-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm" style={accentBgStyle}>
            <div className="flex items-center space-x-4 text-center sm:text-left">
              {photoOn && photo && (
                <img src={photo} alt={name} className="h-16 w-16 rounded-full object-cover border-2 border-white/20 shadow-inner" referrerPolicy="no-referrer" />
              )}
              <div>
                <h1 className={`${selectedSizes.name} font-bold tracking-tight text-white`}>{name || "Unnamed Professional"}</h1>
                {title && <p className="text-sm tracking-widest text-white/90 font-medium uppercase mt-0.5">{title}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-white/90 font-medium">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-1.5 bg-black/10 px-2 py-1 rounded">
                  <span className="text-white">{item.icon}</span>
                  {item.href ? <a href={item.href} className="hover:underline truncate max-w-[120px]">{item.text}</a> : <span className="truncate max-w-[120px]">{item.text}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-100 pb-5 mb-5">
            <div className="flex items-center space-x-4">
              {photoOn && photo && (
                <img src={photo} alt={name} className="h-16 w-16 rounded-full object-cover border-2 border-zinc-100" referrerPolicy="no-referrer" />
              )}
              <div>
                <h1 className={`${selectedSizes.name} font-bold text-zinc-800 tracking-tight`}>{name || "Unnamed Professional"}</h1>
                {title && <p className="text-sm font-semibold tracking-wide" style={accentStyle}>{title}</p>}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 text-zinc-500 text-xs font-medium">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span style={accentStyle}>{item.icon}</span>
                  {item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.text}</a> : <span>{item.text}</span>}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // --- Dynamic Section Header Renderer ---
  const renderSectionHeader = (title: string) => {
    switch (templateId) {
      case "ats-friendly":
        return (
          <div className="border-b border-black pb-0.5 mb-2 mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black font-mono">{title}</h2>
          </div>
        );
      case "minimal":
        return (
          <div className="mb-2 mt-4 border-l-2 border-zinc-300 pl-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{title}</h2>
          </div>
        );
      case "classic":
        return (
          <div className="text-center mb-3 mt-5 border-y border-zinc-200 py-1.5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-700">{title}</h2>
          </div>
        );
      case "modern":
        return (
          <div className="mb-3 mt-5 pb-1 border-b border-zinc-150 flex items-center justify-between">
            <h2 className={`${selectedSizes.head} font-bold uppercase tracking-wider text-zinc-800`} style={accentStyle}>{title}</h2>
            <div className="h-[2px] w-8 rounded" style={accentBgStyle}></div>
          </div>
        );
      case "professional":
        return (
          <div className="mb-3 mt-5 flex items-center">
            <div className="h-5 w-1 mr-2 rounded" style={accentBgStyle}></div>
            <h2 className={`${selectedSizes.head} font-bold uppercase tracking-wider text-zinc-900`}>{title}</h2>
          </div>
        );
      case "executive":
        return (
          <div className="mb-3 mt-5 border-b-2 pb-1" style={accentBorderColorStyle}>
            <h2 className={`${selectedSizes.head} font-extrabold uppercase tracking-wide text-zinc-800`}>{title}</h2>
          </div>
        );
      case "corporate":
        return (
          <div className="px-3 py-1 mb-3 mt-5 rounded text-white font-bold tracking-wide flex items-center justify-between" style={accentBgStyle}>
            <h2 className="text-xs uppercase">{title}</h2>
            <span className="text-[10px] opacity-75 font-mono">■</span>
          </div>
        );
      case "simple":
        return (
          <div className="mb-2 mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wide text-zinc-950">{title}</h2>
          </div>
        );
      case "student":
        return (
          <div className="mb-3 mt-5 flex items-center justify-between border-b border-zinc-100 pb-1">
            <h2 className={`${selectedSizes.head} font-bold text-zinc-800 italic`}>{title}</h2>
            <span className="text-[10px] text-zinc-400 font-mono">Academic Record</span>
          </div>
        );
      case "creative":
        return (
          <div className="flex items-center space-x-2 mb-3 mt-5">
            <span className="h-2 w-2 rounded-full" style={accentBgStyle}></span>
            <h2 className={`${selectedSizes.head} font-bold uppercase tracking-wide text-zinc-800`}>{title}</h2>
            <div className="h-[1px] flex-1 bg-zinc-100"></div>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-3 mb-3 mt-5">
            <h2 className={`${selectedSizes.head} font-bold uppercase tracking-wider text-zinc-800 shrink-0`}>{title}</h2>
            <div className="h-[1px] w-full bg-zinc-100 flex-1"></div>
          </div>
        );
    }
  };

  // --- Render section list based on order ---
  const renderSections = () => {
    return sectionOrder.map((sectionId) => {
      switch (sectionId) {
        case "experience":
          if (!data.experiences || data.experiences.length === 0) return null;
          return (
            <div key={sectionId} className="experience-section">
              {renderSectionHeader("Professional Experience")}
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="group relative">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className={`font-semibold text-slate-800 ${selectedSizes.body}`}>
                          {exp.role} <span className="text-slate-400 font-normal">|</span> <span className="text-slate-600 font-medium">{exp.company}</span>
                        </h3>
                        {exp.location && <span className={`text-slate-400 italic block ${selectedSizes.meta}`}>{exp.location}</span>}
                      </div>
                      <span className={`text-slate-400 font-medium whitespace-nowrap ${selectedSizes.meta}`}>
                        {exp.startDate || "Start"} to {exp.current ? "Present" : exp.endDate || "End"}
                      </span>
                    </div>

                    {exp.description && (
                      <div className={`text-slate-600 mt-1.5 whitespace-pre-line ${selectedSizes.body} ${selectedSpacing}`}>
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );

        case "education":
          if (!data.educations || data.educations.length === 0) return null;
          return (
            <div key={sectionId} className="education-section">
              {renderSectionHeader("Education")}
              <div className="space-y-3">
                {data.educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className={`font-semibold text-slate-800 ${selectedSizes.body}`}>
                          {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                        </h3>
                        <span className={`text-slate-600 font-medium block ${selectedSizes.meta}`}>{edu.institution}{edu.location && `, ${edu.location}`}</span>
                      </div>
                      <span className={`text-slate-400 font-medium whitespace-nowrap ${selectedSizes.meta}`}>
                        {edu.startDate || "Start"} to {edu.endDate || "End"}
                      </span>
                    </div>
                    {edu.description && <p className={`text-slate-500 italic mt-0.5 ${selectedSizes.meta}`}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          );

        case "skills":
          if (!data.skills || data.skills.length === 0) return null;
          return (
            <div key={sectionId} className="skills-section">
              {renderSectionHeader("Skills")}
              {templateId === "professional" || templateId === "corporate" ? (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((sk) => (
                    <span
                      key={sk.id}
                      className="inline-flex items-center px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-700 rounded-md font-medium text-xs shadow-sm hover:bg-slate-100 transition-colors"
                    >
                      {sk.name} {sk.level && <span className="ml-1 text-[10px] text-slate-400 font-normal">({sk.level})</span>}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-4">
                  {data.skills.map((sk) => (
                    <div key={sk.id} className={`flex items-center space-x-1.5 text-slate-600 ${selectedSizes.body}`}>
                      <span className="h-1.5 w-1.5 rounded-full" style={accentBgStyle}></span>
                      <span>
                        <strong className="text-slate-700">{sk.name}</strong>
                        {sk.level && <span className="text-[10px] text-slate-400 font-normal ml-1">({sk.level})</span>}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "projects":
          if (!data.projects || data.projects.length === 0) return null;
          return (
            <div key={sectionId} className="projects-section">
              {renderSectionHeader("Key Projects")}
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className={`font-semibold text-slate-800 ${selectedSizes.body}`}>
                        {proj.title} {proj.role && <span className="text-slate-400 font-normal">({proj.role})</span>}
                      </h3>
                      {proj.link && <span className="text-blue-500 underline text-xs break-all truncate max-w-[150px] sm:max-w-[250px]">{proj.link}</span>}
                    </div>
                    {proj.technologies && <p className={`text-slate-400 font-mono text-[10px] mt-0.5`}>Built using: {proj.technologies}</p>}
                    {proj.description && <p className={`text-slate-600 mt-1 ${selectedSizes.body}`}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          );

        case "certificates":
          if (!data.certificates || data.certificates.length === 0) return null;
          return (
            <div key={sectionId} className="certificates-section">
              {renderSectionHeader("Certifications")}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.certificates.map((cert) => (
                  <div key={cert.id} className="border-l-2 pl-2 border-slate-100">
                    <h3 className={`font-semibold text-slate-800 ${selectedSizes.body}`}>{cert.title}</h3>
                    <p className={`text-slate-500 font-medium ${selectedSizes.meta}`}>{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                  </div>
                ))}
              </div>
            </div>
          );

        case "languages":
          if (!data.languages || data.languages.length === 0) return null;
          return (
            <div key={sectionId} className="languages-section">
              {renderSectionHeader("Languages")}
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {data.languages.map((l) => (
                  <div key={l.id} className={`text-slate-700 ${selectedSizes.body}`}>
                    <strong>{l.language}</strong> {l.proficiency && <span className="text-slate-400">({l.proficiency})</span>}
                  </div>
                ))}
              </div>
            </div>
          );

        case "references":
          if (!data.references || data.references.length === 0) return null;
          return (
            <div key={sectionId} className="references-section">
              {renderSectionHeader("References")}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.references.map((ref) => (
                  <div key={ref.id} className="bg-slate-50/50 p-2 border border-slate-100 rounded-lg">
                    <h4 className={`font-semibold text-slate-800 ${selectedSizes.body}`}>{ref.name}</h4>
                    <p className={`text-slate-500 font-medium ${selectedSizes.meta}`}>{ref.title} • {ref.company}</p>
                    {ref.contact && <p className={`text-blue-500 mt-0.5 ${selectedSizes.meta}`}>{ref.contact}</p>}
                  </div>
                ))}
              </div>
            </div>
          );

        case "interests":
          if (!data.interests || data.interests.length === 0) return null;
          return (
            <div key={sectionId} className="interests-section">
              {renderSectionHeader("Interests")}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600 text-sm">
                {data.interests.map((i) => (
                  <span key={i.id} className={`${selectedSizes.body}`}>• {i.name}</span>
                ))}
              </div>
            </div>
          );

        case "custom":
          if (!data.customSection || !data.customSection.enabled || !data.customSection.items || data.customSection.items.length === 0) return null;
          return (
            <div key={sectionId} className="custom-section">
              {renderSectionHeader(data.customSection.title || "Additional Information")}
              <div className="space-y-3">
                {data.customSection.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className={`font-semibold text-slate-800 ${selectedSizes.body}`}>{item.title}</h3>
                        {item.subtitle && <span className={`text-slate-500 font-medium block ${selectedSizes.meta}`}>{item.subtitle}</span>}
                      </div>
                      {item.date && <span className={`text-slate-400 whitespace-nowrap ${selectedSizes.meta}`}>{item.date}</span>}
                    </div>
                    {item.description && <p className={`text-slate-600 mt-1 ${selectedSizes.body}`}>{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <div 
      className={`bg-white select-text print-page border border-slate-100 ${selectedFontClass} ${selectedMarginClass} resume-preview-container rounded-2xl relative shadow-2xl w-full max-w-4xl mx-auto`}
      id="resume-live-preview"
    >
      {/* Accent Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl overflow-hidden" style={accentBgStyle}></div>

      {/* Header Render */}
      {renderHeader()}

      {/* Professional Summary */}
      {data.summary && (
        <div className="summary-section mb-4">
          {renderSectionHeader("Professional Summary")}
          <p className={`text-slate-600 ${selectedSizes.body} ${selectedSpacing}`}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Sections Renders */}
      <div className="space-y-4">
        {renderSections()}
      </div>
    </div>
  );
}

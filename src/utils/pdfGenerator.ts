import { jsPDF } from "jspdf";
import { ResumeData, CustomizationSettings } from "../types";

// Helper to convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Default blue if empty or malformed
  if (!hex || !hex.startsWith("#")) return { r: 37, g: 99, b: 235 };
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r: isNaN(r) ? 37 : r, g: isNaN(g) ? 99 : g, b: isNaN(b) ? 235 : b };
}

export function generateResumePDF(data: ResumeData, settings: CustomizationSettings) {
  // Create a new A4 PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageHeight = 297;
  const pageWidth = 210;

  // Margin sizes based on settings
  let margin = 15;
  if (settings.pageMargins === "compact") margin = 10;
  if (settings.pageMargins === "spacious") margin = 20;

  const contentWidth = pageWidth - 2 * margin;
  let y = margin + 5; // Starting vertical position

  const accentRgb = hexToRgb(settings.accentColor);

  // Helper to check for page overflow
  function checkPageOverflow(estimatedHeight: number) {
    if (y + estimatedHeight > pageHeight - margin) {
      doc.addPage();
      y = margin + 5; // reset top margin
      return true;
    }
    return false;
  }

  // Draw Section Title with colored bottom line
  function drawSectionTitle(title: string) {
    checkPageOverflow(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    
    // Bottom line
    doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
  }

  // --- HEADER SECTION ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // Slate-800
  
  // Center or Align Name & Title
  const name = data.personalInfo.name || "Unnamed Professional";
  const title = data.personalInfo.title || "";
  
  doc.text(name, margin, y);
  y += 6;

  if (title) {
    doc.setFont("helvetica", "oblique");
    doc.setFontSize(12);
    doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
    doc.text(title, margin, y);
    y += 6;
  }

  // Contact info row
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139); // Slate-500

  const contacts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
    data.personalInfo.linkedin,
    data.personalInfo.github,
  ].filter(Boolean);

  const contactText = contacts.join("  |  ");
  const splitContact = doc.splitTextToSize(contactText, contentWidth);
  doc.text(splitContact, margin, y);
  y += (splitContact.length * 4) + 3;

  // --- PROFESSIONAL SUMMARY ---
  if (data.summary) {
    checkPageOverflow(15);
    drawSectionTitle("Professional Summary");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85); // Slate-700
    
    const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += (summaryLines.length * 5) + 6;
  }

  // Render ordered sections
  const sectionIds = settings.sectionOrder || ["experience", "education", "skills", "projects", "certificates", "languages", "references", "interests", "custom"];

  sectionIds.forEach((secId) => {
    switch (secId) {
      case "experience":
        if (data.experiences && data.experiences.length > 0) {
          drawSectionTitle("Professional Experience");
          data.experiences.forEach((exp) => {
            checkPageOverflow(15);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10.5);
            doc.setTextColor(30, 41, 59);
            
            // Role & Company
            const compText = exp.company ? ` - ${exp.company}` : "";
            doc.text(`${exp.role}${compText}`, margin, y);

            // Dates
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            const dateStr = `${exp.startDate || ""} to ${exp.current ? "Present" : exp.endDate || ""}`;
            const dateWidth = doc.getTextWidth(dateStr);
            doc.text(dateStr, pageWidth - margin - dateWidth, y);
            y += 4;

            // Location
            if (exp.location) {
              doc.setFont("helvetica", "oblique");
              doc.setFontSize(9);
              doc.setTextColor(100, 116, 139);
              doc.text(exp.location, margin, y);
              y += 4;
            }

            // Description bullet points
            if (exp.description) {
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9);
              doc.setTextColor(51, 65, 85);

              const descLines = exp.description.split("\n");
              descLines.forEach((line) => {
                const splitBullet = doc.splitTextToSize(line, contentWidth - 4);
                checkPageOverflow(splitBullet.length * 4.5);
                doc.text(splitBullet, margin + 4, y);
                y += (splitBullet.length * 4.5);
              });
            }
            y += 4; // Spacing between jobs
          });
          y += 2;
        }
        break;

      case "education":
        if (data.educations && data.educations.length > 0) {
          drawSectionTitle("Education");
          data.educations.forEach((edu) => {
            checkPageOverflow(12);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10.5);
            doc.setTextColor(30, 41, 59);
            
            const studyText = edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : "";
            doc.text(`${edu.degree}${studyText}`, margin, y);

            // Dates
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            const dateStr = `${edu.startDate || ""} to ${edu.endDate || ""}`;
            const dateWidth = doc.getTextWidth(dateStr);
            doc.text(dateStr, pageWidth - margin - dateWidth, y);
            y += 4;

            // Institution & Location
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9.5);
            doc.setTextColor(51, 65, 85);
            const instLoc = `${edu.institution || ""}${edu.location ? `, ${edu.location}` : ""}`;
            doc.text(instLoc, margin, y);
            y += 4.5;

            // Description
            if (edu.description) {
              doc.setFont("helvetica", "oblique");
              doc.setFontSize(9);
              doc.setTextColor(100, 116, 139);
              const splitDesc = doc.splitTextToSize(edu.description, contentWidth);
              checkPageOverflow(splitDesc.length * 4.5);
              doc.text(splitDesc, margin, y);
              y += (splitDesc.length * 4.5);
            }
            y += 4; // spacing
          });
          y += 2;
        }
        break;

      case "skills":
        if (data.skills && data.skills.length > 0) {
          drawSectionTitle("Key Skills");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(51, 65, 85);

          // Group skills in a comma-separated format
          const skillsList = data.skills.map(s => s.level ? `${s.name} (${s.level})` : s.name).join(", ");
          const splitSkills = doc.splitTextToSize(skillsList, contentWidth);
          checkPageOverflow(splitSkills.length * 5);
          doc.text(splitSkills, margin, y);
          y += (splitSkills.length * 5) + 6;
        }
        break;

      case "projects":
        if (data.projects && data.projects.length > 0) {
          drawSectionTitle("Projects");
          data.projects.forEach((proj) => {
            checkPageOverflow(12);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10.5);
            doc.setTextColor(30, 41, 59);
            doc.text(proj.title, margin, y);

            if (proj.link) {
              doc.setFont("helvetica", "normal");
              doc.setFontSize(8.5);
              doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
              const linkWidth = doc.getTextWidth(proj.link);
              doc.text(proj.link, pageWidth - margin - linkWidth, y);
            }
            y += 4;

            // Role / Tech Stack
            doc.setFont("helvetica", "oblique");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            const details = [proj.role, proj.technologies].filter(Boolean).join("  |  ");
            if (details) {
              doc.text(details, margin, y);
              y += 4;
            }

            // Description
            if (proj.description) {
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9);
              doc.setTextColor(51, 65, 85);
              const splitDesc = doc.splitTextToSize(proj.description, contentWidth);
              checkPageOverflow(splitDesc.length * 4.5);
              doc.text(splitDesc, margin, y);
              y += (splitDesc.length * 4.5);
            }
            y += 4;
          });
          y += 2;
        }
        break;

      case "certificates":
        if (data.certificates && data.certificates.length > 0) {
          drawSectionTitle("Certifications");
          data.certificates.forEach((cert) => {
            checkPageOverflow(8);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);
            doc.setTextColor(30, 41, 59);
            doc.text(cert.title, margin, y);

            // Date
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            const dateWidth = doc.getTextWidth(cert.date || "");
            doc.text(cert.date || "", pageWidth - margin - dateWidth, y);
            y += 4;

            // Issuer
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(51, 65, 85);
            doc.text(cert.issuer, margin, y);
            y += 5;
          });
          y += 2;
        }
        break;

      case "languages":
        if (data.languages && data.languages.length > 0) {
          drawSectionTitle("Languages");
          checkPageOverflow(10);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(51, 65, 85);
          
          const langList = data.languages.map(l => l.proficiency ? `${l.language} (${l.proficiency})` : l.language).join("  •  ");
          doc.text(langList, margin, y);
          y += 8;
        }
        break;

      case "references":
        if (data.references && data.references.length > 0) {
          drawSectionTitle("References");
          data.references.forEach((ref) => {
            checkPageOverflow(10);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);
            doc.setTextColor(30, 41, 59);
            doc.text(ref.name, margin, y);
            y += 4;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(51, 65, 85);
            const titleCompany = `${ref.title || ""}${ref.company ? `, ${ref.company}` : ""}`;
            doc.text(titleCompany, margin, y);

            if (ref.contact) {
              const contactWidth = doc.getTextWidth(ref.contact);
              doc.text(ref.contact, pageWidth - margin - contactWidth, y);
            }
            y += 6;
          });
          y += 2;
        }
        break;

      case "interests":
        if (data.interests && data.interests.length > 0) {
          drawSectionTitle("Interests");
          checkPageOverflow(10);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(51, 65, 85);

          const interestList = data.interests.map(i => i.name).join("  •  ");
          doc.text(interestList, margin, y);
          y += 8;
        }
        break;

      case "custom":
        if (data.customSection && data.customSection.enabled && data.customSection.items.length > 0) {
          drawSectionTitle(data.customSection.title || "Additional Information");
          data.customSection.items.forEach((item) => {
            checkPageOverflow(12);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(30, 41, 59);
            doc.text(item.title, margin, y);

            // Date
            if (item.date) {
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9);
              doc.setTextColor(100, 116, 139);
              const dateWidth = doc.getTextWidth(item.date);
              doc.text(item.date, pageWidth - margin - dateWidth, y);
            }
            y += 4;

            // Subtitle
            if (item.subtitle) {
              doc.setFont("helvetica", "oblique");
              doc.setFontSize(9);
              doc.setTextColor(100, 116, 139);
              doc.text(item.subtitle, margin, y);
              y += 4;
            }

            // Description
            if (item.description) {
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9);
              doc.setTextColor(51, 65, 85);
              const splitDesc = doc.splitTextToSize(item.description, contentWidth);
              checkPageOverflow(splitDesc.length * 4.5);
              doc.text(splitDesc, margin, y);
              y += (splitDesc.length * 4.5);
            }
            y += 4;
          });
          y += 2;
        }
        break;
    }
  });

  // Save the generated document
  const fileName = `${name.toLowerCase().replace(/\s+/g, "_")}_resume.pdf`;
  doc.save(fileName);
}

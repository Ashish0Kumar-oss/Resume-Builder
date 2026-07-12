import React, { useState } from "react";
import { 
  User, Briefcase, GraduationCap, Code, FolderGit, Award, Globe2, 
  Users, Flame, Settings, Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, 
  Download, Upload, RefreshCw, CheckCircle2, Sliders, Image, Type
} from "lucide-react";
import { ResumeData, CustomizationSettings, Experience, Education, Skill, Project, Certificate, Language, Reference, Interest, CustomSectionItem } from "../types";

interface ResumeFormProps {
  data: ResumeData;
  onChangeData: (data: ResumeData) => void;
  settings: CustomizationSettings;
  onChangeSettings: (settings: CustomizationSettings) => void;
  onClear: () => void;
  onDownloadPDF: () => void;
  onPrint: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportJSON: () => void;
}

export default function ResumeForm({
  data,
  onChangeData,
  settings,
  onChangeSettings,
  onClear,
  onDownloadPDF,
  onPrint,
  onImportJSON,
  onExportJSON,
}: ResumeFormProps) {
  // Accordion active state
  const [activeSection, setActiveSection] = useState<string>("personalInfo");

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  // State update helpers
  const updatePersonalInfo = (field: string, value: any) => {
    onChangeData({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateSummary = (value: string) => {
    onChangeData({
      ...data,
      summary: value,
    });
  };

  // Generic helpers for lists
  const addListItem = <T extends { id: string }>(key: keyof ResumeData, newItem: T) => {
    const list = (data[key] as unknown as T[]) || [];
    onChangeData({
      ...data,
      [key]: [...list, newItem],
    });
  };

  const removeListItem = (key: keyof ResumeData, id: string) => {
    const list = (data[key] as any[]) || [];
    onChangeData({
      ...data,
      [key]: list.filter((item) => item.id !== id),
    });
  };

  const updateListItem = (key: keyof ResumeData, id: string, updatedFields: any) => {
    const list = (data[key] as any[]) || [];
    onChangeData({
      ...data,
      [key]: list.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)),
    });
  };

  // Up/down item helpers
  const moveListItem = (key: keyof ResumeData, index: number, direction: "up" | "down") => {
    const list = [...((data[key] as any[]) || [])];
    if (direction === "up" && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === "down" && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    onChangeData({ ...data, [key]: list });
  };

  // Section ordering helpers
  const moveSection = (index: number, direction: "up" | "down") => {
    const order = [...settings.sectionOrder];
    if (direction === "up" && index > 0) {
      const temp = order[index];
      order[index] = order[index - 1];
      order[index - 1] = temp;
    } else if (direction === "down" && index < order.length - 1) {
      const temp = order[index];
      order[index] = order[index + 1];
      order[index + 1] = temp;
    }
    onChangeSettings({ ...settings, sectionOrder: order });
  };

  const sectionLabelMap: Record<string, string> = {
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certificates: "Certificates",
    languages: "Languages",
    references: "References",
    interests: "Interests",
    custom: "Custom Section",
  };

  return (
    <div className="space-y-6 form-sidebar" id="resume-builder-form">
      {/* Action Bar (Top Controls) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-emerald-600">Auto-saved to Local</span>
          </div>
          <div className="flex space-x-2">
            <label className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full cursor-pointer transition-colors">
              <Upload className="h-3.5 w-3.5 mr-1" />
              Import JSON
              <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
            </label>
            <button
              onClick={onExportJSON}
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full cursor-pointer transition-colors"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Export JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
          <button
            onClick={onDownloadPDF}
            className="inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition-colors cursor-pointer"
            id="btn-download-pdf"
          >
            Download PDF
          </button>
          <button
            onClick={onPrint}
            className="inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-sm transition-colors cursor-pointer"
            id="btn-print-resume"
          >
            Print Resume
          </button>
          <button
            onClick={onClear}
            className="inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors cursor-pointer"
            id="btn-clear-resume"
          >
            Clear Data
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {/* Personal Info Accordion */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("personalInfo")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <User className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Personal Information</h3>
                <p className="text-xs text-slate-500 font-normal">Contact info, name, photo options</p>
              </div>
            </div>
            {activeSection === "personalInfo" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "personalInfo" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex items-center space-x-4 pb-2 border-b border-slate-50">
                <label className="flex items-center space-x-2 text-sm text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.personalInfo.photoOn}
                    onChange={(e) => updatePersonalInfo("photoOn", e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Show Profile Photo Input</span>
                </label>
              </div>

              {data.personalInfo.photoOn && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Profile Photo URL</label>
                  <input
                    type="text"
                    value={data.personalInfo.photo}
                    onChange={(e) => updatePersonalInfo("photo", e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Professional Title</label>
                <input
                  type="text"
                  value={data.personalInfo.title}
                  onChange={(e) => updatePersonalInfo("title", e.target.value)}
                  placeholder="e.g. Senior Software Architect"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  placeholder="e.g. john@domain.com"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  placeholder="e.g. +1 (555) 019-2834"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Website Portfolio</label>
                <input
                  type="url"
                  value={data.personalInfo.website}
                  onChange={(e) => updatePersonalInfo("website", e.target.value)}
                  placeholder="e.g. https://myportfolio.com"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Location</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                  placeholder="e.g. New York, NY"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">GitHub Username</label>
                <input
                  type="text"
                  value={data.personalInfo.github}
                  onChange={(e) => updatePersonalInfo("github", e.target.value)}
                  placeholder="e.g. github.com/johndoe"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">LinkedIn Profile</label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                  placeholder="e.g. linkedin.com/in/johndoe"
                  className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("summary")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Award className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Professional Summary</h3>
                <p className="text-xs text-slate-500 font-normal">Introductory paragraph of your career highlights</p>
              </div>
            </div>
            {activeSection === "summary" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "summary" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Summary Content</label>
              <textarea
                value={data.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Write a concise 3-4 sentence professional summary highlighting your top experience, core stack, and major achievements..."
                rows={5}
                className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          )}
        </div>

        {/* Experience Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("experience")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Briefcase className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Experience</h3>
                <p className="text-xs text-slate-500 font-normal">Corporate roles, achievements, responsibilities</p>
              </div>
            </div>
            {activeSection === "experience" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "experience" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-4">
              {data.experiences.map((exp, idx) => (
                <div key={exp.id} className="p-4 border border-slate-100 rounded-lg space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Role #{idx + 1}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => moveListItem("experiences", idx, "up")}
                        disabled={idx === 0}
                        className="p-1 hover:bg-white text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => moveListItem("experiences", idx, "down")}
                        disabled={idx === data.experiences.length - 1}
                        className="p-1 hover:bg-white text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeListItem("experiences", exp.id)}
                        className="p-1 hover:bg-red-50 text-red-500 rounded cursor-pointer"
                        title="Delete Role"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateListItem("experiences", exp.id, { company: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Job Role / Position</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateListItem("experiences", exp.id, { role: e.target.value })}
                        placeholder="e.g. Lead Software Engineer"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateListItem("experiences", exp.id, { location: e.target.value })}
                        placeholder="e.g. Seattle, WA"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Dates</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateListItem("experiences", exp.id, { startDate: e.target.value })}
                          className="w-full text-xs rounded border border-slate-200 px-2 py-1"
                        />
                        <span className="text-xs text-slate-400">to</span>
                        {!exp.current ? (
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateListItem("experiences", exp.id, { endDate: e.target.value })}
                            className="w-full text-xs rounded border border-slate-200 px-2 py-1"
                          />
                        ) : (
                          <span className="w-full text-xs bg-slate-100 px-2 py-1.5 text-center text-slate-600 rounded border font-medium">Present</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                      id={`current-job-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateListItem("experiences", exp.id, { current: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`current-job-${exp.id}`} className="text-xs text-slate-600 cursor-pointer font-medium">I currently work here</label>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Roles & Achievements (Bullet format)</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateListItem("experiences", exp.id, { description: e.target.value })}
                      placeholder="Use bullet points (•) for impact statements:&#10;• Led optimization migration, reducing load times by 20%.&#10;• Coached a core squad of 4 junior developers."
                      rows={4}
                      className="w-full text-xs rounded border border-slate-200 px-2 py-1.5"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => addListItem("experiences", {
                  id: `exp-${Date.now()}`,
                  company: "",
                  role: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  description: ""
                })}
                className="w-full flex items-center justify-center py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-slate-50/20"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Experience Position
              </button>
            </div>
          )}
        </div>

        {/* Education Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("education")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Education</h3>
                <p className="text-xs text-slate-500 font-normal">Degrees, institutions, honors, dates</p>
              </div>
            </div>
            {activeSection === "education" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "education" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-4">
              {data.educations.map((edu, idx) => (
                <div key={edu.id} className="p-4 border border-slate-100 rounded-lg space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Education #{idx + 1}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => moveListItem("educations", idx, "up")}
                        disabled={idx === 0}
                        className="p-1 hover:bg-white text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => moveListItem("educations", idx, "down")}
                        disabled={idx === data.educations.length - 1}
                        className="p-1 hover:bg-white text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeListItem("educations", edu.id)}
                        className="p-1 hover:bg-red-50 text-red-500 rounded cursor-pointer"
                        title="Delete Degree"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Institution Name</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateListItem("educations", edu.id, { institution: e.target.value })}
                        placeholder="e.g. Stanford University"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateListItem("educations", edu.id, { degree: e.target.value })}
                        placeholder="e.g. B.S. / M.S. / High School Diploma"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Field of Study</label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateListItem("educations", edu.id, { fieldOfStudy: e.target.value })}
                        placeholder="e.g. Computer Science"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateListItem("educations", edu.id, { location: e.target.value })}
                        placeholder="e.g. Stanford, CA"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Start Date</label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateListItem("educations", edu.id, { startDate: e.target.value })}
                        className="w-full text-xs rounded border border-slate-200 px-2 py-1 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">End Date (or Anticipated)</label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateListItem("educations", edu.id, { endDate: e.target.value })}
                        className="w-full text-xs rounded border border-slate-200 px-2 py-1 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Details, GPAs or Honors</label>
                    <input
                      type="text"
                      value={edu.description}
                      onChange={(e) => updateListItem("educations", edu.id, { description: e.target.value })}
                      placeholder="e.g. GPA 3.9/4.0. Completed senior project on secure distributed consensus."
                      className="w-full text-xs rounded border border-slate-200 px-2 py-1.5"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => addListItem("educations", {
                  id: `edu-${Date.now()}`,
                  institution: "",
                  degree: "",
                  fieldOfStudy: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: ""
                })}
                className="w-full flex items-center justify-center py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-slate-50/20"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Education
              </button>
            </div>
          )}
        </div>

        {/* Skills Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("skills")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Code className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Skills</h3>
                <p className="text-xs text-slate-500 font-normal">Technical stacks, proficiencies, tools</p>
              </div>
            </div>
            {activeSection === "skills" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "skills" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.skills.map((sk) => (
                  <div key={sk.id} className="flex items-center space-x-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <input
                      type="text"
                      value={sk.name}
                      onChange={(e) => updateListItem("skills", sk.id, { name: e.target.value })}
                      placeholder="e.g. TypeScript"
                      className="w-1/2 text-xs rounded border border-slate-200 px-2 py-1 bg-white focus:outline-none"
                    />
                    <select
                      value={sk.level}
                      onChange={(e) => updateListItem("skills", sk.id, { level: e.target.value })}
                      className="w-5/12 text-xs rounded border border-slate-200 px-1 py-1 bg-white focus:outline-none"
                    >
                      <option value="">No level tag</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <button
                      onClick={() => removeListItem("skills", sk.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer"
                      title="Remove Skill"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addListItem("skills", {
                  id: `sk-${Date.now()}`,
                  name: "",
                  level: ""
                })}
                className="w-full flex items-center justify-center py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-slate-50/20"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Key Skill
              </button>
            </div>
          )}
        </div>

        {/* Projects Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("projects")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <FolderGit className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Projects</h3>
                <p className="text-xs text-slate-500 font-normal">Side initiatives, tech showcases, portfolios</p>
              </div>
            </div>
            {activeSection === "projects" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "projects" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-4">
              {data.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 border border-slate-100 rounded-lg space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Project #{idx + 1}</span>
                    <button
                      onClick={() => removeListItem("projects", proj.id)}
                      className="p-1 hover:bg-red-50 text-red-500 rounded cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateListItem("projects", proj.id, { title: e.target.value })}
                        placeholder="e.g. Smart Scheduler API"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">My Role</label>
                      <input
                        type="text"
                        value={proj.role}
                        onChange={(e) => updateListItem("projects", proj.id, { role: e.target.value })}
                        placeholder="e.g. Lead Architect"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Technologies Used</label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={(e) => updateListItem("projects", proj.id, { technologies: e.target.value })}
                        placeholder="e.g. React, Redis, Docker"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Project Link URL</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => updateListItem("projects", proj.id, { link: e.target.value })}
                        placeholder="e.g. github.com/myusername/scheduler"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Project Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateListItem("projects", proj.id, { description: e.target.value })}
                      placeholder="Explain what problem this project solved, what was built, and any quantitative outcomes..."
                      rows={3}
                      className="w-full text-xs rounded border border-slate-200 px-2 py-1.5"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => addListItem("projects", {
                  id: `proj-${Date.now()}`,
                  title: "",
                  role: "",
                  technologies: "",
                  link: "",
                  description: ""
                })}
                className="w-full flex items-center justify-center py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-slate-50/20"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Project
              </button>
            </div>
          )}
        </div>

        {/* Certificates Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("certificates")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Award className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Certificates</h3>
                <p className="text-xs text-slate-500 font-normal">Standard licensing, AWS, Scrum, PMI, etc.</p>
              </div>
            </div>
            {activeSection === "certificates" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "certificates" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-4">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="p-4 border border-slate-100 rounded-lg space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Certificate</span>
                    <button
                      onClick={() => removeListItem("certificates", cert.id)}
                      className="p-1 hover:bg-red-50 text-red-500 rounded cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Certificate Name</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => updateListItem("certificates", cert.id, { title: e.target.value })}
                        placeholder="e.g. AWS Solutions Architect Professional"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Issuer Agency</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateListItem("certificates", cert.id, { issuer: e.target.value })}
                        placeholder="e.g. Amazon Web Services"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Date Achieved</label>
                      <input
                        type="month"
                        value={cert.date}
                        onChange={(e) => updateListItem("certificates", cert.id, { date: e.target.value })}
                        className="w-full text-xs rounded border border-slate-200 px-2 py-1 mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addListItem("certificates", {
                  id: `cert-${Date.now()}`,
                  title: "",
                  issuer: "",
                  date: "",
                  link: ""
                })}
                className="w-full flex items-center justify-center py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-slate-50/20"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Certificate
              </button>
            </div>
          )}
        </div>

        {/* Languages Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("languages")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Globe2 className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Languages</h3>
                <p className="text-xs text-slate-500 font-normal">Native, fluent, or bilingual abilities</p>
              </div>
            </div>
            {activeSection === "languages" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "languages" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex items-center space-x-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <input
                      type="text"
                      value={l.language}
                      onChange={(e) => updateListItem("languages", l.id, { language: e.target.value })}
                      placeholder="e.g. Spanish"
                      className="w-1/2 text-xs rounded border border-slate-200 px-2 py-1 bg-white focus:outline-none"
                    />
                    <select
                      value={l.proficiency}
                      onChange={(e) => updateListItem("languages", l.id, { proficiency: e.target.value })}
                      className="w-5/12 text-xs rounded border border-slate-200 px-1 py-1 bg-white focus:outline-none"
                    >
                      <option value="">No tag</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Professional">Professional</option>
                      <option value="Conversational">Conversational</option>
                    </select>
                    <button
                      onClick={() => removeListItem("languages", l.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addListItem("languages", {
                  id: `lang-${Date.now()}`,
                  language: "",
                  proficiency: ""
                })}
                className="w-full flex items-center justify-center py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-slate-50/20"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Language
              </button>
            </div>
          )}
        </div>

        {/* References Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("references")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">References</h3>
                <p className="text-xs text-slate-500 font-normal">Manager recommendations, emails, contacts</p>
              </div>
            </div>
            {activeSection === "references" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "references" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-4">
              {data.references.map((ref) => (
                <div key={ref.id} className="p-4 border border-slate-100 rounded-lg space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Reference Contact</span>
                    <button
                      onClick={() => removeListItem("references", ref.id)}
                      className="p-1 hover:bg-red-50 text-red-500 rounded cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Contact Full Name</label>
                      <input
                        type="text"
                        value={ref.name}
                        onChange={(e) => updateListItem("references", ref.id, { name: e.target.value })}
                        placeholder="e.g. Dr. Sarah Jenkins"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Professional Title</label>
                      <input
                        type="text"
                        value={ref.title}
                        onChange={(e) => updateListItem("references", ref.id, { title: e.target.value })}
                        placeholder="e.g. VP of Engineering"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Company Name</label>
                      <input
                        type="text"
                        value={ref.company}
                        onChange={(e) => updateListItem("references", ref.id, { company: e.target.value })}
                        placeholder="e.g. TechNova Inc"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Email or Phone contact</label>
                      <input
                        type="text"
                        value={ref.contact}
                        onChange={(e) => updateListItem("references", ref.id, { contact: e.target.value })}
                        placeholder="e.g. sarah.jenkins@technova.com"
                        className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addListItem("references", {
                  id: `ref-${Date.now()}`,
                  name: "",
                  title: "",
                  company: "",
                  contact: ""
                })}
                className="w-full flex items-center justify-center py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-slate-50/20"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Reference
              </button>
            </div>
          )}
        </div>

        {/* Custom Section Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("custom")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Flame className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Custom Section</h3>
                <p className="text-xs text-slate-500 font-normal">Publications, volunteering, awards, honors</p>
              </div>
            </div>
            {activeSection === "custom" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "custom" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <label className="flex items-center space-x-2 text-sm text-slate-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.customSection.enabled}
                    onChange={(e) => onChangeData({
                      ...data,
                      customSection: { ...data.customSection, enabled: e.target.checked }
                    })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enable Custom Section</span>
                </label>
              </div>

              {data.customSection.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Section Header Title</label>
                    <input
                      type="text"
                      value={data.customSection.title}
                      onChange={(e) => onChangeData({
                        ...data,
                        customSection: { ...data.customSection, title: e.target.value }
                      })}
                      placeholder="e.g. Publications / Volunteering"
                      className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </div>

                  {data.customSection.items.map((item, idx) => (
                    <div key={item.id} className="p-4 border border-slate-100 rounded-lg space-y-3 bg-slate-50/50">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase">Item #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const items = data.customSection.items.filter((i) => i.id !== item.id);
                            onChangeData({
                              ...data,
                              customSection: { ...data.customSection, items }
                            });
                          }}
                          className="p-1 hover:bg-red-50 text-red-500 rounded cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold uppercase text-slate-500">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const items = data.customSection.items.map((i) => i.id === item.id ? { ...i, title: e.target.value } : i);
                              onChangeData({ ...data, customSection: { ...data.customSection, items } });
                            }}
                            placeholder="e.g. Research Article on AI Architecture"
                            className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-500">Subtitle / Publisher</label>
                          <input
                            type="text"
                            value={item.subtitle}
                            onChange={(e) => {
                              const items = data.customSection.items.map((i) => i.id === item.id ? { ...i, subtitle: e.target.value } : i);
                              onChangeData({ ...data, customSection: { ...data.customSection, items } });
                            }}
                            placeholder="e.g. dev.to / IEEE Conference"
                            className="w-full text-sm rounded border border-slate-200 px-2 py-1.5 mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-500">Date</label>
                          <input
                            type="month"
                            value={item.date}
                            onChange={(e) => {
                              const items = data.customSection.items.map((i) => i.id === item.id ? { ...i, date: e.target.value } : i);
                              onChangeData({ ...data, customSection: { ...data.customSection, items } });
                            }}
                            className="w-full text-xs rounded border border-slate-200 px-2 py-1 mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Details & Explanations</label>
                        <textarea
                          value={item.description}
                          onChange={(e) => {
                            const items = data.customSection.items.map((i) => i.id === item.id ? { ...i, description: e.target.value } : i);
                            onChangeData({ ...data, customSection: { ...data.customSection, items } });
                          }}
                          placeholder="Briefly describe this custom achievement or activity details..."
                          rows={2}
                          className="w-full text-xs rounded border border-slate-200 px-2 py-1.5"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const items = [...data.customSection.items, {
                        id: `cust-${Date.now()}`,
                        title: "",
                        subtitle: "",
                        date: "",
                        description: ""
                      }];
                      onChangeData({
                        ...data,
                        customSection: { ...data.customSection, items }
                      });
                    }}
                    className="w-full flex items-center justify-center py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-slate-50/20"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Custom Item
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section Order Accordion */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("sectionOrder")}
            className="w-full flex items-center justify-between px-5 py-4 font-sans font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Sliders className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Section Order</h3>
                <p className="text-xs text-slate-500 font-normal">Reorder the layout flow of resume sections</p>
              </div>
            </div>
            {activeSection === "sectionOrder" ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {activeSection === "sectionOrder" && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-2">
              <p className="text-xs text-slate-400 pb-2">Rearrange how sections appear on the final PDF. Personal summary and headers are always locked at the top.</p>
              {settings.sectionOrder.map((secId, idx) => (
                <div key={secId} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-xs font-semibold text-slate-700">{sectionLabelMap[secId] || secId}</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => moveSection(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 hover:bg-white text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => moveSection(idx, "down")}
                      disabled={idx === settings.sectionOrder.length - 1}
                      className="p-1 hover:bg-white text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

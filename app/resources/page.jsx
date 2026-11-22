'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  FileText,
  Eye,
  Download,
  X,
  ChevronDown,
} from 'lucide-react';
import PdfModal from '../../components/PdfModal';

const SAMPLE_RESOURCES = [
  {
    _id: 'sample-1',
    title: 'Cardiovascular Physiology Essentials',
    description: 'Sample study guide to cardiac cycles, pressure changes, and circulation.',
    subject: { name: 'Physiology' },
    docType: 'NOTE',
    category: 'PRESENTATIONS',
    department: 'Cardiovascular System',
    fileSize: '2.8 MB',
    year: '2024',
    fileUrl: '/sample.pdf',
  },
  {
    _id: 'sample-2',
    title: 'Autonomic Pharmacology — Quick Review',
    description: 'Sample framework for comparing autonomic drug classes and actions.',
    subject: { name: 'Pharmacology' },
    docType: 'NOTE',
    category: 'STUDY NOTES',
    department: 'Autonomic Drugs',
    fileSize: '2.8 MB',
    year: '2024',
    fileUrl: '/sample.pdf',
  },
  {
    _id: 'sample-3',
    title: 'Human Anatomy — Upper Limb',
    description: 'Sample overview covering bones, muscles, nerves, and clinical anatomy.',
    subject: { name: 'Anatomy' },
    docType: 'NOTE',
    category: 'STUDY NOTES',
    department: 'Upper Limb',
    fileSize: '2.8 MB',
    year: '2023',
    fileUrl: '/sample.pdf',
  },
  {
    _id: 'sample-4',
    title: 'General Anatomy — Important Questions',
    description: 'A clearly labelled sample question set for revision and self-assessment.',
    subject: { name: 'Anatomy' },
    docType: 'PYQ',
    category: 'PREVIOUS YEAR PAPERS',
    department: 'General Anatomy',
    fileSize: '2.8 MB',
    year: '2023',
    fileUrl: '/sample.pdf',
  },
  {
    _id: 'sample-5',
    title: 'Vital Signs — Clinical Checklist',
    description: 'Sample educational checklist for recording foundational observations.',
    subject: { name: 'Fundamentals of Nursing' },
    docType: 'NOTE',
    category: 'ASSIGNMENTS',
    department: 'Clinical Assessment',
    fileSize: '2.8 MB',
    year: '2024',
    fileUrl: '/sample.pdf',
  },
  {
    _id: 'sample-6',
    title: 'Gait Cycle — Visual Revision',
    description: 'Sample revision material for gait phases and key biomechanical concepts.',
    subject: { name: 'Biomechanics' },
    docType: 'NOTE',
    category: 'GUIDE',
    department: 'Human Gait',
    fileSize: '2.8 MB',
    year: '2023',
    fileUrl: '/sample.pdf',
  },
];

const CURATED_SUBJECTS = [
  {
    level: 'First Professional',
    name: 'Anatomy',
    desc: 'Human structure, regional anatomy, and clinical relationships.',
  },
  {
    level: 'First Professional',
    name: 'Physiology',
    desc: 'How cells, organs, and body systems function.',
  },
  {
    level: 'First Professional',
    name: 'Biochemistry',
    desc: 'Molecular processes underlying health and disease.',
  },
  {
    level: 'Second Professional',
    name: 'Pathology',
    desc: 'Mechanisms and morphology of human disease.',
  },
  {
    level: 'Semester 3',
    name: 'Pharmacology',
    desc: 'Drug action, therapeutic use, and safety.',
  },
  {
    level: 'Year 1',
    name: 'Oral Anatomy',
    desc: 'Dental morphology and oral structures.',
  },
  {
    level: 'Year 1',
    name: 'Fundamentals of Nursing',
    desc: 'Core principles of safe, compassionate patient care.',
  },
  {
    level: 'Semester 2',
    name: 'Biomechanics',
    desc: 'Mechanics of movement and musculoskeletal function.',
  },
];

function LibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [course, setCourse] = useState(searchParams.get('course') || '');
  const [academicLevel, setAcademicLevel] = useState(searchParams.get('academicLevel') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [resourceType, setResourceType] = useState(searchParams.get('resourceType') || searchParams.get('docType') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  const [resources, setResources] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResource, setPreviewResource] = useState(null);

  // Sync state if URL changes
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCourse(searchParams.get('course') || '');
    setAcademicLevel(searchParams.get('academicLevel') || '');
    setSubject(searchParams.get('subject') || '');
    setResourceType(searchParams.get('resourceType') || searchParams.get('docType') || '');
    setSortBy(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  // Fetch subjects list for filter dropdown
  useEffect(() => {
    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) setSubjectsList(data.data);
      })
      .catch((err) => console.error('Error fetching subjects:', err));
  }, []);

  // Fetch resources based on current filters
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (subject) params.set('subject', subject);
        if (resourceType) params.set('docType', resourceType);
        if (sortBy) params.set('sort', sortBy);

        const res = await fetch(`/api/resources?${params.toString()}`);
        const data = await res.json();
        if (data?.data && data.data.length > 0) {
          setResources(data.data);
        } else if (!search && !subject && !resourceType) {
          // If no database items yet, show sample items matching image exactly
          setResources(SAMPLE_RESOURCES);
        } else {
          // Filter sample resources locally if backend returns empty
          const filtered = SAMPLE_RESOURCES.filter((item) => {
            if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.description.toLowerCase().includes(search.toLowerCase())) {
              return false;
            }
            if (resourceType && item.docType !== resourceType) {
              return false;
            }
            return true;
          });
          setResources(filtered);
        }
      } catch (err) {
        console.error('Failed to load resources:', err);
        setResources(SAMPLE_RESOURCES);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [search, subject, resourceType, sortBy]);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });
    router.push(`/resources?${params.toString()}`);
  };

  const handleClearAll = () => {
    setSearch('');
    setCourse('');
    setAcademicLevel('');
    setSubject('');
    setResourceType('');
    setSortBy('newest');
    router.push('/resources');
  };

  const handleDownload = (resource) => {
    if (resource._id && !resource._id.startsWith('sample')) {
      window.open(`/api/resources/${resource._id}/download`, '_blank');
    } else {
      window.open(resource.fileUrl || '/logo.jpg', '_blank');
    }
  };

  const handlePreview = (resource) => {
    setPreviewResource(resource);
  };

  return (
    <div className="bg-[#FAFBFB] min-h-screen py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#127177] block mb-3">
            MLTIFY POINT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-3">
            Explore the Study Library.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Your academic resources, organized for easier discovery.
          </p>

          {/* Large Search Bar */}
          <div className="mt-8 relative max-w-4xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              placeholder="Search subjects, chapters, notes, or study materials..."
              className="w-full pl-12 pr-10 py-3.5 bg-white text-slate-900 rounded-xl border border-slate-200/90 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#127177]/20 focus:border-[#127177] text-sm placeholder-slate-400 font-normal"
            />
            {search && (
              <button
                onClick={() => updateFilters({ search: '' })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Two Column Layout: Left Filter Sidebar, Right Resources List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-slate-900">Refine resources</span>
              <button
                onClick={handleClearAll}
                className="text-xs font-semibold text-[#127177] hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Course Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Course
              </label>
              <select
                value={course}
                onChange={(e) => updateFilters({ course: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 text-slate-700 text-xs font-medium py-2 px-3 rounded-lg focus:outline-none focus:border-[#127177]"
              >
                <option value="">All courses</option>
                <option value="B.Sc MLT">B.Sc MLT</option>
                <option value="DMLT">DMLT</option>
                <option value="M.Sc MLT">M.Sc MLT</option>
              </select>
            </div>

            {/* Academic Level */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Academic Level
              </label>
              <select
                value={academicLevel}
                onChange={(e) => updateFilters({ academicLevel: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 text-slate-700 text-xs font-medium py-2 px-3 rounded-lg focus:outline-none focus:border-[#127177]"
              >
                <option value="">All academic levels</option>
                <option value="First Professional">First Professional</option>
                <option value="Second Professional">Second Professional</option>
                <option value="Year 1">Year 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => updateFilters({ subject: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 text-slate-700 text-xs font-medium py-2 px-3 rounded-lg focus:outline-none focus:border-[#127177]"
              >
                <option value="">All subjects</option>
                {subjectsList.length > 0 ? (
                  subjectsList.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Physiology">Physiology</option>
                    <option value="Pharmacology">Pharmacology</option>
                    <option value="Anatomy">Anatomy</option>
                    <option value="Pathology">Pathology</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Biomechanics">Biomechanics</option>
                  </>
                )}
              </select>
            </div>

            {/* Resource Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Resource Type
              </label>
              <select
                value={resourceType}
                onChange={(e) => updateFilters({ resourceType: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 text-slate-700 text-xs font-medium py-2 px-3 rounded-lg focus:outline-none focus:border-[#127177]"
              >
                <option value="">All resource types</option>
                <option value="PYQ">Question Papers (PYQ)</option>
                <option value="NOTE">Study Notes</option>
                <option value="PRESENTATION">Presentations</option>
                <option value="ASSIGNMENT">Assignments</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 text-slate-700 text-xs font-medium py-2 px-3 rounded-lg focus:outline-none focus:border-[#127177]"
              >
                <option value="newest">Recently Added</option>
                <option value="downloads">Most Popular</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Right Resource List */}
          <div className="lg:col-span-9 space-y-4">
            <div className="mb-2">
              <h2 className="text-sm font-bold text-slate-900">
                {resources.length} {resources.length === 1 ? 'resource' : 'resources'} found
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every listed item has a working preview and download.
              </p>
            </div>

            {loading ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
                Loading academic resources...
              </div>
            ) : resources.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <p className="text-slate-600 font-semibold mb-2">No matching resources found.</p>
                <p className="text-xs text-slate-400 mb-4">Try clearing filters or searching another keyword.</p>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-[#127177] text-white text-xs font-semibold rounded-lg"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {resources.map((res) => {
                  const subjectName = res.subject?.name || res.subject || 'Allied Health';
                  const docTypeLabel =
                    res.category ||
                    (res.docType === 'PYQ' ? 'QUESTION PAPERS' : 'STUDY NOTES');
                  const sizeOrYear = res.fileSize || `${res.year || '2024'} • 2.8 MB`;

                  return (
                    <div
                      key={res._id}
                      className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Left Side: Icon & Details */}
                      <div className="flex items-start gap-4 min-w-0">
                        {/* PDF Box Badge */}
                        <div className="w-12 h-14 rounded-lg bg-[#E6F4F1] border border-teal-200/80 flex flex-col items-center justify-center flex-shrink-0 text-[#127177]">
                          <FileText className="w-5 h-5 stroke-[1.8]" />
                          <span className="text-[9px] font-bold tracking-wider mt-0.5 uppercase">
                            PDF
                          </span>
                        </div>

                        {/* Title and tags */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#127177] tracking-wider uppercase mb-1">
                            <span>{subjectName}</span>
                            <span>•</span>
                            <span>{docTypeLabel}</span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1 truncate">
                            {res.title}
                          </h3>

                          <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                            {res.description || 'Verified university syllabus lecture guide and reference paper.'}
                          </p>

                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span>{res.department || subjectName}</span>
                            <span>•</span>
                            <span>PDF</span>
                            <span>•</span>
                            <span>{sizeOrYear}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-2.5 flex-shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handlePreview(res)}
                          className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs hover:bg-slate-50"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>

                        <button
                          onClick={() => handleDownload(res)}
                          className="px-4 py-2 rounded-lg bg-[#127177] hover:bg-[#0E5B60] text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Browse by subject */}
        <div className="pt-10 border-t border-slate-200/80">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Browse by subject</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURATED_SUBJECTS.map((subj) => (
              <div
                key={subj.name}
                onClick={() => updateFilters({ search: subj.name })}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm cursor-pointer transition group"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#127177] block mb-2">
                  {subj.level}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#127177] transition mb-1.5">
                  {subj.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {subj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewResource && (
        <PdfModal
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
        />
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFBFB] p-12 text-center text-slate-400">
          Loading MLTify Point Library...
        </div>
      }
    >
      <LibraryContent />
    </Suspense>
  );
}

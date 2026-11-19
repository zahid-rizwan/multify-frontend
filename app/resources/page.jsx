'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Eye, Download, FileText, X } from 'lucide-react';
import ResourceCard from '../../components/ResourceCard';
import PdfModal from '../../components/PdfModal';

// Sample resources exactly matching the Figma Explore Library screen
const SAMPLE_RESOURCES = [
  {
    _id: 'sample-1',
    title: 'Cardiovascular Physiology Essentials',
    categoryTag: 'PHYSIOLOGY • PRESENTATIONS',
    subject: { name: 'Physiology' },
    description: 'Sample study guide to cardiac cycles, pressure changes, and circulation.',
    topic: 'Cardiovascular System',
    docType: 'PRESENTATION',
    course: 'Medicine / MBBS',
    academicLevel: 'First Professional',
    fileSize: 2.8 * 1024 * 1024,
  },
  {
    _id: 'sample-2',
    title: 'Autonomic Pharmacology — Quick Review',
    categoryTag: 'PHARMACOLOGY • STUDY NOTES',
    subject: { name: 'Pharmacology' },
    description: 'Sample framework for comparing autonomic drug classes and actions.',
    topic: 'Autonomic Drugs',
    docType: 'NOTE',
    course: 'Medicine / MBBS',
    academicLevel: 'Semester 3',
    fileSize: 2.8 * 1024 * 1024,
  },
  {
    _id: 'sample-3',
    title: 'Human Anatomy — Upper Limb',
    categoryTag: 'ANATOMY • STUDY NOTES',
    subject: { name: 'Anatomy' },
    description: 'Sample overview covering bones, muscles, nerves, and clinical anatomy.',
    topic: 'Upper Limb',
    docType: 'NOTE',
    course: 'Medicine / MBBS',
    academicLevel: 'First Professional',
    fileSize: 2.8 * 1024 * 1024,
  },
  {
    _id: 'sample-4',
    title: 'General Anatomy — Important Questions',
    categoryTag: 'ANATOMY • PREVIOUS YEAR PAPERS',
    subject: { name: 'Anatomy' },
    description: 'A cleanly labelled sample question set for revision and self-assessment.',
    topic: 'General Anatomy',
    docType: 'PYQ',
    course: 'Medicine / MBBS',
    academicLevel: 'First Professional',
    fileSize: 2.8 * 1024 * 1024,
  },
  {
    _id: 'sample-5',
    title: 'Vital Signs — Clinical Checklist',
    categoryTag: 'FUNDAMENTALS OF NURSING • ASSIGNMENTS',
    subject: { name: 'Fundamentals of Nursing' },
    description: 'Sample educational checklist for recording foundational observations.',
    topic: 'Clinical Assessment',
    docType: 'ASSIGNMENT',
    course: 'Nursing',
    academicLevel: 'Year 1',
    fileSize: 2.8 * 1024 * 1024,
  },
  {
    _id: 'sample-6',
    title: 'Gait Cycle — Visual Revision',
    categoryTag: 'BIOMECHANICS • MCQS',
    subject: { name: 'Biomechanics' },
    description: 'Sample revision material for gait phases and key biomechanical concepts.',
    topic: 'Human Gait',
    docType: 'MCQ',
    course: 'Physiotherapy',
    academicLevel: 'Semester 2',
    fileSize: 2.8 * 1024 * 1024,
  },
];

// 8 Subjects matching the Figma "Browse by subject" section
const BROWSE_SUBJECTS = [
  {
    id: 'anat',
    level: 'First Professional',
    name: 'Anatomy',
    description: 'Human structure, regional anatomy, and clinical relationships.',
  },
  {
    id: 'phys',
    level: 'First Professional',
    name: 'Physiology',
    description: 'How cells, organs, and body systems function.',
  },
  {
    id: 'biochem',
    level: 'First Professional',
    name: 'Biochemistry',
    description: 'Molecular processes underlying health and disease.',
  },
  {
    id: 'patho',
    level: 'Second Professional',
    name: 'Pathology',
    description: 'Mechanisms and morphology of human disease.',
  },
  {
    id: 'pharm',
    level: 'Semester 3',
    name: 'Pharmacology',
    description: 'Drug action, therapeutic use, and safety.',
  },
  {
    id: 'oral-anat',
    level: 'Year 1',
    name: 'Oral Anatomy',
    description: 'Dental morphology and oral structures.',
  },
  {
    id: 'nursing',
    level: 'Year 1',
    name: 'Fundamentals of Nursing',
    description: 'Core principles of safe, compassionate patient care.',
  },
  {
    id: 'biomech',
    level: 'Semester 2',
    name: 'Biomechanics',
    description: 'Mechanics of movement and musculoskeletal function.',
  },
];

function LibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filters state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [course, setCourse] = useState(searchParams.get('course') || '');
  const [academicLevel, setAcademicLevel] = useState(searchParams.get('academicLevel') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [resourceType, setResourceType] = useState(searchParams.get('resourceType') || searchParams.get('docType') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recent');

  const [dbResources, setDbResources] = useState([]);
  const [dbSubjects, setDbSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResource, setPreviewResource] = useState(null);

  // Sync state with URL params
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCourse(searchParams.get('course') || '');
    setAcademicLevel(searchParams.get('academicLevel') || '');
    setSubject(searchParams.get('subject') || '');
    setResourceType(searchParams.get('resourceType') || searchParams.get('docType') || '');
    setSort(searchParams.get('sort') || 'recent');
  }, [searchParams]);

  // Fetch subjects from backend for the filter dropdown
  useEffect(() => {
    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) {
          setDbSubjects(data.data);
        }
      })
      .catch(() => setDbSubjects([]));
  }, []);

  // Fetch real resources from backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (subject) params.set('subject', subject);
        if (resourceType) params.set('docType', resourceType);

        const res = await fetch(`/api/resources?${params.toString()}`);
        const data = await res.json();
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setDbResources(data.data);
        } else {
          setDbResources([]);
        }
      } catch (err) {
        console.error('Failed to load resources:', err);
        setDbResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [search, subject, resourceType]);

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

  const handleClearFilters = () => {
    setSearch('');
    setCourse('');
    setAcademicLevel('');
    setSubject('');
    setResourceType('');
    setSort('recent');
    router.push('/resources');
  };

  // Combine or filter resources
  const displayResources = useMemo(() => {
    // If we have resources from backend, use them; otherwise use sample resources
    const sourceList = dbResources.length > 0 ? dbResources : SAMPLE_RESOURCES;

    return sourceList.filter((item) => {
      // Search text filter
      if (search) {
        const query = search.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesSub = item.subject?.name?.toLowerCase().includes(query) || item.topic?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSub) return false;
      }

      // Course filter
      if (course && item.course && item.course !== course) {
        return false;
      }

      // Academic level filter
      if (academicLevel && item.academicLevel && item.academicLevel !== academicLevel) {
        return false;
      }

      // Subject filter
      if (subject) {
        const itemSubId = item.subject?._id || item.subject;
        const itemSubName = item.subject?.name || item.subjectName;
        if (itemSubId !== subject && itemSubName !== subject) {
          return false;
        }
      }

      // Resource Type filter
      if (resourceType) {
        const itemType = item.docType || item.categoryTag;
        if (itemType !== resourceType && !item.categoryTag?.includes(resourceType)) {
          return false;
        }
      }

      return true;
    });
  }, [dbResources, search, course, academicLevel, subject, resourceType]);

  const handleDownload = (resource) => {
    if (resource._id?.startsWith('sample-')) {
      alert('This is a demonstration sample document from the Figma design.');
      return;
    }
    window.open(`/api/resources/${resource._id}/download`, '_blank');
  };

  const handleSubjectClick = (subjName) => {
    updateFilters({ subject: subjName });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F4EFE6] min-h-screen pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="text-xs font-bold text-[#127177] tracking-[0.16em] uppercase mb-3">
            MEDORA LIBRARY
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0D1520] tracking-tight leading-none mb-3">
            Explore the Study Library.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Your academic resources, organized for easier discovery.
          </p>
        </div>

        {/* Full-width Search Input */}
        <div className="relative w-full mb-10">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Search subjects, chapters, notes, or study materials..."
            className="w-full bg-white pl-12 sm:pl-14 pr-10 py-4 rounded-2xl border border-slate-200/90 shadow-2xs text-sm sm:text-base text-[#0D1520] placeholder-slate-400 font-normal focus:outline-none focus:border-[#127177] transition"
          />
          {search && (
            <button
              onClick={() => updateFilters({ search: '' })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2-Column Section: Filters on Left, Resources on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Refine resources) */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-[#0D1520]">Refine resources</h2>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-[#127177] hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* COURSE */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                  COURSE
                </label>
                <select
                  value={course}
                  onChange={(e) => updateFilters({ course: e.target.value })}
                  className="w-full bg-[#FAFBF9] border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-[#127177]"
                >
                  <option value="">All courses</option>
                  <option value="Medicine / MBBS">Medicine / MBBS</option>
                  <option value="Dentistry / BDS">Dentistry / BDS</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Medical Laboratory Technology">Medical Laboratory Technology</option>
                  <option value="Radiology & Imaging">Radiology & Imaging</option>
                </select>
              </div>

              {/* ACADEMIC LEVEL */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                  ACADEMIC LEVEL
                </label>
                <select
                  value={academicLevel}
                  onChange={(e) => updateFilters({ academicLevel: e.target.value })}
                  className="w-full bg-[#FAFBF9] border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-[#127177]"
                >
                  <option value="">All academic levels</option>
                  <option value="First Professional">First Professional</option>
                  <option value="Second Professional">Second Professional</option>
                  <option value="Third Professional">Third Professional</option>
                  <option value="Final Professional">Final Professional</option>
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                </select>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                  SUBJECT
                </label>
                <select
                  value={subject}
                  onChange={(e) => updateFilters({ subject: e.target.value })}
                  className="w-full bg-[#FAFBF9] border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-[#127177]"
                >
                  <option value="">All subjects</option>
                  {/* Dynamic Subjects from DB */}
                  {dbSubjects.map((s) => (
                    <option key={s._id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  {/* Common Subjects from Figma */}
                  {BROWSE_SUBJECTS.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* RESOURCE TYPE */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                  RESOURCE TYPE
                </label>
                <select
                  value={resourceType}
                  onChange={(e) => updateFilters({ resourceType: e.target.value })}
                  className="w-full bg-[#FAFBF9] border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-[#127177]"
                >
                  <option value="">All resource types</option>
                  <option value="NOTE">Study Notes</option>
                  <option value="PYQ">Previous Year Questions</option>
                  <option value="IMPORTANT_QUESTION">Important Questions</option>
                  <option value="REFERENCE">Reference Materials</option>
                  <option value="ASSIGNMENT">Assignments</option>
                  <option value="PRESENTATION">Presentations</option>
                  <option value="MCQ">MCQs</option>
                </select>
              </div>

              {/* SORT BY */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                  SORT BY
                </label>
                <select
                  value={sort}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  className="w-full bg-[#FAFBF9] border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-[#127177]"
                >
                  <option value="recent">Recently Added</option>
                  <option value="downloads">Most Downloaded</option>
                  <option value="views">Most Viewed</option>
                  <option value="alpha">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Right Column (Resources List) */}
          <main className="lg:col-span-9">
            {/* Header Result Count */}
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-bold text-[#0D1520]">
                {displayResources.length} resources found
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every listed item has a working preview and download.
              </p>
            </div>

            {/* List of Resource Cards */}
            {displayResources.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center">
                <p className="text-sm font-semibold text-slate-700">No resources found matching your filters.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-3 text-xs font-bold text-[#127177] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {displayResources.map((res) => (
                  <ResourceCard
                    key={res._id}
                    resource={res}
                    layout="stacked"
                    onPreview={(r) => setPreviewResource(r)}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* "Browse by subject" Section */}
        <section className="mt-20 sm:mt-24">
          <h2 className="text-2xl font-black text-[#0D1520] tracking-tight mb-6">
            Browse by subject
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BROWSE_SUBJECTS.map((s) => (
              <div
                key={s.id}
                onClick={() => handleSubjectClick(s.name)}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#127177]/40 hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#127177] uppercase tracking-wider block mb-2">
                    {s.level}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0D1520] group-hover:text-[#127177] transition mb-2">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PDF Modal */}
      {previewResource && (
        <PdfModal
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4EFE6]" />}>
      <LibraryContent />
    </Suspense>
  );
}

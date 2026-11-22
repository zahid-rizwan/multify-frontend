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

const CURATED_SUBJECTS = [
  {
    name: 'Anatomy',
    desc: 'Human structure, regional anatomy, and clinical relationships.',
  },
  {
    name: 'Physiology',
    desc: 'How cells, organs, and body systems function.',
  },
  {
    name: 'Biochemistry',
    desc: 'Molecular processes underlying health and disease.',
  },
  {
    name: 'Pathology',
    desc: 'Mechanisms and morphology of human disease.',
  },
  {
    name: 'Pharmacology',
    desc: 'Drug action, therapeutic use, and safety.',
  },
  {
    name: 'Oral Anatomy',
    desc: 'Dental morphology and oral structures.',
  },
  {
    name: 'Fundamentals of Nursing',
    desc: 'Core principles of safe, compassionate patient care.',
  },
  {
    name: 'Biomechanics',
    desc: 'Mechanics of movement and musculoskeletal function.',
  },
];

function LibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [resourceType, setResourceType] = useState(searchParams.get('resourceType') || searchParams.get('docType') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  const [resources, setResources] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [previewResource, setPreviewResource] = useState(null);

  // Sync state if URL changes
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setSubject(searchParams.get('subject') || '');
    setResourceType(searchParams.get('resourceType') || searchParams.get('docType') || '');
    setSortBy(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  // Fetch subjects list for filter dropdown
  useEffect(() => {
    setSubjectsLoading(true);
    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) setSubjectsList(data.data);
      })
      .catch((err) => console.error('Error fetching subjects:', err))
      .finally(() => setSubjectsLoading(false));
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
        if (data?.data && Array.isArray(data.data)) {
          setResources(data.data);
        } else {
          setResources([]);
        }
      } catch (err) {
        console.error('Failed to load resources:', err);
        setResources([]);
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
              <div className="space-y-3.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse"
                  >
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      {/* PDF box skeleton */}
                      <div className="w-12 h-14 rounded-lg bg-slate-200/80 flex-shrink-0" />
                      <div className="space-y-2.5 flex-1 min-w-0">
                        <div className="h-3 w-32 bg-slate-200 rounded" />
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                        <div className="h-3 w-full bg-slate-100 rounded" />
                        <div className="h-2.5 w-40 bg-slate-200 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0 self-end sm:self-center">
                      <div className="h-8 w-20 bg-slate-200 rounded-lg" />
                      <div className="h-8 w-24 bg-slate-200 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : resources.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">No resources found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
                  There are no question papers or lecture notes matching your current filter criteria.
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-[#127177] hover:bg-[#0E5B60] text-white text-xs font-semibold rounded-lg transition"
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
            {subjectsLoading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs animate-pulse space-y-3"
                >
                  <div className="h-5 w-3/4 bg-slate-200 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded" />
                </div>
              ))
            ) : (
              (subjectsList.length > 0
                ? subjectsList.map((s) => ({
                    id: s._id,
                    name: s.name,
                    desc: s.description || 'Official university curriculum question papers and verified study guides.',
                  }))
                : CURATED_SUBJECTS
              ).map((subj) => (
                <div
                  key={subj.id || subj.name}
                  onClick={() => {
                    if (subj.id) {
                      updateFilters({ subject: subj.id });
                    } else {
                      updateFilters({ search: subj.name });
                    }
                  }}
                  className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm cursor-pointer transition group"
                >
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#127177] transition mb-1.5">
                    {subj.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {subj.desc}
                  </p>
                </div>
              ))
            )}
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

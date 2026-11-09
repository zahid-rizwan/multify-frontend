'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  FileText,
  Layers,
  Calendar,
  X,
  ArrowUpDown,
  BookOpen,
  RefreshCw,
  FolderOpen,
  LayoutGrid,
  List,
  Eye,
  Download,
  Sparkles,
} from 'lucide-react';
import ResourceCard from '../../components/ResourceCard';
import PdfModal from '../../components/PdfModal';

function ResourcesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filters from URL or state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [docType, setDocType] = useState(searchParams.get('docType') || '');
  const [year, setYear] = useState(searchParams.get('year') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const [resources, setResources] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResource, setPreviewResource] = useState(null);

  // Sync state if URL changes
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setSubject(searchParams.get('subject') || '');
    setDocType(searchParams.get('docType') || '');
    setYear(searchParams.get('year') || '');
    setSort(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  // Fetch subjects list for filter dropdown
  useEffect(() => {
    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setSubjectsList(data.data);
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
        if (docType) params.set('docType', docType);
        if (year) params.set('year', year);
        if (sort) params.set('sort', sort);

        const res = await fetch(`/api/resources?${params.toString()}`);
        const data = await res.json();
        if (data?.data) {
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
  }, [search, subject, docType, year, sort]);

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
    setSubject('');
    setDocType('');
    setYear('');
    setSort('newest');
    router.push('/resources');
  };

  const handleDownload = (resource) => {
    window.open(`/api/resources/${resource._id}/download`, '_blank');
  };

  const hasActiveFilters = Boolean(search || subject || docType || year);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="bg-navy-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30 mb-3">
            Academic Repository
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            MLT Question Papers & Lecture Notes
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-6">
            Search, preview in-browser, and download verified laboratory examination materials.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              placeholder="Search by topic, e.g., Biochemistry, Anemia, Urinalysis..."
              className="w-full pl-12 pr-10 py-3 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/15 focus:outline-none focus:border-teal-400 text-sm placeholder-slate-400 font-medium"
            />
            {search && (
              <button
                onClick={() => updateFilters({ search: '' })}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & View Switcher */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* DocType Buttons */}
          <div className="w-full sm:w-auto grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 bg-slate-100 p-1 sm:p-1.5 rounded-2xl text-[11px] sm:text-xs font-bold text-slate-600 text-center">
            <button
              onClick={() => updateFilters({ docType: '' })}
              className={`py-2 px-2 sm:px-4 rounded-xl transition ${
                !docType ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => updateFilters({ docType: 'PYQ' })}
              className={`py-2 px-2 sm:px-4 rounded-xl transition ${
                docType === 'PYQ'
                  ? 'bg-crimson-600 text-white shadow-sm'
                  : 'hover:text-navy-900'
              }`}
            >
              PYQs Only
            </button>
            <button
              onClick={() => updateFilters({ docType: 'NOTE' })}
              className={`py-2 px-2 sm:px-4 rounded-xl transition ${
                docType === 'NOTE'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'hover:text-navy-900'
              }`}
            >
              Notes Only
            </button>
          </div>

          {/* Right: Sort and View Mode Switcher */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl text-slate-500">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <ArrowUpDown className="w-4 h-4" />
              <select
                value={sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl focus:outline-none focus:border-teal-500"
              >
                <option value="newest">Newest First</option>
                <option value="downloads">Most Downloaded</option>
                <option value="views">Most Viewed</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dropdowns Row: Subject, Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
          {/* Subject Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Filter by Subject</label>
            <select
              value={subject}
              onChange={(e) => updateFilters({ subject: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-teal-500"
            >
              <option value="">All Subjects</option>
              {subjectsList.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Filter by Exam Year</label>
            <select
              value={year}
              onChange={(e) => updateFilters({ year: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-teal-500"
            >
              <option value="">All Years</option>
              {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">
              Filtered results: <strong className="text-navy-950">{resources.length}</strong> papers found
            </span>
            <button
              onClick={handleClearFilters}
              className="text-crimson-600 hover:text-crimson-700 font-bold flex items-center gap-1.5 transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Results View */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-slate-200/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : resources.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((res) => (
                <ResourceCard
                  key={res._id}
                  resource={res}
                  onPreview={(r) => setPreviewResource(r)}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          ) : (
            /* Compact List / Table View */
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Title & Subject</th>
                    <th className="py-4 px-6">Exam Year</th>
                    <th className="py-4 px-6">Downloads</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {resources.map((res) => (
                    <tr key={res._id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            res.docType === 'PYQ'
                              ? 'bg-crimson-100 text-crimson-700'
                              : 'bg-teal-100 text-teal-800'
                          }`}
                        >
                          {res.docType}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p
                          onClick={() => setPreviewResource(res)}
                          className="font-bold text-navy-950 hover:text-teal-700 cursor-pointer text-sm mb-0.5"
                        >
                          {res.title}
                        </p>
                        <p className="text-[11px] text-teal-800 font-semibold">
                          {res.subject?.name || res.subjectName}
                        </p>
                      </td>
                      <td className="py-4 px-6 font-semibold font-mono text-slate-700">
                        {res.year}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-700">
                        {res.downloadCount || 0}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setPreviewResource(res)}
                          className="p-2 text-slate-500 hover:text-navy-950 hover:bg-slate-200 rounded-xl transition"
                          title="Preview PDF"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(res)}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-md mx-auto shadow-sm">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-950 mb-1">No documents found</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We couldn't find any resources matching your search. Try resetting filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
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
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-semibold">
          Loading materials...
        </div>
      }
    >
      <ResourcesContent />
    </Suspense>
  );
}

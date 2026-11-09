'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  FileText,
  Microscope,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  FlaskConical,
  Droplets,
  Dna,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import PdfModal from '../components/PdfModal';
import SubjectIcon from '../components/SubjectIcon';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [featuredResources, setFeaturedResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResource, setPreviewResource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resSubj, resDocs] = await Promise.all([
          fetch('/api/subjects').then((r) => r.json()).catch(() => ({ data: [] })),
          fetch('/api/resources?limit=6&sort=newest').then((r) => r.json()).catch(() => ({ data: [] })),
        ]);

        if (resSubj?.data && resSubj.data.length > 0) {
          setSubjects(resSubj.data);
        } else {
          setSubjects([
            { _id: '1', name: 'Clinical Hematology & Blood Bank', code: 'MLT-301', pyqCount: 12, noteCount: 18, color: '#E11D48' },
            { _id: '2', name: 'Clinical Biochemistry', code: 'MLT-302', pyqCount: 15, noteCount: 22, color: '#00858F' },
            { _id: '3', name: 'Medical Microbiology & Mycology', code: 'MLT-401', pyqCount: 10, noteCount: 16, color: '#0F2F57' },
            { _id: '4', name: 'Histopathology & Cytotechnology', code: 'MLT-402', pyqCount: 9, noteCount: 14, color: '#7C3AED' },
            { _id: '5', name: 'Immunology & Serology', code: 'MLT-501', pyqCount: 8, noteCount: 11, color: '#059669' },
            { _id: '6', name: 'Clinical Pathology & Urinalysis', code: 'MLT-201', pyqCount: 14, noteCount: 19, color: '#D97706' },
          ]);
        }

        if (resDocs?.data && resDocs.data.length > 0) {
          setFeaturedResources(resDocs.data);
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedType !== 'ALL') params.set('docType', selectedType);
    router.push(`/resources?${params.toString()}`);
  };

  const handleDownload = async (resource) => {
    try {
      window.open(`/api/resources/${resource._id}/download`, '_blank');
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="space-y-20 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-slate-50/80 border-b border-slate-200/80 pt-14 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle decorative glow spots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-teal-200/30 via-teal-100/20 to-crimson-100/20 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-teal-500/20 text-teal-800 text-xs font-bold shadow-sm mb-6 hover:border-teal-500/40 transition">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-500"></span>
            </span>
            <span>Medical Laboratory Technology Examination Repository</span>
            <span className="text-slate-300">|</span>
            <span className="text-navy-900 font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Free Open Access
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-navy-950 tracking-tight leading-[1.1] mb-6">
            Simplifying Lab Learning for{' '}
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
              MLT Students
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-normal">
            Direct, instant access to official University Previous Year Question Papers (PYQs), lecture guides, and laboratory diagnostic protocols organized subject-wise and examination-year-wise.
          </p>

          {/* Ultra-Clean Floating Search Box */}
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/95 backdrop-blur-xl p-2.5 sm:p-3 rounded-3xl shadow-xl shadow-navy-950/5 border border-slate-200/90 flex flex-col sm:flex-row gap-2.5"
            >
              {/* Segmented Category Pill Switcher */}
              <div className="w-full sm:w-auto grid grid-cols-3 sm:flex bg-slate-100/90 p-1.5 rounded-2xl text-xs font-bold text-slate-600 flex-shrink-0 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedType('ALL')}
                  className={`py-2 px-3 sm:px-4 rounded-xl transition-all duration-200 ${
                    selectedType === 'ALL'
                      ? 'bg-white text-navy-950 shadow-sm'
                      : 'hover:text-navy-900'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('PYQ')}
                  className={`py-2 px-3 sm:px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    selectedType === 'PYQ'
                      ? 'bg-crimson-600 text-white shadow-sm'
                      : 'hover:text-navy-900'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-300"></span>
                  <span>PYQs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('NOTE')}
                  className={`py-2 px-3 sm:px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    selectedType === 'NOTE'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'hover:text-navy-900'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-300"></span>
                  <span>Notes</span>
                </button>
              </div>

              {/* Keyword Input */}
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, e.g., Hematology, LFT, Gram Stain, 2024..."
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-2xl bg-transparent focus:outline-none text-navy-950 placeholder-slate-400 font-semibold"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-7 py-3 rounded-2xl font-bold text-sm bg-navy-900 hover:bg-navy-800 text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Popular Topic Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-slate-400 font-medium">Quick search:</span>
              {['Hematology', 'Biochemistry', 'Microbiology', 'Histopathology', 'Urinalysis'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => router.push(`/resources?search=${topic}`)}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-700 transition font-medium"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Modern Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-200/80">
            <div className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-slate-200/60 shadow-sm">
              <p className="text-3xl font-black text-navy-950">500+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Verified PDFs</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-slate-200/60 shadow-sm">
              <p className="text-3xl font-black text-teal-600">All Subjects</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">B.Sc & DMLT</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-slate-200/60 shadow-sm">
              <p className="text-3xl font-black text-crimson-600">100% Free</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">No Paywalls</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-slate-200/60 shadow-sm">
              <p className="text-3xl font-black text-navy-950">Single Click</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Direct Download</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Subjects Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">
              <Microscope className="w-4 h-4" />
              <span>Diagnostic Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
              Browse by Medical Laboratory Subject
            </h2>
          </div>
          <Link
            href="/subjects"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 group"
          >
            <span>Explore all subjects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.slice(0, 6).map((subj) => (
            <Link
              key={subj._id}
              href={`/resources?subject=${subj._id}`}
              className="group bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-teal-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: subj.color || '#00858F' }}
                  >
                    <SubjectIcon name={subj.name} icon={subj.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-navy-950 border border-slate-200">
                      {subj.code || 'MLT'}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-navy-950 group-hover:text-teal-700 transition mb-1.5">
                  {subj.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {subj.description || 'Core theoretical concepts, diagnostic testing protocols, and past question papers.'}
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                <span className="text-crimson-600">
                  {subj.pyqCount || 0} PYQ Papers
                </span>
                <span className="text-teal-700">
                  {subj.noteCount || 0} Lecture Notes
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-crimson-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>High-Yield Examination Materials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
              Latest Question Papers & Notes
            </h2>
          </div>
          <Link
            href="/resources"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 group"
          >
            <span>View all repository papers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-200/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((res) => (
              <ResourceCard
                key={res._id}
                resource={res}
                onPreview={(r) => setPreviewResource(r)}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why MLTify Highlights - Sleek Modern Dark Section */}
      <section className="bg-navy-950 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30 mb-3">
              Built for Diagnostic Scientists
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Everything You Need to Ace Your MLT Exams
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Designed specifically for laboratory pathology students — no irrelevant general topics, broken links, or paywalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur hover:border-teal-500/40 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Subject-Wise Organization</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Filter documents seamlessly by subject code, document type, and exam year. Easily find Hematology, Biochemistry, and Microbiology files.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur hover:border-crimson-500/40 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-crimson-500/20 text-crimson-400 flex items-center justify-center mb-6">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Direct & Instant Downloads</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                No subscription walls, capture forms, or timers. Preview the PDF right in your browser or click download immediately.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur hover:border-teal-500/40 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Verified University Past Papers</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Exam questions and notes are verified and managed by academic administrators with accurate curriculum tags and solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

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

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
} from 'lucide-react';
import PdfModal from '../components/PdfModal';

export default function HomePage() {
  const router = useRouter();
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

  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero Section with distinct off-white/warm background */}
      <section className="bg-[#FAF8F5] pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#127177] inline-block">
            MLTIFY POINT • ACADEMIC MEDICAL REPOSITORY
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
            Simplifying Lab Learning for{' '}
            <span className="text-[#127177]">MLT Students</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Discover thoughtfully organized medical notes, academic resources, and study
            materials designed to make your learning journey easier.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/resources"
              className="px-6 py-3.5 rounded-xl bg-[#127177] hover:bg-[#0E5B60] text-white text-sm font-semibold transition shadow-xs flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              <span>Explore study materials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#disciplines"
              className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 text-sm font-semibold transition shadow-2xs hover:bg-slate-50 flex items-center justify-center"
            >
              <span>Discover subjects</span>
            </a>
          </div>

          {/* Sub-text divider line */}
          <div className="pt-2 text-xs text-slate-400 font-medium">
            — One destination. Multiple medical disciplines. Better learning.
          </div>
        </div>
      </section>

      {/* Second Section: Pure White Background */}
      <section id="disciplines" className="bg-white py-20 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#127177] block mb-2">
              START HERE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">
              Everything You Need to Study Smarter.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Focused pathways for the materials students look for most.
            </p>
          </div>

          {/* Core Feature Pathways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Link
              href="/resources?docType=PYQ"
              className="bg-[#FAFBFB] p-6 rounded-2xl border border-slate-200/80 hover:border-[#127177]/40 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#127177] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#127177] transition-colors">
                Question Papers (PYQ)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Access official university examination papers with question trends and year-wise archives.
              </p>
              <span className="text-xs font-semibold text-[#127177] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse question papers →
              </span>
            </Link>

            <Link
              href="/resources?docType=NOTE"
              className="bg-[#FAFBFB] p-6 rounded-2xl border border-slate-200/80 hover:border-[#127177]/40 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#127177] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#127177] transition-colors">
                Verified Study Notes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Structured clinical theory, diagnostic bench protocols, and clear diagnostic diagrams.
              </p>
              <span className="text-xs font-semibold text-[#127177] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read subject notes →
              </span>
            </Link>

            <Link
              href="/subjects"
              className="bg-[#FAFBFB] p-6 rounded-2xl border border-slate-200/80 hover:border-[#127177]/40 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#127177] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#127177] transition-colors">
                Subject Catalog
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Comprehensive directory for Hematology, Biochemistry, Microbiology, and Histopathology.
              </p>
              <span className="text-xs font-semibold text-[#127177] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                View all subjects →
              </span>
            </Link>
          </div>

          {/* Subjects Directory Showcase */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Core Medical Laboratory Disciplines
              </h3>
              <Link
                href="/subjects"
                className="text-xs font-semibold text-[#127177] hover:underline"
              >
                View all subjects
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-xl border border-slate-200/80 animate-pulse space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                      <div className="h-3 w-12 bg-slate-100 rounded" />
                    </div>
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-full bg-slate-100 rounded" />
                  </div>
                ))
              ) : (
                subjects.map((subj) => (
                  <Link
                    key={subj._id}
                    href={`/resources?subject=${subj._id}`}
                    className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#127177] uppercase tracking-wider">
                        {subj.code || 'MLT'}
                      </span>
                      <span className="text-xs text-slate-400">
                        {(subj.pyqCount || 0) + (subj.noteCount || 0)} materials
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-[#127177] transition-colors mb-1">
                      {subj.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Previous year exams and verified classroom lectures.
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, GraduationCap, ArrowRight, BookOpen, FileText, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';

const UNIVERSITIES = [
  {
    id: 'rguhs',
    name: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    state: 'Karnataka',
    code: 'RGUHS',
    papersCount: 48,
    courses: ['B.Sc MLT', 'M.Sc MLT'],
    description: 'Annual and supplementary examination question papers for 1st, 2nd, and 3rd year MLT curriculum.',
  },
  {
    id: 'muhs',
    name: 'Maharashtra University of Health Sciences (MUHS)',
    state: 'Maharashtra',
    code: 'MUHS',
    papersCount: 36,
    courses: ['B.Sc MLT', 'BPMT'],
    description: 'Winter & Summer examination papers covering Hematology, Clinical Biochemistry, and Microbiology.',
  },
  {
    id: 'wbuhs',
    name: 'West Bengal University of Health Sciences (WBUHS)',
    state: 'West Bengal',
    code: 'WBUHS',
    papersCount: 29,
    courses: ['BMLT', 'M.Sc MLT'],
    description: 'Semester & annual question archives with model answers for paramedical and allied sciences.',
  },
  {
    id: 'aiims',
    name: 'All India Institute of Medical Sciences (AIIMS)',
    state: 'National',
    code: 'AIIMS',
    papersCount: 42,
    courses: ['B.Sc Medical Technology (Lab)'],
    description: 'Centralized semester examination papers and laboratory practical evaluation protocols.',
  },
  {
    id: 'bfuhs',
    name: 'Baba Farid University of Health Sciences (BFUHS)',
    state: 'Punjab',
    code: 'BFUHS',
    papersCount: 24,
    courses: ['B.Sc MLT', 'DMLT'],
    description: 'Standardized annual board examination papers with clinical pathology marks distribution.',
  },
  {
    id: 'kuhs',
    name: 'Kerala University of Health Sciences (KUHS)',
    state: 'Kerala',
    code: 'KUHS',
    papersCount: 38,
    courses: ['B.Sc MLT'],
    description: 'Comprehensive 4-year degree examination papers including Histopathology & Blood Banking.',
  },
];

export default function UniversitiesPage() {
  const [search, setSearch] = useState('');

  const filtered = UNIVERSITIES.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.code.toLowerCase().includes(search.toLowerCase()) ||
      u.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-6 sm:py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Universities' }]} />

      <main id="main-content" className="max-w-[1120px] mx-auto px-6 pt-4 pb-20">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold text-[#127177] dark:text-[#4EBEB8] uppercase tracking-wider block mb-2">
            Academic Institutions
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
            University Question Papers &amp; Syllabus
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Browse examination papers, semester syllabi, and marks schemes organized by health sciences universities across India.
          </p>

          {/* Search Field (Standard input system) */}
          <div className="mt-6 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by university or state (e.g. RGUHS, AIIMS, Kerala)..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-[#127177] focus:border-transparent outline-none transition-colors"
            />
          </div>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((univ) => (
            <div
              key={univ.id}
              className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-[1px] transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {univ.state}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-400">
                      {univ.code}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#127177] dark:text-[#4EBEB8]">
                    {univ.papersCount} papers
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
                  {univ.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {univ.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {univ.courses.map((c) => (
                    <span
                      key={c}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/resources?search=${encodeURIComponent(univ.code)}&docType=PYQ`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#127177] dark:text-[#4EBEB8] hover:underline"
                >
                  <span>Browse Question Papers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/resources?search=${encodeURIComponent(univ.code)}&docType=NOTE`}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  Syllabus &amp; Notes
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8">
            <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No universities found matching &ldquo;{search}&rdquo;
            </p>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Can&apos;t find your university? Submit a request and we will add your past question papers.
            </p>
            <button
              onClick={() => setSearch('')}
              className="text-xs font-semibold text-[#127177] dark:text-[#4EBEB8] hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

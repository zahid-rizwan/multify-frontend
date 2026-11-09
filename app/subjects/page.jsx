'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Microscope, ArrowRight, BookOpen, FileText, Sparkles } from 'lucide-react';
import SubjectIcon from '../../components/SubjectIcon';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setSubjects(data.data);
        }
      })
      .catch((err) => console.error('Failed to load subjects:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/60 mb-3">
          University Curriculum Index
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight mb-4">
          Core Medical Laboratory Subjects
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Comprehensive question papers, diagnostic test protocols, and high-yield lecture notes structured by diagnostic domain.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-slate-200/60 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subj) => (
            <div
              key={subj._id}
              className="group bg-white rounded-3xl border border-slate-200/80 hover:border-teal-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-7">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105"
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

                <h3 className="text-lg font-bold text-navy-950 group-hover:text-teal-700 transition mb-2">
                  {subj.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {subj.description ||
                    'In-depth study of diagnostic methodologies, physiological parameters, and university examination patterns.'}
                </p>
              </div>

              {/* Resource Count & Link */}
              <div className="px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-600 space-x-2">
                  <span className="text-crimson-600">{subj.pyqCount || 0} PYQs</span>
                  <span>•</span>
                  <span className="text-teal-700">{subj.noteCount || 0} Notes</span>
                </div>

                <Link
                  href={`/resources?subject=${subj._id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-teal-700 group transition"
                >
                  <span>Browse Papers</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

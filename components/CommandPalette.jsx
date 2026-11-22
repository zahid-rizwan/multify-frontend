'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, BookOpen, Layers, X, Clock, ArrowRight, CornerDownLeft } from 'lucide-react';

const STATIC_SUBJECTS = [
  { id: 'sub-1', name: 'Clinical Hematology', code: 'HEM-201', desc: 'Blood cells, anemia, leukemia, coagulation' },
  { id: 'sub-2', name: 'Clinical Biochemistry', code: 'BIO-101', desc: 'Enzymes, lipids, renal & liver function tests' },
  { id: 'sub-3', name: 'Medical Microbiology', code: 'MIC-202', desc: 'Bacteriology, virology, mycology & parasitology' },
  { id: 'sub-4', name: 'Histopathology & Cytology', code: 'HIS-301', desc: 'Tissue processing, staining & cell screening' },
  { id: 'sub-5', name: 'Immunohematology & Blood Banking', code: 'BLD-302', desc: 'Blood grouping, cross-matching & transfusion' },
  { id: 'sub-6', name: 'Clinical Pathology & Urinalysis', code: 'PAT-102', desc: 'Body fluids, urine routine & microscopic exams' },
];

const STATIC_PAPERS = [
  { id: 'pap-1', title: 'Hematology Annual Exam 2023', code: 'HEM-201', year: '2023', docType: 'PYQ', href: '/resources?search=Hematology&docType=PYQ' },
  { id: 'pap-2', title: 'Clinical Biochemistry Mid-Term Paper 2024', code: 'BIO-101', year: '2024', docType: 'PYQ', href: '/resources?search=Biochemistry&docType=PYQ' },
  { id: 'pap-3', title: 'Medical Microbiology University Examination 2022', code: 'MIC-202', year: '2022', docType: 'PYQ', href: '/resources?search=Microbiology&docType=PYQ' },
  { id: 'pap-4', title: 'Histotechnology Final Exam Questions 2023', code: 'HIS-301', year: '2023', docType: 'PYQ', href: '/resources?search=Histopathology&docType=PYQ' },
];

const STATIC_NOTES = [
  { id: 'not-1', title: 'Automated Blood Cell Counters & Hemoglobin Estimation', code: 'HEM-201', docType: 'NOTE', href: '/resources?search=Blood&docType=NOTE' },
  { id: 'not-2', title: 'Liver Function Tests & Serum Bilirubin Pathways', code: 'BIO-101', docType: 'NOTE', href: '/resources?search=Liver&docType=NOTE' },
  { id: 'not-3', title: 'Gram Staining, Acid Fast & Bacterial Culture Media', code: 'MIC-202', docType: 'NOTE', href: '/resources?search=Culture&docType=NOTE' },
  { id: 'not-4', title: 'Routine Urinalysis & Microscopic Sediment Atlas', code: 'PAT-102', docType: 'NOTE', href: '/resources?search=Urinalysis&docType=NOTE' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mltify_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch {}
  }, [isOpen]);

  const saveRecentSearch = (term) => {
    if (!term || !term.trim()) return;
    try {
      const clean = term.trim();
      const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('mltify_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('mltify_recent_searches');
    } catch {}
  };

  // Grouped results
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { subjects: [], papers: [], notes: [], all: [] };
    }

    const subjects = STATIC_SUBJECTS.filter(
      (s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
    ).map((s) => ({ ...s, type: 'subject', label: s.name, sub: s.code, href: `/resources?search=${encodeURIComponent(s.name)}` }));

    const papers = STATIC_PAPERS.filter(
      (p) => p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
    ).map((p) => ({ ...p, type: 'paper', label: p.title, sub: `${p.year} • ${p.code}` }));

    const notes = STATIC_NOTES.filter(
      (n) => n.title.toLowerCase().includes(q) || n.code.toLowerCase().includes(q)
    ).map((n) => ({ ...n, type: 'note', label: n.title, sub: n.code }));

    return {
      subjects,
      papers,
      notes,
      all: [...subjects, ...papers, ...notes],
    };
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      const totalItems = filteredResults.all.length;
      if (totalItems === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % totalItems);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filteredResults.all[selectedIndex];
        if (item) {
          saveRecentSearch(query || item.label);
          router.push(item.href);
          onClose();
        } else if (query.trim()) {
          saveRecentSearch(query);
          router.push(`/resources?search=${encodeURIComponent(query.trim())}`);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredResults, query, onClose, router]);

  if (!isOpen) return null;

  const handleSelect = (item) => {
    saveRecentSearch(query || item.label);
    router.push(item.href);
    onClose();
  };

  const handleRecentClick = (term) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[640px] bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command search"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search subjects, papers, notes, topics..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Recent searches when query is empty */}
          {!query.trim() && (
            <div className="p-3">
              {recentSearches.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <span>Recent Searches</span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-slate-400 hover:text-rose-500 text-[11px] lowercase"
                    >
                      clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleRecentClick(term)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors duration-150"
                      >
                        <span className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>{term}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">
                  Type a topic, subject name, or question paper year to search...
                </div>
              )}

              {/* Quick Jump Suggestions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Popular Subjects
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {STATIC_SUBJECTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleRecentClick(s.name)}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-[#127177]/10 dark:hover:bg-[#127177]/20 text-xs text-slate-700 dark:text-slate-300 hover:text-[#127177] transition-colors duration-150"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Query Results */}
          {query.trim() && filteredResults.all.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No matching materials found</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">Try searching for a different subject, code, or keyword.</p>
              <button
                onClick={() => {
                  saveRecentSearch(query);
                  router.push(`/resources?search=${encodeURIComponent(query)}`);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#127177] text-white text-xs font-medium hover:bg-[#0E5B60] transition-colors"
              >
                <span>Search all resources for &ldquo;{query}&rdquo;</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Group 1: Subjects */}
          {filteredResults.subjects.length > 0 && (
            <div className="py-2">
              <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Subjects
              </span>
              {filteredResults.subjects.map((item) => {
                const globalIdx = filteredResults.all.indexOf(item);
                const isSelected = selectedIndex === globalIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                      isSelected
                        ? 'bg-[#127177]/10 dark:bg-[#127177]/20 text-[#127177] dark:text-[#4EBEB8]'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Layers className="w-4 h-4 text-[#127177] shrink-0" />
                      <div className="truncate">
                        <span className="text-sm font-semibold">{item.label}</span>
                        <span className="text-xs text-slate-400 ml-2">{item.sub}</span>
                      </div>
                    </div>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-[#127177] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Group 2: Papers (PYQs) */}
          {filteredResults.papers.length > 0 && (
            <div className="py-2">
              <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Question Papers
              </span>
              {filteredResults.papers.map((item) => {
                const globalIdx = filteredResults.all.indexOf(item);
                const isSelected = selectedIndex === globalIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                      isSelected
                        ? 'bg-[#127177]/10 dark:bg-[#127177]/20 text-[#127177] dark:text-[#4EBEB8]'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                      <div className="truncate">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-xs text-slate-400 ml-2">({item.sub})</span>
                      </div>
                    </div>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-[#127177] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Group 3: Notes */}
          {filteredResults.notes.length > 0 && (
            <div className="py-2">
              <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Lecture Notes
              </span>
              {filteredResults.notes.map((item) => {
                const globalIdx = filteredResults.all.indexOf(item);
                const isSelected = selectedIndex === globalIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                      isSelected
                        ? 'bg-[#127177]/10 dark:bg-[#127177]/20 text-[#127177] dark:text-[#4EBEB8]'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <BookOpen className="w-4 h-4 text-[#127177] shrink-0" />
                      <div className="truncate">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-xs text-slate-400 ml-2">({item.sub})</span>
                      </div>
                    </div>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-[#127177] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1 py-0.5 rounded text-[10px]">
                ↑
              </kbd>{' '}
              <kbd className="font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1 py-0.5 rounded text-[10px]">
                ↓
              </kbd>{' '}
              navigate
            </span>
            <span>
              <kbd className="font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1 py-0.5 rounded text-[10px]">
                ↵
              </kbd>{' '}
              select
            </span>
          </div>
          <span>Academic Command Palette</span>
        </div>
      </div>
    </div>
  );
}

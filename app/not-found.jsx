'use client';

import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 text-center shadow-xs">
        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#127177] dark:text-[#4EBEB8] flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="w-6 h-6 stroke-[1.8]" />
        </div>

        <span className="text-xs font-mono font-bold text-slate-400 block mb-1">
          ERROR 404
        </span>

        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Page or Document Not Found
        </h1>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          The study material, paper, or path you requested does not exist or may have been reorganized in our academic repository.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Link
            href="/"
            className="w-full sm:w-auto h-10 px-4 rounded-lg bg-[#127177] hover:bg-[#0E5B60] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/resources"
            className="w-full sm:w-auto h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Library</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

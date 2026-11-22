import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About — MLTify Point',
  description:
    'Learn about MLTify Point: an academic medical laboratory repository dedicated to making medical learning more accessible for students and faculty.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-[80vh] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#127177]">
            MLTIFY POINT • ABOUT
          </span>
        </div>

        {/* Hero Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.06]">
              Making Medical Learning More Accessible.
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              MLTify Point is designed to bring medical learning resources together in one
              organized and accessible destination. Our goal is to help students spend less time
              searching and more time learning.
            </p>
          </div>
        </div>

        {/* Mission Statement Block */}
        <div className="max-w-2xl space-y-8">
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Our mission is simple: create a calm, dependable place where learners across
            healthcare disciplines can find useful study materials without navigating clutter.
            MLTify Point is an independent demonstration platform and does not claim institutional
            affiliation.
          </p>

          <div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#127177] hover:bg-[#0E5B60] text-white text-sm font-semibold transition shadow-xs group"
            >
              <span>Explore the library</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

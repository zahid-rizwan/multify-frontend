'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-[calc(100vh-80px)] flex flex-col justify-between py-16 sm:py-24 lg:py-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Split Section: Title on Left, Introduction on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20 sm:mb-28 lg:mb-32">
          {/* Left Column (Desktop 7 cols) */}
          <div className="lg:col-span-7">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#127177] tracking-[0.18em] uppercase mb-6">
              <span>MEDORA • ABOUT</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-black text-[#0D1520] tracking-tight leading-[1.06]">
              Making Medical
              <br />
              Learning More
              <br />
              Accessible.
            </h1>
          </div>

          {/* Right Column (Desktop 5 cols) */}
          <div className="lg:col-span-5 lg:pt-14">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-lg">
              MEDORA is designed to bring medical learning resources together in one organized and accessible destination. Our goal is to help students spend less time searching and more time learning.
            </p>
          </div>
        </div>

        {/* Bottom Section: Mission Statement & Action Button */}
        <div className="max-w-2xl">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
            Our mission is simple: create a calm, dependable place where learners across healthcare disciplines can find useful study materials without navigating clutter. MEDORA is an independent demonstration platform and does not claim institutional affiliation.
          </p>

          <div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#127177] hover:bg-[#0E5B60] text-white text-sm font-bold transition shadow-xs hover:shadow-md active:scale-[0.98] group"
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

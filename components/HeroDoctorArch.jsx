'use client';

import React from 'react';
import { CheckCircle2, FileText, Sparkles } from 'lucide-react';

export default function HeroDoctorArch() {
  return (
    <div className="relative w-full max-w-[440px] lg:max-w-[480px] mx-auto select-none">
      {/* Soft ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#127177]/20 via-[#B9382E]/15 to-transparent rounded-[240px] blur-2xl pointer-events-none -z-10" />

      {/* Main Arch Frame */}
      <div className="relative aspect-[4/5] w-full rounded-t-[220px] rounded-b-[36px] bg-[#F7F8F6] border-2 border-white shadow-2xl overflow-hidden flex flex-col justify-end">
        {/* Doctor Image */}
        <div className="relative z-10 w-full h-full">
          <img
            src="/hero-doctor.png"
            alt="Medical Student - MEDORA"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Floating Badge 1 (Bottom Left): Verified Academic Notes */}
        <div className="absolute bottom-6 left-4 z-20 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 shadow-xl flex items-center gap-3 animate-float-slow max-w-[240px]">
          <div className="w-9 h-9 rounded-xl bg-[#E6F4F1] border border-[#CDEAE5] text-[#127177] flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#127177]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#0D1520] truncate">
              Verified Academic Notes
            </p>
            <p className="text-[10px] text-slate-500 font-medium truncate">
              Organized by Subject & Year
            </p>
          </div>
        </div>

        {/* Floating Badge 2 (Middle Right): PDF Badge */}
        <div className="absolute top-36 -right-2 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 shadow-lg flex items-center gap-1.5 text-[11px] font-bold text-[#127177]">
          <FileText className="w-3.5 h-3.5 text-[#127177]" />
          <span>PDF Library</span>
        </div>
      </div>
    </div>
  );
}

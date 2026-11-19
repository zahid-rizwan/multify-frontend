import React from 'react';
import Image from 'next/image';

export default function MedoraLogo({ className = 'w-9 h-9', dark = false }) {
  const textColor = dark ? 'text-white' : 'text-[#0D1520]';
  const accentColor = dark ? 'text-[#4EBEB8]' : 'text-[#2E737A]';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Official MLTify Logo Icon */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-xs p-0.5 flex-shrink-0">
        <Image
          src="/logo.jpg"
          alt="MLTify Logo"
          width={40}
          height={40}
          className="object-cover rounded-lg w-full h-full"
          priority
        />
      </div>

      {/* Brand Name */}
      <span
        className={`font-black tracking-tight text-lg sm:text-[21px] ${textColor}`}
      >
        MLT<span className={accentColor}>ify</span>
      </span>
    </div>
  );
}

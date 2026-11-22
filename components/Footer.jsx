import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0B1320] text-slate-400 pt-16 pb-10 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-teal-500/30 bg-white p-0.5 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="MLTify Point"
                  width={36}
                  height={36}
                  className="object-cover rounded-[10px]"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MLT<span className="text-teal-400">ify</span> Point
              </span>
            </Link>
            <div className="space-y-1 text-sm text-slate-400 leading-relaxed">
              <p className="text-slate-300 font-medium">Knowledge That Shapes Care.</p>
              <p>Thoughtfully organized learning for every medical journey.</p>
            </div>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition">
                  Explore Library
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <a href="mailto:contact@mltifypoint.com" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/resources?docType=NOTE" className="hover:text-white transition">
                  Study Notes
                </Link>
              </li>
              <li>
                <Link href="/resources?docType=PYQ" className="hover:text-white transition">
                  Question Papers
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition">
                  Reference Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition">
                  Educational Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2025 MLTify Point. Educational resources for demonstration.</p>
          <p className="text-slate-400">Designed for curious minds in healthcare.</p>
        </div>
      </div>
    </footer>
  );
}

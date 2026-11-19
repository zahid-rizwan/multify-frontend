import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0D1520] text-slate-400 pt-16 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand header */}
        <div className="mb-12">
          {/* MLTify Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-white/20 bg-white p-0.5 shadow-sm flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="MLTify Logo"
                width={40}
                height={40}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
            <span className="font-black tracking-tight text-xl text-white">
              MLT<span className="text-[#4EBEB8]">ify</span>
            </span>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-300">
            Knowledge That Shapes Care.
          </p>
          <p className="text-xs text-slate-400 max-w-sm mt-0.5 leading-relaxed">
            Thoughtfully organized learning for every medical journey.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-16">
          {/* Column 1: Navigate */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-3 text-xs">
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
                <Link href="/subjects" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-xs">
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
                <Link href="/resources?docType=REFERENCE" className="hover:text-white transition">
                  Reference Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-bold text-white tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Terms & Conditions
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Educational Disclaimer
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar without question mark */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} MLTify. Educational resources for demonstration.</p>
          <p className="text-slate-400 font-medium">Designed for curious minds in healthcare.</p>
        </div>
      </div>
    </footer>
  );
}

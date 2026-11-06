'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FileText,
  BookOpen,
  Layers,
  Search,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Question Papers (PYQ)', href: '/resources?docType=PYQ' },
    { name: 'Lecture Notes', href: '/resources?docType=NOTE' },
    { name: 'Subject Catalog', href: '/subjects' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white text-[11px] py-1.5 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-white/5">
        <span className="flex h-2 w-2 relative flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
        </span>
        <span className="text-slate-300 truncate">
          Medical Laboratory Technology Study Hub — Free University PYQs & Verified Guides
        </span>
        <span className="hidden md:inline-block text-teal-400 font-bold ml-1 flex-shrink-0">
          • 100% Free Downloads
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-teal-600/30 shadow-md group-hover:scale-105 group-hover:border-teal-500 transition-all duration-300 bg-white p-0.5 flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="MLTify Logo"
                width={48}
                height={48}
                className="object-cover rounded-[14px]"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight group-hover:text-navy-950 transition">
                  MLT
                </span>
                <span className="text-xl sm:text-2xl font-black text-teal-600 tracking-tight">
                  ify
                </span>
                <span className="hidden xs:inline-block ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60 uppercase tracking-wider">
                  Academic
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-0.5 flex items-center gap-1">
                <span>Learn</span>
                <span className="text-teal-500">•</span>
                <span>Analyze</span>
                <span className="text-crimson-500">•</span>
                <span>Excel</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-white/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Shortcut Pill */}
            <Link
              href="/resources"
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200/80 hover:text-navy-900 rounded-xl transition border border-slate-200/60"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search repository</span>
              <kbd className="hidden md:inline-block font-mono text-[10px] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
                /
              </kbd>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-xl transition lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/resources"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold mb-3"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search question papers & notes...</span>
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

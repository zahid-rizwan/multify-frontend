'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Search,
  ArrowRight,
} from 'lucide-react';
import MedoraLogo from './MedoraLogo';

function NavbarContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Library', href: '/resources' },
    { name: 'Subjects', href: '/subjects' },
    { name: 'About', href: '/about' },
  ];

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '/resources') return pathname === '/resources';
    if (href === '/subjects') return pathname.startsWith('/subjects');
    if (href === '/about') return pathname === '/about';
    return false;
  };

  const isWhiteBgPage = pathname === '/about';

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-all ${
        isWhiteBgPage
          ? 'bg-white/95 border-b border-slate-100'
          : 'bg-[#F4EFE6]/95 border-b border-[#E8E1D5]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Left: MEDORA Logo */}
          <Link href="/" className="flex items-center group py-2">
            <MedoraLogo className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-105" />
          </Link>

          {/* Center: Desktop Navigation Links with Underline Indicator */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm tracking-wide transition-colors py-1 ${
                    active
                      ? 'text-[#0D1520] font-bold'
                      : 'text-slate-500 hover:text-[#0D1520] font-medium'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Teal Underline Indicator for Active Link */}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#2E737A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search Circular Button + Explore resources Button */}
          <div className="flex items-center gap-3.5">
            {/* Search circular button */}
            <Link
              href="/resources"
              className="w-10 h-10 rounded-full border border-slate-300/80 bg-white/70 hover:bg-white flex items-center justify-center text-slate-700 hover:text-[#2E737A] transition shadow-xs"
              title="Search"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
            </Link>

            {/* Explore resources CTA Button */}
            <Link
              href="/resources"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#2E737A] hover:bg-[#256066] text-white text-sm font-semibold transition shadow-xs active:scale-[0.98]"
            >
              Explore resources
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-slate-300/80 bg-white flex items-center justify-center text-slate-700 hover:border-slate-400 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-xl px-4 py-5 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                    active
                      ? 'bg-[#E6F4F1] text-[#2E737A] font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0D1520]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-[#2E737A] text-white text-sm font-bold shadow-xs"
            >
              <span>Explore resources</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-20 bg-[#F4EFE6]" />}>
      <NavbarContent />
    </Suspense>
  );
}

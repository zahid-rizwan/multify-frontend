'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, FileText, BookOpen, Layers } from 'lucide-react';

export default function MobileBottomBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const docType = searchParams.get('docType');

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { name: 'Home', href: '/', icon: Home, isActive: pathname === '/' },
    {
      name: 'Papers',
      href: '/resources?docType=PYQ',
      icon: FileText,
      isActive: pathname === '/resources' && docType === 'PYQ',
    },
    {
      name: 'Notes',
      href: '/resources?docType=NOTE',
      icon: BookOpen,
      isActive: pathname === '/resources' && docType === 'NOTE',
    },
    {
      name: 'Subjects',
      href: '/subjects',
      icon: Layers,
      isActive: pathname.startsWith('/subjects'),
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className={`fixed bottom-0 inset-x-0 z-40 h-14 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 lg:hidden transition-transform duration-200 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-4 h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              aria-current={tab.isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors duration-150 ${
                tab.isActive
                  ? 'text-[#127177] dark:text-[#4EBEB8]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className="w-5 h-5 stroke-[1.8]" />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

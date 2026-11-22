'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 max-w-[1120px] mx-auto w-full">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <li>
          <Link
            href="/"
            className="hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 transition-colors duration-150"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.label}>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
              </li>
              <li>
                {isLast || !item.href ? (
                  <span className="font-medium text-slate-800 dark:text-slate-200" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

'use client';

import React from 'react';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Layers,
  Sparkles,
  ArrowDownToLine,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export default function ResourceCard({ resource, onPreview, onDownload }) {
  const isPyq = resource.docType === 'PYQ';

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return 'PDF';
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/90 hover:border-teal-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top chromatic accent ribbon */}
      <div
        className={`h-1.5 w-full transition-all duration-300 ${
          isPyq
            ? 'bg-gradient-to-r from-crimson-600 via-crimson-500 to-rose-400 group-hover:h-2'
            : 'bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 group-hover:h-2'
        }`}
      />

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {/* Badges Header Row */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wide uppercase transition-colors ${
                isPyq
                  ? 'bg-crimson-50 text-crimson-600 border border-crimson-200/80'
                  : 'bg-teal-50 text-teal-800 border border-teal-200/80'
              }`}
            >
              {isPyq ? (
                <>
                  <FileText className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  <span>PYQ Paper</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-teal-600" />
                  <span>Lecture Note</span>
                </>
              )}
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/60">
              <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-slate-400" />
              Sem {resource.semester}
            </span>
          </div>

          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-500 border border-slate-100 flex-shrink-0">
            {resource.year}
          </span>
        </div>

        {/* Subject Indicator */}
        <div className="flex items-center gap-2 mb-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full ring-2 ring-white shadow-sm flex-shrink-0"
            style={{ backgroundColor: resource.subject?.color || '#00858F' }}
          />
          <p className="text-xs font-bold text-teal-800 truncate">
            {resource.subject?.name || resource.subjectName || 'Medical Lab Technology'}
          </p>
          {resource.subject?.code && (
            <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
              ({resource.subject.code})
            </span>
          )}
        </div>

        {/* Resource Title */}
        <h3
          onClick={() => onPreview(resource)}
          className="text-sm sm:text-base font-extrabold text-navy-950 group-hover:text-teal-700 transition cursor-pointer line-clamp-2 leading-snug mb-2"
          title={resource.title}
        >
          {resource.title}
        </h3>

        {/* Description */}
        {resource.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {resource.description}
          </p>
        )}

        {/* Tags / Keywords */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
            {resource.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100/80 text-slate-600 rounded-md border border-slate-200/50"
              >
                #{tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-[10px] text-slate-400 font-medium self-center">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata and Action Buttons */}
      <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        {/* Stats */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1" title="Views">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>{resource.viewCount || 0}</span>
          </span>
          <span className="flex items-center gap-1" title="Downloads">
            <ArrowDownToLine className="w-3.5 h-3.5 text-slate-400" />
            <span>{resource.downloadCount || 0}</span>
          </span>
          <span className="font-mono text-[10px] text-slate-400 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200/60">
            {formatFileSize(resource.fileSize)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          <button
            onClick={() => onPreview(resource)}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-navy-900 hover:bg-slate-200/70 transition flex items-center gap-1"
            title="Preview PDF"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => onDownload(resource)}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all duration-200 active:scale-95 ${
              isPyq
                ? 'bg-crimson-600 hover:bg-crimson-700 shadow-crimson-500/20'
                : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20'
            }`}
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText, Eye, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

export default function PdfModal({ resource, onClose, onDownload }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!resource) return null;

  const pdfUrl = resource.fileUrl?.startsWith('http')
    ? resource.fileUrl
    : `http://localhost:5000${resource.fileUrl}`;

  const isPyq = resource.docType === 'PYQ';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-full sm:h-[92vh] bg-white rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border-0 sm:border border-slate-700/30">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-navy-950 text-white border-b border-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 pr-2">
            <div
              className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl flex-shrink-0 ${
                isPyq ? 'bg-crimson-500/20 text-crimson-400' : 'bg-teal-500/20 text-teal-400'
              }`}
            >
              {isPyq ? <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> : <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span
                  className={`text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase ${
                    isPyq ? 'bg-crimson-500 text-white' : 'bg-teal-600 text-white'
                  }`}
                >
                  {isPyq ? 'PYQ Paper' : 'Note'}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium truncate">
                  Sem {resource.semester} • {resource.year}
                </span>
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md lg:max-w-lg mt-0.5">
                {resource.title}
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => onDownload(resource)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition"
              title="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: PDF Viewer */}
        <div className="flex-1 bg-slate-900 relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            title={resource.title}
            className="w-full h-full border-none"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3 sm:gap-4 font-medium text-[11px] sm:text-xs">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {resource.viewCount || 0} views
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-slate-400" />
              {resource.downloadCount || 0} downloads
            </span>
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-xs">
            {resource.originalFileName || resource.fileName}
          </span>
        </div>
      </div>
    </div>
  );
}

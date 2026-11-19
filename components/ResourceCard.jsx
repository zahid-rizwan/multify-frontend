'use client';

import React from 'react';
import {
  FileText,
  Download,
  Eye,
} from 'lucide-react';

export default function ResourceCard({ resource, onPreview, onDownload, layout = 'stacked' }) {
  const isPyq = resource.docType === 'PYQ';

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '2.8 MB';
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  const subjectName = resource.subject?.name || resource.subjectName || resource.subject || 'Medical Science';
  const docTypeLabel = resource.categoryTag || (isPyq ? 'PREVIOUS YEAR PAPERS' : (resource.docType === 'IMPORTANT_QUESTION' ? 'IMPORTANT QUESTIONS' : 'STUDY NOTES'));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#127177]/40 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Left: Icon and Details */}
      <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
        {/* PDF File Badge Icon */}
        <div className="w-12 h-14 rounded-xl bg-[#E8F5F2] border border-[#CDEAE5] flex-shrink-0 flex flex-col items-center justify-center text-[#127177] shadow-xs">
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-black tracking-wider uppercase">PDF</span>
        </div>

        {/* Text information */}
        <div className="min-w-0 flex-1">
          {/* Tag row */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-[#127177] uppercase tracking-wider mb-1 truncate">
            <span>{subjectName}</span>
            <span className="text-slate-300">•</span>
            <span>{docTypeLabel}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onPreview && onPreview(resource)}
            className="text-base font-bold text-[#0D1520] hover:text-[#127177] transition cursor-pointer leading-snug truncate"
            title={resource.title}
          >
            {resource.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-1 mt-1 leading-relaxed">
            {resource.description || 'Sample overview covering bones, muscles, nerves, and clinical anatomy.'}
          </p>

          {/* Meta line */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-1.5">
            <span>{resource.topic || resource.subject?.code || subjectName}</span>
            <span className="text-slate-300">•</span>
            <span>PDF</span>
            <span className="text-slate-300">•</span>
            <span>{formatFileSize(resource.fileSize)}</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div
        className={`flex ${
          layout === 'stacked'
            ? 'flex-row sm:flex-col sm:w-28'
            : 'flex-row'
        } items-stretch sm:items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-shrink-0`}
      >
        <button
          type="button"
          onClick={() => onPreview && onPreview(resource)}
          className="w-full px-4 py-2 rounded-xl border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>Preview</span>
        </button>

        <button
          type="button"
          onClick={() => onDownload && onDownload(resource)}
          className="w-full px-4 py-2 rounded-xl bg-[#127177] hover:bg-[#0E5B60] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Microscope, Heart, BookOpen, ShieldCheck, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-[800px] h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl overflow-hidden border border-teal-500/40 bg-white p-0.5 shadow-sm">
                <Image
                  src="/logo.jpg"
                  alt="MLTify"
                  width={44}
                  height={44}
                  className="object-cover rounded-[14px]"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                MLT<span className="text-teal-400">ify</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simplifying lab learning for Medical Laboratory Technology students across clinical training institutes and universities worldwide.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-teal-400 font-extrabold tracking-widest uppercase">
              <span>LEARN</span> • <span>ANALYZE</span> • <span>PRACTICE</span> • <span>EXCEL</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-400 pl-3">
              Curriculum Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/resources?docType=PYQ" className="hover:text-teal-300 transition">
                  Previous Year Questions (PYQs)
                </Link>
              </li>
              <li>
                <Link href="/resources?docType=NOTE" className="hover:text-teal-300 transition">
                  Subject Lecture Notes
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="hover:text-teal-300 transition">
                  Subject Course Directory
                </Link>
              </li>
              <li>
                <Link href="/resources?semester=3" className="hover:text-teal-300 transition">
                  Semester 3 Specializations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Disciplines */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-crimson-500 pl-3">
              Core MLT Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="hover:text-white transition">Clinical Hematology & Blood Banking</li>
              <li className="hover:text-white transition">Clinical Biochemistry & Enzymology</li>
              <li className="hover:text-white transition">Medical Microbiology & Mycology</li>
              <li className="hover:text-white transition">Histotechnology & Cytology</li>
              <li className="hover:text-white transition">Clinical Pathology & Urinalysis</li>
            </ul>
          </div>

          {/* Column 4: Student Academic Standards */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-400 pl-3">
              Academic Standards
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              All question papers and lecture notes follow verified university curriculum syllabi for B.Sc MLT, DMLT, and allied diagnostic disciplines.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-3 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>100% Free Open Educational Resource</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MLTify. Empowering future medical laboratory diagnostic scientists.</p>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Diagnostic Laboratory Academia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

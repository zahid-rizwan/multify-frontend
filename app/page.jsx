'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  FileText,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Heart,
  Stethoscope,
  Pill,
  Activity,
  Microscope,
  Scan,
  Compass,
  FileCheck,
  GraduationCap,
  FolderOpen,
  HelpCircle,
  Eye,
} from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import PdfModal from '../components/PdfModal';
import HeroDoctorArch from '../components/HeroDoctorArch';

export default function HomePage() {
  const router = useRouter();
  const [featuredResources, setFeaturedResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResource, setPreviewResource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resDocs = await fetch('/api/resources?limit=6&sort=newest')
          .then((r) => r.json())
          .catch(() => ({ data: [] }));

        if (resDocs?.data && resDocs.data.length > 0) {
          setFeaturedResources(resDocs.data);
        } else {
          // Default resources matching Figma desktop design showcase
          setFeaturedResources([
            {
              _id: 'sample-1',
              title: 'Human Anatomy — Upper Limb',
              description: 'Sample overview covering bones, muscles, nerves, and clinical anatomy.',
              subject: { name: 'Anatomy', code: 'ANAT-101' },
              docType: 'NOTE',
              year: 'MBBS Year 1',
              fileSize: 14.8 * 1024 * 1024,
            },
            {
              _id: 'sample-2',
              title: 'Cardiovascular Physiology Essentials',
              description: 'Sample study guide to cardiac cycles, pressure changes, and circulation.',
              subject: { name: 'Physiology', code: 'PHYS-201' },
              docType: 'NOTE',
              year: 'Systemic',
              fileSize: 11.2 * 1024 * 1024,
            },
            {
              _id: 'sample-3',
              title: 'Autonomic Pharmacology — Quick Review',
              description: 'Sample framework for comparing autonomic drug classes and actions.',
              subject: { name: 'Pharmacology', code: 'PHARM-301' },
              docType: 'PYQ',
              year: '2024',
              fileSize: 7.5 * 1024 * 1024,
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async (resource) => {
    try {
      if (resource._id?.startsWith('sample-')) {
        alert('This is a sample document for demonstration. Browse the full library for verified downloads.');
        router.push('/resources');
        return;
      }
      window.open(`/api/resources/${resource._id}/download`, '_blank');
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  // 8 Curated Disciplines matching Figma large screen layout
  const disciplines = [
    {
      id: 'mbbs',
      name: 'Medicine / MBBS',
      description: 'Foundational sciences through advanced clinical disciplines.',
      icon: Heart,
      href: '/resources?search=Medicine',
    },
    {
      id: 'bds',
      name: 'Dentistry / BDS',
      description: 'Oral anatomy, dental sciences, and clinical dentistry.',
      icon: Activity,
      href: '/resources?search=Dentistry',
    },
    {
      id: 'nursing',
      name: 'Nursing',
      description: 'Patient care, clinical practice, and nursing science.',
      icon: Stethoscope,
      href: '/resources?search=Nursing',
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      description: 'Pharmacology, pharmaceutics, and medicinal chemistry.',
      icon: Pill,
      href: '/resources?search=Pharmacy',
    },
    {
      id: 'physiotherapy',
      name: 'Physiotherapy',
      description: 'Movement science, rehabilitation, and therapeutic care.',
      icon: Compass,
      href: '/resources?search=Physiotherapy',
    },
    {
      id: 'mlt',
      name: 'Medical Laboratory Technology',
      description: 'Diagnostics, pathology techniques, and laboratory practice.',
      icon: Microscope,
      href: '/resources?search=Laboratory',
    },
    {
      id: 'radiology',
      name: 'Radiology & Imaging',
      description: 'Imaging principles, anatomy, and radiographic practice.',
      icon: Scan,
      href: '/resources?search=Radiology',
    },
    {
      id: 'allied',
      name: 'Other Allied Health Sciences',
      description: 'Resources for a wide range of healthcare disciplines.',
      icon: Layers,
      href: '/resources',
    },
  ];

  return (
    <div className="pb-0 overflow-hidden">
      {/* 1. HERO SECTION (WARM CREAM BACKGROUND #F4EFE6) */}
      <section className="relative bg-[#F4EFE6] pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-b from-[#EBF5F3]/60 via-[#F5FAF9]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (Desktop 7 cols) */}
            <div className="lg:col-span-7 text-left">
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#127177] tracking-[0.18em] uppercase mb-6">
                <span className="w-5 h-[1.5px] bg-[#127177]" />
                <span>YOUR MEDICAL LEARNING COMPANION</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black text-[#0D1520] tracking-tight leading-[1.12] mb-6">
                Your <span className="font-serif italic font-normal text-[#127177]">Medical</span>
                <br />
                Journey, Better
                <br />
                Connected.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 mb-9 leading-relaxed font-normal max-w-xl">
                Discover thoughtfully organized medical notes, academic resources, and study materials designed to make your learning journey easier.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <Link
                  href="/resources"
                  className="px-7 py-3.5 rounded-xl bg-[#127177] hover:bg-[#0E5B60] text-white text-sm font-bold transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>Explore study materials</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#disciplines"
                  className="px-7 py-3.5 rounded-xl bg-white border border-[#EAE5DB] hover:border-slate-300 text-[#0D1520] text-sm font-bold transition shadow-xs hover:bg-slate-50 flex items-center justify-center"
                >
                  <span>Discover subjects</span>
                </a>
              </div>

              {/* Footnote */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-4 h-[1px] bg-slate-300" />
                <span>One destination. Multiple medical disciplines. Better learning.</span>
              </div>
            </div>

            {/* Right Column (Desktop 5 cols): Doctor Arched Hero Visual */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <HeroDoctorArch />
            </div>
          </div>
        </div>
      </section>

      {/* 2. START HERE: EVERYTHING YOU NEED TO STUDY SMARTER (PURE WHITE BACKGROUND #FFFFFF) */}
      <section className="bg-white py-16 lg:py-24 border-t border-[#EAE5DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <div className="text-xs font-bold text-[#127177] tracking-[0.16em] uppercase mb-2">
              START HERE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D1520] tracking-tight">
              Everything You Need to Study Smarter.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Focused pathways for the materials students look for most.
            </p>
          </div>

          {/* 4 Cards Container with Desktop Vertical Dividers */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#EAE5DB] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE5DB] overflow-hidden">
            {/* Col 01 */}
            <Link
              href="/resources?docType=NOTE"
              className="group p-7 sm:p-8 flex flex-col justify-between hover:bg-white transition duration-200"
            >
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block mb-4">01</span>
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#127177] mb-5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0D1520] group-hover:text-[#127177] transition mb-2">
                  Study Notes
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Explore organized subject-wise study notes.
                </p>
              </div>
              <div className="pt-2">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#127177] group-hover:translate-x-1.5 transition-all" />
              </div>
            </Link>

            {/* Col 02 */}
            <Link
              href="/resources?docType=PYQ"
              className="group p-7 sm:p-8 flex flex-col justify-between hover:bg-white transition duration-200"
            >
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block mb-4">02</span>
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#127177] mb-5">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0D1520] group-hover:text-[#127177] transition mb-2">
                  Previous Year Questions
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Practice using previous examination papers.
                </p>
              </div>
              <div className="pt-2">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#127177] group-hover:translate-x-1.5 transition-all" />
              </div>
            </Link>

            {/* Col 03 */}
            <Link
              href="/resources?docType=IMPORTANT_QUESTION"
              className="group p-7 sm:p-8 flex flex-col justify-between hover:bg-white transition duration-200"
            >
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block mb-4">03</span>
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#127177] mb-5">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0D1520] group-hover:text-[#127177] transition mb-2">
                  Important Questions
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Find focused, topic-wise revision prompts.
                </p>
              </div>
              <div className="pt-2">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#127177] group-hover:translate-x-1.5 transition-all" />
              </div>
            </Link>

            {/* Col 04 */}
            <Link
              href="/resources?docType=REFERENCE"
              className="group p-7 sm:p-8 flex flex-col justify-between hover:bg-white transition duration-200"
            >
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block mb-4">04</span>
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#127177] mb-5">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0D1520] group-hover:text-[#127177] transition mb-2">
                  Reference Materials
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Discover additional academic resources.
                </p>
              </div>
              <div className="pt-2">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#127177] group-hover:translate-x-1.5 transition-all" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ACROSS HEALTHCARE: EXPLORE YOUR FIELD OF MEDICINE (WARM CREAM BACKGROUND #F4EFE6) */}
      <section id="disciplines" className="bg-[#F4EFE6] py-16 lg:py-24 border-t border-[#EAE5DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-left">
            <div className="text-xs font-bold text-[#127177] tracking-[0.16em] uppercase mb-2">
              ACROSS HEALTHCARE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D1520] tracking-tight">
              Explore Your Field of Medicine.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Find academic resources organized around your course and area of study.
            </p>
          </div>

          {/* 8 Disciplines in 4 Columns x 2 Rows on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplines.map((d) => {
              const Icon = d.icon;
              return (
                <Link
                  key={d.id}
                  href={d.href}
                  className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#127177]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top banner with orbital rings */}
                  <div className="relative h-32 bg-[#E6F4F1] border-b border-[#D7EFEA] flex items-center justify-center overflow-hidden">
                    <svg
                      className="absolute inset-0 w-full h-full text-[#127177]/20 pointer-events-none"
                      viewBox="0 0 200 120"
                      fill="none"
                    >
                      <ellipse cx="100" cy="60" rx="65" ry="32" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                      <ellipse cx="100" cy="60" rx="50" ry="24" stroke="currentColor" strokeWidth="1" />
                      <circle cx="150" cy="50" r="3" fill="#D97706" opacity="0.6" />
                    </svg>

                    <div className="relative z-10 w-11 h-11 rounded-full bg-white shadow-xs border border-[#C6E6E0] flex items-center justify-center text-[#127177] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#127177] uppercase tracking-wider block mb-1">
                        DISCIPLINE
                      </span>
                      <h3 className="text-base font-bold text-[#0D1520] group-hover:text-[#127177] transition mb-2">
                        {d.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {d.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#127177] group-hover:translate-x-1 transition-transform">
                      <span>Explore field</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CURATED LEARNING (DARK NAVY SECTION WITH FULL-WIDTH STACKED ROWS ON DESKTOP) */}
      <section className="bg-[#0D1520] text-white py-20 lg:py-28 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#127177]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Desktop 2-column header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-bold text-[#4EBEB8] tracking-[0.16em] uppercase mb-2">
                CURATED LEARNING
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Learning Resources Worth Exploring.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-400 font-normal max-w-md">
              A small selection of real, downloadable sample documents that demonstrate the MEDORA study experience.
            </p>
          </div>

          {/* Stacked Full-Width Cards */}
          <div className="space-y-4 mb-10">
            {featuredResources.slice(0, 3).map((res) => (
              <ResourceCard
                key={res._id}
                resource={res}
                onPreview={(r) => setPreviewResource(r)}
                onDownload={handleDownload}
              />
            ))}
          </div>

          {/* Bottom link */}
          <div className="text-left pt-2">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#4EBEB8] transition group"
            >
              <span>Explore the complete library</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY MEDORA: DESIGNED AROUND THE WAY STUDENTS LEARN (2-COLUMN SPLIT ON DESKTOP) */}
      <section className="bg-[#EBF2EE] py-20 lg:py-28 border-t border-[#DCE6E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (Desktop 5 cols) */}
            <div className="lg:col-span-5">
              <div className="text-xs font-bold text-[#127177] tracking-[0.16em] uppercase mb-2">
                WHY MEDORA
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0D1520] tracking-tight leading-tight mb-4">
                Designed Around the Way Students Learn.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal max-w-sm">
                Less time searching. More time understanding.
              </p>
            </div>

            {/* Right Column (Desktop 7 cols): 2x2 Grid of Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Card 01 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-bold text-slate-400">01</span>
                  <div className="w-9 h-9 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#127177]">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0D1520] mb-2">
                    Organized Learning
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Structured by course, subject, and chapter.
                  </p>
                </div>
              </div>

              {/* Card 02 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-bold text-slate-400">02</span>
                  <div className="w-9 h-9 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#127177]">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0D1520] mb-2">
                    Easy Access
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Find and download materials without unnecessary steps.
                  </p>
                </div>
              </div>

              {/* Card 03 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-bold text-slate-400">03</span>
                  <div className="w-9 h-9 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#127177]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0D1520] mb-2">
                    Student Focused
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    A calm academic experience built around student needs.
                  </p>
                </div>
              </div>

              {/* Card 04 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-bold text-slate-400">04</span>
                  <div className="w-9 h-9 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#127177]">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0D1520] mb-2">
                    Multiple Disciplines
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Discover resources across healthcare courses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR PURPOSE & PHILOSOPHY QUOTE (50/50 SPLIT CARD ON DESKTOP) */}
      <section id="purpose" className="bg-[#F4EFE6] py-20 lg:py-28 border-t border-[#EAE5DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-[#EAE5DB] shadow-sm items-stretch">
          {/* Left Half (White Purpose Card) */}
          <div className="bg-white p-8 sm:p-14 lg:p-16 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#127177] tracking-[0.16em] uppercase mb-3">
                OUR PURPOSE
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0D1520] tracking-tight leading-snug mb-5">
                Making Medical Learning More Accessible.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8 max-w-lg">
                MEDORA brings medical learning resources together in one organized and accessible destination. Our goal is to help students spend less time searching and more time learning.
              </p>
            </div>

            <div>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#127177] hover:bg-[#0E5B60] text-white text-xs font-bold transition shadow-xs active:scale-[0.98]"
              >
                <span>Explore study library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Half (Deep Teal Gradient Quote Card) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#062F34] via-[#0A4B52] to-[#0E5B63] p-8 sm:p-14 lg:p-16 text-white flex flex-col justify-between">
            {/* Ambient radial glow */}
            <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#17858D]/30 rounded-full blur-2xl pointer-events-none" />

            {/* Top Star/Sparkle icon & Quote */}
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 text-[#EAD096] mb-8" />
              <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl leading-snug text-white/95 font-normal tracking-wide">
                “Knowledge grows when every connection becomes clear.”
              </blockquote>
            </div>

            {/* Bottom watermark graphic */}
            <div className="relative z-10 flex justify-end pt-12">
              <svg className="w-16 h-16 text-white/10" viewBox="0 0 48 48" fill="none">
                <path d="M24 8v32M12 28l12 12 12-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* PDF Modal */}
      {previewResource && (
        <PdfModal
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}

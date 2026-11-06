'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  UploadCloud,
  FileText,
  Trash2,
  Eye,
  Download,
  PlusCircle,
  BarChart3,
  CheckCircle,
  AlertCircle,
  LogOut,
  FolderOpen,
  Layers,
  Search,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import PdfModal from '../../components/PdfModal';

export default function AdminDashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'resources' | 'subjects'
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalResources: 0,
    totalDownloads: 0,
    totalViews: 0,
    totalSubjects: 0,
    pyqCount: 0,
    noteCount: 0,
  });

  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResource, setPreviewResource] = useState(null);

  // Upload Form State
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [docType, setDocType] = useState('PYQ');
  const [semester, setSemester] = useState('3');
  const [year, setYear] = useState('2024');
  const [session, setSession] = useState('Annual Exam');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({ type: '', text: '' });

  // Add Subject Form State
  const [newSubjName, setNewSubjName] = useState('');
  const [newSubjCode, setNewSubjCode] = useState('');
  const [newSubjSem, setNewSubjSem] = useState('1');
  const [newSubjDesc, setNewSubjDesc] = useState('');
  const [addingSubject, setAddingSubject] = useState(false);

  // Auth verification
  useEffect(() => {
    const token = localStorage.getItem('mltify_token');
    const storedUser = localStorage.getItem('mltify_user');

    if (!token) {
      router.push('/faculty-console-mlt8492/login');
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchAdminData(token);
  }, [router]);

  const fetchAdminData = async (token) => {
    try {
      setLoading(true);
      const authHeader = { Authorization: `Bearer ${token}` };

      const [resStats, resSubj, resDocs] = await Promise.all([
        fetch('/api/admin/stats', { headers: authHeader }).then((r) => r.json()).catch(() => null),
        fetch('/api/subjects').then((r) => r.json()).catch(() => null),
        fetch('/api/resources?limit=50').then((r) => r.json()).catch(() => null),
      ]);

      if (resStats?.stats) {
        setStats(resStats.stats);
      }
      if (resSubj?.data) {
        setSubjects(resSubj.data);
        if (resSubj.data.length > 0 && !subjectId) {
          setSubjectId(resSubj.data[0]._id);
        }
      }
      if (resDocs?.data) {
        setResources(resDocs.data);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mltify_token');
    localStorage.removeItem('mltify_user');
    router.push('/faculty-console-mlt8492/login');
  };

  // Drag & drop file handlers
  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
        setFile(selectedFile);
        if (!title) {
          const autoTitle = selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setTitle(autoTitle);
        }
      } else {
        alert('Please drop a valid PDF (.pdf) file.');
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!title) {
        const autoTitle = selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(autoTitle);
      }
    }
  };

  // Upload Form Submit
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadMessage({ type: '', text: '' });

    if (!file) {
      setUploadMessage({ type: 'error', text: 'Please attach a PDF document to upload.' });
      return;
    }

    if (!title || !subjectId) {
      setUploadMessage({ type: 'error', text: 'Title and Subject are required.' });
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem('mltify_token');

      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('title', title);
      formData.append('subject', subjectId);
      formData.append('docType', docType);
      formData.append('semester', semester);
      formData.append('year', year);
      formData.append('session', session);
      formData.append('description', description);
      formData.append('tags', tags);

      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to upload document');
      }

      setUploadMessage({
        type: 'success',
        text: `Success! "${data.data.title}" has been published to the student portal.`,
      });

      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setTags('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      fetchAdminData(token);
    } catch (err) {
      setUploadMessage({ type: 'error', text: err.message });
    } finally {
      setUploading(false);
    }
  };

  // Delete Resource
  const handleDeleteResource = async (id, resourceTitle) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${resourceTitle}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('mltify_token');
      const res = await fetch(`/api/resources/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Could not delete resource');
      }

      setResources((prev) => prev.filter((r) => r._id !== id));
      fetchAdminData(token);
    } catch (err) {
      alert(`Deletion error: ${err.message}`);
    }
  };

  // Add Subject
  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      setAddingSubject(true);
      const token = localStorage.getItem('mltify_token');

      const res = await fetch('/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newSubjName,
          code: newSubjCode,
          semester: Number(newSubjSem),
          description: newSubjDesc,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create subject');
      }

      setNewSubjName('');
      setNewSubjCode('');
      setNewSubjDesc('');
      fetchAdminData(token);
      alert('Subject created successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setAddingSubject(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="bg-navy-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-teal-500/40 bg-white flex-shrink-0 shadow-md">
            <Image
              src="/logo.jpg"
              alt="MLTify Logo"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black">MLTify Academic CMS</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Signed in as <span className="text-white font-semibold">{user?.email || 'Administrator'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link
            href="/resources"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition flex items-center gap-2 border border-white/10"
          >
            <span>Live Student Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-crimson-600/20 text-crimson-300 border border-crimson-500/30 hover:bg-crimson-600 hover:text-white transition flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Total PDFs Uploaded
          </p>
          <p className="text-3xl font-black text-navy-950">
            {stats.totalResources || resources.length}
          </p>
          <div className="flex items-center gap-2 text-xs font-bold mt-2">
            <span className="text-crimson-600">{stats.pyqCount || 0} PYQs</span>
            <span>•</span>
            <span className="text-teal-700">{stats.noteCount || 0} Notes</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Student Downloads
          </p>
          <p className="text-3xl font-black text-teal-600">
            {stats.totalDownloads || 0}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Single-click PDF downloads</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Document Previews
          </p>
          <p className="text-3xl font-black text-navy-950">
            {stats.totalViews || 0}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">In-browser preview reads</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Active MLT Subjects
          </p>
          <p className="text-3xl font-black text-crimson-600">
            {subjects.length}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Semesters 1 to 8</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
            activeTab === 'upload'
              ? 'bg-navy-900 text-white shadow-md'
              : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-teal-400" />
          <span>Upload PDF (PYQ / Note)</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
            activeTab === 'resources'
              ? 'bg-navy-900 text-white shadow-md'
              : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
          }`}
        >
          <FolderOpen className="w-4 h-4 text-teal-400" />
          <span>Manage Materials ({resources.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
            activeTab === 'subjects'
              ? 'bg-navy-900 text-white shadow-md'
              : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4 text-teal-400" />
          <span>Course Subjects ({subjects.length})</span>
        </button>
      </div>

      {/* TAB 1: UPLOAD FORM */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black text-navy-950 mb-1">
              Upload New Academic Resource
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Attach a verified PDF and tag it with appropriate subject, semester, and examination year metadata.
            </p>
          </div>

          {/* Feedback Alert */}
          {uploadMessage.text && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-3 ${
                uploadMessage.type === 'success'
                  ? 'bg-teal-50 border border-teal-200 text-teal-800'
                  : 'bg-crimson-50 border border-crimson-200 text-crimson-800'
              }`}
            >
              {uploadMessage.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 text-teal-600" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-crimson-600" />
              )}
              <span className="font-bold">{uploadMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-6">
            {/* Drag & Drop PDF Dropzone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                PDF Document File <span className="text-crimson-500">*</span>
              </label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
                  file
                    ? 'border-teal-500 bg-teal-50/50'
                    : 'border-slate-300 hover:border-teal-500/70 bg-slate-50/50 hover:bg-teal-50/20'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="application/pdf,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-sm">
                      <FileText className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-navy-950">{file.name}</p>
                    <p className="text-xs text-slate-500 font-mono">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to publish
                    </p>
                    <span className="text-xs text-teal-700 underline font-semibold mt-1">
                      Click or drag to choose a different file
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-navy-900">
                      Drag & drop your PDF file here, or{' '}
                      <span className="text-teal-600 underline">browse files</span>
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      Standard PDF files only (Up to 50MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Document Type Selector (PYQ vs NOTE) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Document Category <span className="text-crimson-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                <button
                  type="button"
                  onClick={() => setDocType('PYQ')}
                  className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    docType === 'PYQ'
                      ? 'border-crimson-500 bg-crimson-50/70 text-crimson-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      docType === 'PYQ' ? 'border-crimson-600' : 'border-slate-400'
                    }`}
                  >
                    {docType === 'PYQ' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-crimson-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Previous Year Question (PYQ)</p>
                    <p className="text-[11px] text-slate-500">Past university exam paper</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDocType('NOTE')}
                  className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    docType === 'NOTE'
                      ? 'border-teal-500 bg-teal-50/70 text-teal-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      docType === 'NOTE' ? 'border-teal-600' : 'border-slate-400'
                    }`}
                  >
                    {docType === 'NOTE' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Subject Lecture Note</p>
                    <p className="text-[11px] text-slate-500">High-yield study guide or manual</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Document Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Document Title <span className="text-crimson-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Clinical Hematology Annual Question Paper 2024"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>

            {/* Subject, Semester, Year, Session */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Subject <span className="text-crimson-500">*</span>
                </label>
                <select
                  required
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500"
                >
                  <option value="">Select MLT Subject</option>
                  {subjects.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Semester <span className="text-crimson-500">*</span>
                </label>
                <select
                  required
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Exam Year <span className="text-crimson-500">*</span>
                </label>
                <select
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Session / Type
                </label>
                <input
                  type="text"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  placeholder="e.g. Annual Exam, Winter"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Description & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Description / Topic Summary
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key topics and chapters included in this document..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Keywords / Tags (comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. hematology, leishman, rbc indices, 2024"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded-2xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {uploading ? (
                <span>Publishing PDF...</span>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-teal-400" />
                  <span>Publish to Student Portal</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: MANAGE RESOURCES TABLE */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-navy-950">
              Published Question Papers & Notes
            </h2>
            <p className="text-xs text-slate-500">
              Manage all documents, check download performance, or remove outdated papers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Title & Subject</th>
                  <th className="py-3.5 px-4">Semester</th>
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4">Downloads</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resources.map((res) => (
                  <tr key={res._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          res.docType === 'PYQ'
                            ? 'bg-crimson-100 text-crimson-700'
                            : 'bg-teal-100 text-teal-800'
                        }`}
                      >
                        {res.docType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-bold text-navy-950 truncate">{res.title}</p>
                      <p className="text-[11px] text-teal-700 font-semibold">
                        {res.subject?.name || res.subjectName || 'MLT Subject'}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">Sem {res.semester}</td>
                    <td className="py-3.5 px-4 font-mono font-bold">{res.year}</td>
                    <td className="py-3.5 px-4">{res.viewCount || 0}</td>
                    <td className="py-3.5 px-4 font-bold text-teal-700">
                      {res.downloadCount || 0}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => setPreviewResource(res)}
                        className="p-1.5 text-slate-500 hover:text-navy-950 hover:bg-slate-200 rounded-lg transition"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(`/api/resources/${res._id}/download`, '_blank')
                        }
                        className="p-1.5 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteResource(res._id, res.title)}
                        className="p-1.5 text-crimson-500 hover:text-crimson-700 hover:bg-crimson-50 rounded-lg transition"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE SUBJECTS */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Subject Form */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-navy-950">Add New Subject</h3>
            <p className="text-xs text-slate-500">
              Create a new course catalog entry for students to filter resources.
            </p>

            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  value={newSubjName}
                  onChange={(e) => setNewSubjName(e.target.value)}
                  placeholder="e.g. Immunohematology"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newSubjCode}
                    onChange={(e) => setNewSubjCode(e.target.value)}
                    placeholder="MLT-303"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Semester
                  </label>
                  <select
                    value={newSubjSem}
                    onChange={(e) => setNewSubjSem(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Sem {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newSubjDesc}
                  onChange={(e) => setNewSubjDesc(e.target.value)}
                  placeholder="Subject syllabus and exam focus..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={addingSubject}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
              >
                {addingSubject ? 'Saving...' : 'Add Subject to Catalog'}
              </button>
            </form>
          </div>

          {/* Subjects List */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-navy-950">Active Curriculum Subjects</h3>
            <div className="divide-y divide-slate-100">
              {subjects.map((s) => (
                <div key={s._id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-navy-950">{s.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                        {s.code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Semester {s.semester} • {s.description || 'Core diagnostic subject'}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    <span className="text-crimson-600">{s.pyqCount || 0} PYQs</span> •{' '}
                    <span className="text-teal-700">{s.noteCount || 0} Notes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {previewResource && (
        <PdfModal
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
          onDownload={(r) => window.open(`/api/resources/${r._id}/download`, '_blank')}
        />
      )}
    </div>
  );
}

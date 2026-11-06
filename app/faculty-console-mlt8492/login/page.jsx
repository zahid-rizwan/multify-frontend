'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please check credentials.');
      }

      localStorage.setItem('mltify_token', data.token);
      localStorage.setItem('mltify_user', JSON.stringify(data.user));

      router.push('/faculty-console-mlt8492');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-teal-200/20 via-teal-100/10 to-crimson-100/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md w-full bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl p-8 sm:p-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-block relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-teal-500/40 shadow-lg mx-auto mb-2 bg-white p-0.5">
            <Image
              src="/logo.jpg"
              alt="MLTify Logo"
              width={64}
              height={64}
              className="object-cover rounded-[14px]"
              priority
            />
          </div>
          <h2 className="text-2xl font-black text-navy-950 tracking-tight">
            Administrator Sign-in
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Faculty and academic management access to publish verified PYQs and study notes
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-crimson-50 border border-crimson-200 text-crimson-700 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mltify.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded-2xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Enter Admin Console</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs font-bold text-slate-500 hover:text-navy-950 transition"
          >
            ← Back to Student Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

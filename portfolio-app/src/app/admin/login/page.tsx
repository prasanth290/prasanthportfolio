"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, ShieldCheck, Lock, Mail, Loader2, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@devstudio.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@devstudio.com");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top back link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:text-[#0a192f] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>
        <span className="font-mono text-[11px] text-[#c5a059] font-medium">Monaco Maritime CMS</span>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 flex items-center justify-center text-slate-950 font-bold mx-auto shadow-xl shadow-amber-500/20">
            <Code2 className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a192f] tracking-tight">Studio Admin Portal</h1>
          <p className="text-xs text-slate-500">Secure Content Management & Inquiries Center</p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xl space-y-5"
        >
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:bg-white focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:bg-white focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
              />
            </div>
          </div>

          {/* Quick Credential Box with 1-click helper */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[#0a192f] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Default Credentials</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[10px] text-[#c5a059] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                <span>Auto-Fill</span>
              </button>
            </div>
            <div className="font-mono text-slate-500 space-y-0.5 text-[10px]">
              <div>Email: <code className="text-[#0a192f] font-semibold">admin@devstudio.com</code></div>
              <div>Password: <code className="text-[#0a192f] font-semibold">admin123</code></div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-[#c5a059]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In To Admin Portal</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

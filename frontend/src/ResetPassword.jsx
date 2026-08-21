import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authAPI } from './services/api';
import { Lock, ArrowRight, Sparkles, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [notification, setNotification] = useState(null);

  const triggerNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  const linkIsMissingParams = !userId || !token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      triggerNotification("Please fill in both password fields.", "warning");
      return;
    }
    if (password !== confirmPassword) {
      triggerNotification("Passwords don't match.", "warning");
      return;
    }
    setSubmitting(true);
    try {
      await authAPI.resetPassword(userId, token, password);
      setDone(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      const message = typeof err.response?.data === "string"
        ? err.response.data
        : err.response?.data?.message ?? "Couldn't reset your password. The link may have expired.";
      triggerNotification(message, "warning");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans antialiased text-slate-900 select-none px-6 relative">

      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-blue-100 flex items-start gap-3 transition-all duration-300">
          <div className="p-2 rounded-xl shrink-0 bg-amber-100 text-amber-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">System Update</h4>
            <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-[420px] space-y-8 animate-fadeIn">
        <div className="flex items-center gap-3 justify-center">
          <div className="bg-[#2563EB]/10 p-2.5 rounded-xl border border-blue-100">
            <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#2563EB] fill-none stroke-current stroke-2">
              <polygon points="20 4 36 12 20 20 4 12" />
              <path d="M10 17v11c0 4 10 7 10 7s10-3 10-7V17" />
              <line x1="36" y1="12" x2="36" y2="28" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">EduSync</span>
        </div>

        {linkIsMissingParams ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900">Invalid reset link</h2>
            <p className="text-slate-500 text-[14px] leading-relaxed">
              This password reset link is incomplete or malformed. Please request a new one.
            </p>
            <Link to="/forgot-password" className="inline-block text-sm font-semibold text-[#2563EB] hover:text-[#0F4CDB] transition-colors duration-200">
              Request a new link
            </Link>
          </div>
        ) : done ? (
          <div className="text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Password reset</h2>
            <p className="text-slate-500 text-[14px] leading-relaxed">
              Your password has been updated. Redirecting you to Sign In...
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Set a new password
              </h2>
              <p className="text-slate-500 text-[14px]">
                Choose a new password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                    <Lock className="h-[18px] w-[18px]" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-10 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 pt-0.5">At least 8 characters, one uppercase letter, one number, one special character.</p>
              </div>

              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                    <Lock className="h-[18px] w-[18px]" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#2563EB] hover:bg-[#0F4CDB] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3 px-4 shadow-md hover:shadow-lg hover:shadow-blue-600/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group mt-2"
              >
                <span>{submitting ? "Resetting..." : "Reset Password"}</span>
                {!submitting && <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from './services/api';
import {
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  Award,
  Users,
  Eye,
  EyeOff
} from 'lucide-react';

// Animated interactive dashboard widgets for the premium left panel (replicating "watermarked_img_1870516786345448957.png")
const MockupDashboard = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl shadow-blue-950/40 transition-all duration-500 hover:scale-[1.01]">
      {/* Window Controls */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="text-[11px] text-white/50 font-mono ml-2">dash_v2.0_sync</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">Live Sync</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Main Attendance Card Mock */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3">
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">
              Attendance
            </span>
          </div>
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">Average Presence</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white tracking-tight">98.4%</span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5">
              ▲ +1.2%
            </span>
          </div>

          {/* Sparkline chart SVG */}
          <div className="mt-4 h-16 w-full">
            <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 45 Q 30 20 60 35 T 120 15 T 180 30 T 240 10 T 300 5"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 0 45 Q 30 20 60 35 T 120 15 T 180 30 T 240 10 T 300 5 L 300 60 L 0 60 Z"
                fill="url(#chartGrad)"
              />
              {/* Highlight Nodes */}
              <circle cx="120" cy="15" r="4" fill="#3b82f6" className="animate-pulse" />
              <circle cx="300" cy="5" r="5" fill="#10b981" />
            </svg>
          </div>
        </div>

        {/* Dynamic Grade & Roster widgets */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/40 rounded-xl p-3 border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-[11px] font-bold">Grade point</span>
              <Award className="h-3.5 w-3.5 text-yellow-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">A+</span>
              <span className="text-white/40 text-[10px]">top tier</span>
            </div>
            {/* Visual stacked bars representing grades */}
            <div className="flex gap-1 h-1.5 mt-1">
              <div className="w-full bg-blue-500 rounded-full" />
              <div className="w-full bg-blue-500 rounded-full" />
              <div className="w-full bg-blue-400 rounded-full" />
              <div className="w-2/3 bg-white/20 rounded-full" />
            </div>
          </div>

          <div className="bg-slate-900/40 rounded-xl p-3 border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-[11px] font-bold">Class Roster</span>
              <Users className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">2.4k</span>
              <span className="text-white/40 text-[10px]">students</span>
            </div>
            {/* Avatar cluster replica */}
            <div className="flex -space-x-1.5 overflow-hidden">
              <div className="w-5 h-5 rounded-full bg-blue-400 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">JD</div>
              <div className="w-5 h-5 rounded-full bg-emerald-400 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">MK</div>
              <div className="w-5 h-5 rounded-full bg-purple-400 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">SR</div>
              <div className="w-5 h-5 rounded-full bg-pink-400 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [notification, setNotification] = useState(null);

  const triggerNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      triggerNotification("Please provide both valid email & password.", "warning");
      return;
    }
    triggerNotification("Authenticating...", "success");
    try {
      const user = await authAPI.login(formData.email, formData.password);
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role?.[0] ?? "STUDENT";
      const destination =
        role === "ADMIN" ? "/admin-dashboard" :
        role === "TEACHER" ? "/teacher-dashboard" :
        "/dashboard";

      navigate(destination);
    } catch (err) {
      const message = typeof err.response?.data === "string"
        ? err.response.data
        : err.response?.data?.message ?? "Login failed. Please try again.";
      triggerNotification(message, "warning");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans antialiased text-slate-900 select-none overflow-x-hidden relative">
      
      {/* Dynamic Animated Premium Custom Alerts */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-blue-100 flex items-start gap-3 transition-all duration-300">
          <div className={`p-2 rounded-xl shrink-0 ${notification.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
            {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">System Update</h4>
            <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{notification.message}</p>
          </div>
        </div>
      )}

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-gradient-to-br from-[#0F4CDB] to-[#2563EB] p-12 flex-col justify-between relative overflow-hidden shrink-0">
        
        <div className="absolute top-[-10%] left-[-10%] w-[90%] h-[70%] rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[60%] rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
          <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 shadow-lg">
            <svg viewBox="0 0 40 40" className="w-6 h-6 text-white fill-none stroke-current stroke-2">
              <polygon points="20 4 36 12 20 20 4 12" />
              <path d="M10 17v11c0 4 10 7 10 7s10-3 10-7V17" />
              <line x1="36" y1="12" x2="36" y2="28" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">EduSync</span>
        </div>

        <div className="my-auto max-w-md relative z-10 space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-blue-100 backdrop-blur-md border border-white/10">
              <Sparkles className="h-3 w-3 text-amber-300 animate-spin" /> Next-Gen School SaaS
            </span>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Elevate Institutional Efficiency.
            </h1>
            <p className="text-blue-100/90 text-[16px] leading-relaxed font-medium">
              Access your unified dashboard to manage attendance, grades, and campus communication in one seamless interface.
            </p>
          </div>

          <div className="pt-2">
            <MockupDashboard />
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Secure Environment</span>
          </div>
          <span>v2.10.0</span>
        </div>
      </div>

      {/* RIGHT PANEL: Authentication Flow */}
      <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 xl:px-32 py-10 relative">
        <div className="w-full max-w-[460px] space-y-8 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 text-[14px]">
              Please enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSignInSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1 group">
              <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                  <Mail className="h-[18px] w-[18px]" />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@edusync.edu"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1 group">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-[#2563EB] hover:text-[#0F4CDB] transition-colors duration-200">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                  <Lock className="h-[18px] w-[18px]" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
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
            </div>

            {/* Keep signed in */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0 accent-[#2563EB]"
                />
                <span className="text-xs text-slate-600 font-semibold group-hover:text-slate-900 transition-colors duration-150">
                  Remember this device for 30 days
                </span>
              </label>
            </div>

            {/* Submit Sign In */}
            <button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-[#0F4CDB] text-white font-semibold text-sm rounded-xl py-3 px-4 shadow-md hover:shadow-lg hover:shadow-blue-600/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-[#2563EB] hover:text-[#0F4CDB] transition-colors duration-200">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
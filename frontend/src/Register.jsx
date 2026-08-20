import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from './services/api';
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    gender: 'MALE',
    dob: '',
  });

  const [notification, setNotification] = useState(null);

  const triggerNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, password, phone, city, gender, dob } = formData;
    if (!userName || !email || !password || !phone || !city || !dob) {
      triggerNotification("Please fill in all the required fields.", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("userName", userName);
      payload.append("email", email);
      payload.append("password", password);
      payload.append("phone", phone);
      payload.append("address[city]", city);
      payload.append("gender", gender);
      payload.append("dob", dob);

      const user = await authAPI.register(payload);
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
        : err.response?.data?.message ?? "Registration failed. Please try again.";
      triggerNotification(message, "warning");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans antialiased text-slate-900 select-none overflow-x-hidden relative">

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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-blue-100 backdrop-blur-md border border-white/10">
            <Sparkles className="h-3 w-3 text-amber-300" /> Next-Gen School SaaS
          </span>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Get Started With EduSync.
          </h1>
          <p className="text-blue-100/90 text-[16px] leading-relaxed font-medium">
            The first account created on a fresh EduSync instance becomes the institution's Administrator. Everyone after that signs up as a Student.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Secure Environment</span>
          </div>
          <span>v2.10.0</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 xl:px-32 py-10 relative">
        <div className="w-full max-w-[460px] space-y-8 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create your account
            </h2>
            <p className="text-slate-500 text-[14px]">
              Set up your institution's workspace in a few seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 group col-span-2">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                    <User className="h-[18px] w-[18px]" />
                  </span>
                  <input
                    type="text"
                    name="userName"
                    required
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div className="space-y-1 group col-span-2">
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
                    placeholder="you@edusync.edu"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div className="space-y-1 group col-span-2">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  Password
                </label>
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
                <p className="text-[11px] text-slate-400 pt-0.5">At least 8 characters, one uppercase letter, one number, one special character.</p>
              </div>

              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  Phone
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                    <Phone className="h-[18px] w-[18px]" />
                  </span>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="98XXXXXXXX"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  City
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                    <MapPin className="h-[18px] w-[18px]" />
                  </span>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Kathmandu"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-850 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-850 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2563EB] hover:bg-[#0F4CDB] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3 px-4 shadow-md hover:shadow-lg hover:shadow-blue-600/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group mt-2"
            >
              <span>{submitting ? "Creating account..." : "Create Account"}</span>
              {!submitting && <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#2563EB] hover:text-[#0F4CDB] transition-colors duration-200">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

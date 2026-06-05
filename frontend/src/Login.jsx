import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Check, 
  GraduationCap, 
  Chrome, 
  ShieldCheck, 
  Building, 
  UserCheck, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  Sparkles,
  ArrowLeft,
  BookOpen,
  Calendar,
  Award,
  Users
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
  // Navigation states: 'signup' | 'login' | 'success'
  const [currentScreen, setCurrentScreen] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1); // Step 1: User details, Step 2: Institution Info

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    institutionName: '',
    institutionType: 'university',
    role: 'admin',
    agreeTerms: false,
    rememberMe: false
  });

  // Validation States
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false
  });

  const [notification, setNotification] = useState(null);

  // Auto-calculate password strength properties when password changes
  useEffect(() => {
    const pw = formData.password;
    const hasLength = pw.length >= 8;
    const hasNumber = /[0-9]/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);

    let score = 0;
    if (hasLength) score += 25;
    if (hasNumber) score += 25;
    if (hasSpecial) score += 25;
    if (hasUpper) score += 25;

    setPasswordStrength({ score, hasLength, hasNumber, hasSpecial, hasUpper });
  }, [formData.password]);

  // Alert notifier helper
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


  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      triggerNotification("Please fill in all account fields to proceed", "warning");
      return;
    }
    if (passwordStrength.score < 50) {
      triggerNotification("Please choose a stronger password to protect your institution.", "warning");
      return;
    }
    setSignUpStep(2);
  };

  const handlePrevStep = () => {
    setSignUpStep(1);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!formData.institutionName) {
      triggerNotification("Institution name is mandatory for EduSync verification.", "warning");
      return;
    }
    if (!formData.agreeTerms) {
      triggerNotification("You must agree to the Terms of Service to create an account.", "warning");
      return;
    }

    // Process simulated premium animation and screen transition
    triggerNotification("Setting up your secure workspace...", "success");
    setTimeout(() => {
      setCurrentScreen('success');
    }, 1500);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      triggerNotification("Please provide both valid institutional email & security key.", "warning");
      return;
    }
    triggerNotification("Verifying institutional authentication logs...", "success");
    setTimeout(() => {
      setCurrentScreen('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans antialiased text-slate-900 select-none overflow-x-hidden relative">
      
      {/* Dynamic Animated Premium Custom Alerts instead of alerts / confirms */}
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

      {/* =========================================================================
          LEFT PANEL: Premium Branding, 3D Dashboard Mockups, Product Value Prop
         ========================================================================= */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-gradient-to-br from-[#0F4CDB] to-[#2563EB] p-12 flex-col justify-between relative overflow-hidden shrink-0">
        
        {/* Subtle Decorative Background Mesh and Floating Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[90%] h-[70%] rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[60%] rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />

        {/* EduSync Master Brand Header */}
        <div className="flex items-center gap-3 relative z-10 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
          <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 shadow-lg">
            <svg viewBox="0 0 40 40" className="w-6 h-6 text-white fill-none stroke-current stroke-2">
              {/* Exact brand graphic representation of graduation cap line art */}
              <polygon points="20 4 36 12 20 20 4 12" />
              <path d="M10 17v11c0 4 10 7 10 7s10-3 10-7V17" />
              <line x1="36" y1="12" x2="36" y2="28" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">EduSync</span>
        </div>

        {/* Dynamic value statements change depending on active view state */}
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

          {/* Premium Mockup Showcase Visual Section */}
          <div className="pt-2">
            <MockupDashboard />
          </div>
        </div>

        {/* Footer info showing security parameters */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>FERPA & SOC2 Secure Environment</span>
          </div>
          <span>v2.10.0</span>
        </div>
      </div>

      {/* =========================================================================
          RIGHT PANEL: Authentication Flow (Adaptive Signup & Login)
         ========================================================================= */}
      <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col justify-between items-center px-6 sm:px-12 lg:px-20 xl:px-32 py-10 relative">
        
        {/* Upper Screen Context Navigation Toggle (Stripe / Vercel style) */}
        <div className="w-full max-w-[460px] flex justify-between items-center text-sm font-medium">
          <button 
            onClick={() => {
              setCurrentScreen(currentScreen === 'signup' ? 'login' : 'signup');
              setSignUpStep(1);
            }}
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors duration-200"
          >
            {currentScreen === 'signup' ? (
              <>
                <span>Already have an account?</span>
                <span className="text-[#2563EB] font-bold group-hover:underline">Sign In</span>
              </>
            ) : (
              <>
                <span>Don't have an institutional account?</span>
                <span className="text-[#2563EB] font-bold group-hover:underline">Sign Up</span>
              </>
            )}
          </button>
        </div>

        {/* ======================= SIGN UP WIZARD ======================= */}
        {currentScreen === 'signup' && (
          <div className="w-full max-w-[460px] space-y-8 my-auto py-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${signUpStep === 1 ? 'bg-blue-100 text-[#2563EB]' : 'bg-slate-100 text-slate-500'}`}>
                  Step 1: Account
                </span>
                <span className="text-slate-300">/</span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${signUpStep === 2 ? 'bg-blue-100 text-[#2563EB]' : 'bg-slate-100 text-slate-500'}`}>
                  Step 2: Institution
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {signUpStep === 1 ? 'Create your administrator profile' : 'About your institution'}
              </h2>
              <p className="text-slate-500 text-[14px]">
                {signUpStep === 1 
                  ? 'Access the master registry portal and design workflow interfaces.' 
                  : 'Specify registration specifics for validation with your school registry.'}
              </p>
            </div>

            {/* Step 1 Form fields */}
            {signUpStep === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1 group">
                  <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                      <User className="h-[18px] w-[18px]" />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Alex Mercer"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Institutional Email Address */}
                <div className="space-y-1 group">
                  <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                    Work or Institutional Email
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
                      placeholder="alex.mercer@harvard.edu"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Password Setting & Eye indicator */}
                <div className="space-y-1 group">
                  <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                    Define Security Password
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

                  {/* Password Strength Micro-UX */}
                  {formData.password && (
                    <div className="space-y-2 pt-2 animate-fadeIn">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-semibold">Password Strength</span>
                        <span className={`font-bold ${
                          passwordStrength.score < 50 ? 'text-red-500' : passwordStrength.score < 100 ? 'text-amber-500' : 'text-emerald-500'
                        }`}>
                          {passwordStrength.score < 50 ? 'Weak' : passwordStrength.score < 100 ? 'Good' : 'Strong Security'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                        <div className={`h-full rounded-full transition-all duration-500 ${passwordStrength.score >= 25 ? 'bg-red-500 w-1/4' : 'w-0'}`} />
                        <div className={`h-full rounded-full transition-all duration-500 ${passwordStrength.score >= 50 ? 'bg-amber-500 w-1/4' : 'w-0'}`} />
                        <div className={`h-full rounded-full transition-all duration-500 ${passwordStrength.score >= 75 ? 'bg-blue-500 w-1/4' : 'w-0'}`} />
                        <div className={`h-full rounded-full transition-all duration-500 ${passwordStrength.score >= 100 ? 'bg-emerald-500 w-1/4' : 'w-0'}`} />
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5">
                          <Check className={`h-3 w-3 ${passwordStrength.hasLength ? 'text-emerald-500 stroke-[3]' : 'text-slate-300'}`} />
                          At least 8 characters
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Check className={`h-3 w-3 ${passwordStrength.hasUpper ? 'text-emerald-500 stroke-[3]' : 'text-slate-300'}`} />
                          One uppercase letter
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Check className={`h-3 w-3 ${passwordStrength.hasNumber ? 'text-emerald-500 stroke-[3]' : 'text-slate-300'}`} />
                          One numerical digit
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Check className={`h-3 w-3 ${passwordStrength.hasSpecial ? 'text-emerald-500 stroke-[3]' : 'text-slate-300'}`} />
                          One special character
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563EB] hover:bg-[#0F4CDB] text-white font-semibold text-sm rounded-xl py-3 px-4 shadow-md hover:shadow-lg hover:shadow-blue-600/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group mt-4"
                >
                  <span>Continue setup</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            )}

            {/* Step 2 Form fields */}
            {signUpStep === 2 && (
              <form onSubmit={handleSignUpSubmit} className="space-y-4 animate-slideIn">
                {/* Institution Name */}
                <div className="space-y-1 group">
                  <label className="text-xs font-bold text-slate-600 tracking-wide uppercase block group-focus-within:text-[#2563EB] transition-colors duration-200">
                    Official Institution Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-200">
                      <Building className="h-[18px] w-[18px]" />
                    </span>
                    <input
                      type="text"
                      name="institutionName"
                      required
                      value={formData.institutionName}
                      onChange={handleInputChange}
                      placeholder="e.g. Harvard University"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Institution Type Dropdown */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 tracking-wide uppercase">
                      Category
                    </label>
                    <select
                      name="institutionType"
                      value={formData.institutionType}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium text-slate-850 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                    >
                      <option value="university">University</option>
                      <option value="college">High School</option>
                      <option value="k12">K-12 Academy</option>
                      <option value="district">School District</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 tracking-wide uppercase">
                      My Core Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium text-slate-850 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                    >
                      <option value="admin">Administrator</option>
                      <option value="registrar">Registrar</option>
                      <option value="it">IT Coordinator</option>
                      <option value="instructor">Lead Instructor</option>
                    </select>
                  </div>
                </div>

                {/* Legal and compliance check */}
                <div className="flex items-start gap-2.5 pt-2 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0 accent-[#2563EB] mt-0.5 shrink-0"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-500 font-medium group-hover:text-slate-800 transition-colors duration-150 leading-relaxed">
                    I verify that I hold legitimate administrative rights to initialize this portal, and comply with standard student data privacy acts.
                  </label>
                </div>

                {/* Custom CTA Actions */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm rounded-xl py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#2563EB] hover:bg-[#0F4CDB] text-white font-semibold text-sm rounded-xl py-3 px-4 shadow-md hover:shadow-lg hover:shadow-blue-600/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <span>Finalize Workspace</span>
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Clean Custom Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 tracking-wider uppercase">
                Or set up via
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Social federated oauth keys */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl py-2.5 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] shadow-sm transition-all duration-200">
                <Chrome className="h-4 w-4 text-slate-500" />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl py-2.5 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] shadow-sm transition-all duration-200">
                <ShieldCheck className="h-4 w-4 text-slate-500" />
                <span>SSO / Active Directory</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================= SIGN IN SCREEN ======================= */}
        {currentScreen === 'login' && (
          <div className="w-full max-w-[460px] space-y-8 my-auto py-8 animate-fadeIn">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-500 text-[14px]">
                Please enter your registered institutional credentials.
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
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-850 placeholder-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
                  />
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
                <span>Sign in to Account</span>
                <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 tracking-wider uppercase">
                Or Continue with
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Social authentication buttons */}
            <div className="grid grid-cols-2 gap-3.5">
              <button className="flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl py-2.5 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] shadow-sm transition-all duration-200">
                <Chrome className="h-4 w-4 text-slate-500" />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl py-2.5 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] shadow-sm transition-all duration-200">
                <ShieldCheck className="h-4 w-4 text-slate-500" />
                <span>SSO</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================= SUCCESS SCREEN ======================= */}
        {currentScreen === 'success' && (
          <div className="w-full max-w-[460px] space-y-8 my-auto py-8 text-center animate-scaleIn">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 shadow-inner relative">
              <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
              <Check className="h-10 w-10 stroke-[3]" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome to EduSync
              </h2>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Your portal secure keys and workspace has been initialized for <span className="font-bold text-slate-800">{formData.institutionName || 'your School'}</span>. Verification confirmation details has been dispatched to <span className="font-bold text-slate-800">{formData.email}</span>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Administrator</span>
                <span className="text-slate-800 font-bold">{formData.fullName || 'Alex Mercer'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Workspace Status</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Ready
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Verification Protocol</span>
                <span className="text-[#2563EB] font-bold">Standard FERPA</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentScreen('login');
                setSignUpStep(1);
              }}
              className="w-full bg-[#2563EB] hover:bg-[#0F4CDB] text-white font-semibold text-sm rounded-xl py-3 px-4 shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Master Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Global Footer Support Links */}
        <div className="w-full max-w-[460px] text-center text-xs text-slate-400 pt-6">
          <p>Don't have an institutional account? <a href="#support" className="text-[#2563EB] hover:underline font-bold">Contact Support</a></p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#terms" className="hover:text-slate-600">Privacy Policy</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-slate-600">Security Architecture</a>
          </div>
        </div>

      </div>

    </div>
  );
}
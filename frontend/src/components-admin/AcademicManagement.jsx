import { useState } from "react";

const genId = () => Date.now() + Math.floor(Math.random() * 9999);

const initialData = [
  {
    id: 1, name: "Faculty of Engineering", code: "FOE", colorIdx: 0,
    courses: [
      {
        id: 101, name: "Bachelor of Computer Applications", code: "BCA", duration: "4 Years", seats: 60,
        subjects: [
          { id: 1001, name: "Web Development", semester: 3, credits: 4, type: "Core" },
          { id: 1002, name: "Data Structures", semester: 2, credits: 4, type: "Core" },
          { id: 1003, name: "Mobile App Dev", semester: 5, credits: 3, type: "Elective" },
        ],
      },
      {
        id: 102, name: "Bachelor of Information Technology", code: "BIT", duration: "4 Years", seats: 45,
        subjects: [
          { id: 1004, name: "Network Security", semester: 4, credits: 3, type: "Core" },
          { id: 1005, name: "Cloud Computing", semester: 6, credits: 3, type: "Elective" },
        ],
      },
    ],
  },
  {
    id: 2, name: "Faculty of Management", code: "FOM", colorIdx: 1,
    courses: [
      {
        id: 201, name: "Bachelor of Business Administration", code: "BBA", duration: "3 Years", seats: 80,
        subjects: [
          { id: 2001, name: "Digital Marketing", semester: 4, credits: 3, type: "Elective" },
          { id: 2002, name: "Financial Accounting", semester: 1, credits: 4, type: "Core" },
        ],
      },
      {
        id: 202, name: "Master of Business Administration", code: "MBA", duration: "2 Years", seats: 40,
        subjects: [
          { id: 2004, name: "Strategic Management", semester: 1, credits: 4, type: "Core" },
          { id: 2005, name: "Entrepreneurship", semester: 3, credits: 3, type: "Elective" },
        ],
      },
    ],
  },
  {
    id: 3, name: "Faculty of Science", code: "FOS", colorIdx: 2,
    courses: [
      {
        id: 301, name: "Bachelor of Science", code: "BSc", duration: "3 Years", seats: 50,
        subjects: [
          { id: 3001, name: "Quantum Mechanics", semester: 5, credits: 4, type: "Core" },
          { id: 3002, name: "Thermodynamics", semester: 3, credits: 4, type: "Core" },
          { id: 3003, name: "Astrophysics", semester: 6, credits: 3, type: "Elective" },
        ],
      },
    ],
  },
];

const PALETTE = [
  { bar: "bg-blue-500",    light: "bg-blue-50",    border: "border-blue-200",   code: "bg-blue-100 text-blue-700",     icon: "bg-blue-100 text-blue-600",    gradient: "from-blue-600 via-blue-500 to-indigo-500",    btnBorder: "border-blue-200", btnText: "text-blue-600", btnHover: "hover:bg-blue-50",   accent: "blue"    },
  { bar: "bg-violet-500",  light: "bg-violet-50",  border: "border-violet-200", code: "bg-violet-100 text-violet-700", icon: "bg-violet-100 text-violet-600", gradient: "from-violet-600 via-violet-500 to-purple-500", btnBorder: "border-violet-200", btnText: "text-violet-600", btnHover: "hover:bg-violet-50", accent: "violet"  },
  { bar: "bg-emerald-500", light: "bg-emerald-50", border: "border-emerald-200",code: "bg-emerald-100 text-emerald-700",icon: "bg-emerald-100 text-emerald-600",gradient: "from-emerald-600 via-emerald-500 to-teal-500",  btnBorder: "border-emerald-200", btnText: "text-emerald-600", btnHover: "hover:bg-emerald-50", accent: "emerald" },
  { bar: "bg-amber-500",   light: "bg-amber-50",   border: "border-amber-200",  code: "bg-amber-100 text-amber-700",   icon: "bg-amber-100 text-amber-600",  gradient: "from-amber-600 via-amber-500 to-orange-500",  btnBorder: "border-amber-200", btnText: "text-amber-600", btnHover: "hover:bg-amber-50",   accent: "amber"   },
  { bar: "bg-rose-500",    light: "bg-rose-50",    border: "border-rose-200",   code: "bg-rose-100 text-rose-700",     icon: "bg-rose-100 text-rose-600",    gradient: "from-rose-600 via-rose-500 to-pink-500",      btnBorder: "border-rose-200", btnText: "text-rose-600", btnHover: "hover:bg-rose-50",     accent: "rose"    },
  { bar: "bg-indigo-500",  light: "bg-indigo-50",  border: "border-indigo-200", code: "bg-indigo-100 text-indigo-700", icon: "bg-indigo-100 text-indigo-600", gradient: "from-indigo-600 via-indigo-500 to-blue-500",  btnBorder: "border-indigo-200", btnText: "text-indigo-600", btnHover: "hover:bg-indigo-50",  accent: "indigo"  },
];

const MODAL_BTN = {
  blue:    "bg-blue-600 hover:bg-blue-700",
  violet:  "bg-violet-600 hover:bg-violet-700",
  emerald: "bg-emerald-600 hover:bg-emerald-700",
  amber:   "bg-amber-600 hover:bg-amber-700",
  rose:    "bg-rose-600 hover:bg-rose-700",
  indigo:  "bg-indigo-600 hover:bg-indigo-700",
};

// ── Icons ────────────────────────────────────────────────
const ChevronRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);
const ChevronLeft = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);
const Trash = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const Plus = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);
const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const Warning = () => (
  <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);
const DeptIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const CourseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const SubjectIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all placeholder:text-slate-400";
const selectCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all";

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function Modal({ title, subtitle, gradient = "from-blue-600 to-blue-500", accent = "blue", onClose, onSubmit, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${gradient} px-6 py-5`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">{title}</h2>
              {subtitle && <p className="text-xs text-white/70 mt-0.5">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
              <XIcon />
            </button>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="px-6 py-5 space-y-4">{children}</div>
          <div className="px-6 pb-5 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold active:scale-95 transition-all shadow-sm ${MODAL_BTN[accent] ?? MODAL_BTN.blue}`}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ target, onClose, onConfirm }) {
  const childLabel = target.type === "department" ? "courses & subjects" : target.type === "course" ? "subjects" : null;
  const childCount =
    target.type === "department" ? target.obj.courses.reduce((s, c) => s + 1 + c.subjects.length, 0)
    : target.type === "course" ? target.obj.subjects.length : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-slate-100 overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Trash className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1 capitalize">Delete {target.type}?</h3>
          <p className="text-sm text-slate-500 mb-4">
            <span className="font-semibold text-slate-700">{target.obj.name}</span> will be permanently removed.
          </p>
          {childCount > 0 && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-left mb-4">
              <Warning />
              <p className="text-xs text-amber-700 font-medium leading-relaxed">
                This will also delete all {childCount} nested {childLabel}.
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message, sub, action, actionLabel, p }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center px-6">
      <div className={`w-14 h-14 rounded-2xl ${p ? p.icon.split(" ")[0] : "bg-blue-100"} flex items-center justify-center mb-4`}>
        <svg className={`w-7 h-7 ${p ? p.icon.split(" ")[1] : "text-blue-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-600">{message}</p>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
      {action && (
        <button
          onClick={action}
          className={`mt-4 flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${p ? `${p.btnText} ${p.btnBorder} ${p.btnHover}` : "text-blue-600 border-blue-200 hover:bg-blue-50"}`}
        >
          <Plus className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────
const AcademicManagement = () => {
  const [departments, setDepartments] = useState(initialData);
  const [view, setView] = useState("departments"); // "departments" | "courses" | "subjects"
  const [activeDeptId, setActiveDeptId] = useState(null);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({});

  const activeDept   = departments.find((d) => d.id === activeDeptId) ?? null;
  const activeCourse = activeDept?.courses.find((c) => c.id === activeCourseId) ?? null;
  const dp           = activeDept ? PALETTE[activeDept.colorIdx % PALETTE.length] : PALETTE[0];

  const totalCourses  = departments.reduce((s, d) => s + d.courses.length, 0);
  const totalSubjects = departments.reduce((s, d) => d.courses.reduce((ss, c) => ss + c.subjects.length, s), 0);

  const q = search.toLowerCase();
  const filteredDepts    = departments.filter((d) => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q));
  const filteredCourses  = (activeDept?.courses ?? []).filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  const filteredSubjects = (activeCourse?.subjects ?? []).filter((s) => s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q));

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Navigation
  const openCourses  = (dept)   => { setActiveDeptId(dept.id); setActiveCourseId(null); setSearch(""); setView("courses");  };
  const openSubjects = (course) => { setActiveCourseId(course.id); setSearch(""); setView("subjects"); };
  const goBack = () => { setSearch(""); setView(view === "subjects" ? "courses" : "departments"); };
  const gotoLevel = (lvl) => {
    setSearch("");
    setView(lvl);
    if (lvl === "departments") { setActiveDeptId(null); setActiveCourseId(null); }
    else if (lvl === "courses") { setActiveCourseId(null); }
  };

  // CRUD
  const handleAddDept = (e) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.code?.trim()) return;
    setDepartments((p) => [...p, { id: genId(), name: form.name.trim(), code: form.code.trim().toUpperCase(), colorIdx: p.length % PALETTE.length, courses: [] }]);
    setModal(null);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.code?.trim() || !form.duration?.trim() || !form.seats) return;
    setDepartments((p) =>
      p.map((d) => d.id === modal.deptId
        ? { ...d, courses: [...d.courses, { id: genId(), name: form.name.trim(), code: form.code.trim().toUpperCase(), duration: form.duration.trim(), seats: parseInt(form.seats), subjects: [] }] }
        : d)
    );
    setModal(null);
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.semester || !form.credits || !form.type) return;
    setDepartments((p) =>
      p.map((d) => d.id === modal.deptId
        ? { ...d, courses: d.courses.map((c) => c.id === modal.courseId
            ? { ...c, subjects: [...c.subjects, { id: genId(), name: form.name.trim(), semester: parseInt(form.semester), credits: parseInt(form.credits), type: form.type }] }
            : c) }
        : d)
    );
    setModal(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "department") {
      setDepartments((p) => p.filter((d) => d.id !== deleteTarget.id));
      if (activeDeptId === deleteTarget.id) { setView("departments"); setActiveDeptId(null); setActiveCourseId(null); }
    } else if (deleteTarget.type === "course") {
      setDepartments((p) => p.map((d) => d.id === deleteTarget.deptId ? { ...d, courses: d.courses.filter((c) => c.id !== deleteTarget.id) } : d));
      if (activeCourseId === deleteTarget.id) { setView("courses"); setActiveCourseId(null); }
    } else {
      setDepartments((p) =>
        p.map((d) => d.id === deleteTarget.deptId
          ? { ...d, courses: d.courses.map((c) => c.id === deleteTarget.courseId ? { ...c, subjects: c.subjects.filter((s) => s.id !== deleteTarget.id) } : c) }
          : d)
      );
    }
    setDeleteTarget(null);
  };

  // Header config per view
  const headerGradient = view === "departments" ? "from-blue-600 via-blue-500 to-indigo-500" : dp.gradient;

  const stats =
    view === "departments" ? [
      { label: "Departments", value: departments.length,  bg: "bg-blue-50",    text: "text-blue-700",    sub: "text-blue-400",    Icon: DeptIcon    },
      { label: "Courses",     value: totalCourses,        bg: "bg-violet-50",  text: "text-violet-700",  sub: "text-violet-400",  Icon: CourseIcon   },
      { label: "Subjects",    value: totalSubjects,       bg: "bg-emerald-50", text: "text-emerald-700", sub: "text-emerald-400", Icon: SubjectIcon  },
    ] : view === "courses" ? [
      { label: "Courses",        value: activeDept?.courses.length ?? 0,                               bg: dp.light,       text: dp.icon.split(" ")[1], sub: "text-slate-400", Icon: CourseIcon  },
      { label: "Total Subjects", value: activeDept?.courses.reduce((s, c) => s + c.subjects.length, 0) ?? 0, bg: "bg-slate-50",   text: "text-slate-700",      sub: "text-slate-400", Icon: SubjectIcon },
      { label: "All Depts",      value: departments.length,                                            bg: "bg-slate-50",   text: "text-slate-500",      sub: "text-slate-300", Icon: DeptIcon    },
    ] : [
      { label: "Subjects",  value: activeCourse?.subjects.length ?? 0,                            bg: "bg-emerald-50", text: "text-emerald-700", sub: "text-emerald-400", Icon: SubjectIcon },
      { label: "Core",      value: activeCourse?.subjects.filter((s) => s.type === "Core").length ?? 0,     bg: "bg-blue-50",    text: "text-blue-700",    sub: "text-blue-400",    Icon: CourseIcon  },
      { label: "Elective",  value: activeCourse?.subjects.filter((s) => s.type === "Elective").length ?? 0, bg: "bg-amber-50",   text: "text-amber-700",   sub: "text-amber-400",   Icon: SubjectIcon },
    ];

  return (
    <div className="space-y-5">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className={`bg-gradient-to-r ${headerGradient} px-6 py-5`}>

          {/* Breadcrumb */}
          {view !== "departments" && (
            <nav className="flex items-center gap-1.5 mb-3 flex-wrap">
              <button onClick={() => gotoLevel("departments")} className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors">
                <DeptIcon className="w-3 h-3" /> Departments
              </button>
              {activeDept && (
                <>
                  <ChevronRight className="w-3 h-3 text-white/30" />
                  <button
                    onClick={() => gotoLevel("courses")}
                    className={`text-xs transition-colors ${view === "courses" ? "text-white font-semibold" : "text-white/60 hover:text-white"}`}
                  >
                    {activeDept.name}
                  </button>
                </>
              )}
              {view === "subjects" && activeCourse && (
                <>
                  <ChevronRight className="w-3 h-3 text-white/30" />
                  <span className="text-xs text-white font-semibold">{activeCourse.name}</span>
                </>
              )}
            </nav>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {view !== "departments" ? (
                <button onClick={goBack} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/25 hover:bg-white/40 border border-white/40 text-white text-sm font-semibold transition-all shrink-0 shadow-sm">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <DeptIcon className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg font-bold text-white">
                    {view === "departments" ? "Academic Management" : view === "courses" ? activeDept?.name : activeCourse?.name}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/20 text-white uppercase tracking-wider">
                    {view === "departments" ? "Departments" : view === "courses" ? "Courses" : "Subjects"}
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-0.5">
                  {view === "departments"
                    ? "Manage departments, courses & subjects"
                    : view === "courses"
                    ? `${activeDept?.code} · ${activeDept?.courses.length} course${activeDept?.courses.length !== 1 ? "s" : ""}`
                    : `${activeDept?.code} › ${activeCourse?.code} · ${activeCourse?.subjects.length} subject${activeCourse?.subjects.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setForm({});
                if (view === "departments") setModal({ type: "addDept" });
                else if (view === "courses") setModal({ type: "addCourse", deptId: activeDeptId });
                else setModal({ type: "addSubject", deptId: activeDeptId, courseId: activeCourseId });
              }}
              className="flex items-center gap-2 bg-white/90 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white active:scale-95 transition-all shadow-sm self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              {view === "departments" ? "Add Department" : view === "courses" ? "Add Course" : "Add Subject"}
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-slate-100">
          {stats.map((s) => (
            <div key={s.label} className={`flex items-center gap-3 p-4 ${s.bg}`}>
              <div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center shrink-0 shadow-sm">
                <s.Icon className={`w-4 h-4 ${s.text}`} />
              </div>
              <div>
                <p className={`text-xl font-bold leading-none ${s.text}`}>{s.value}</p>
                <p className={`text-xs mt-0.5 font-medium ${s.sub}`}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content Card ────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-700">
              {view === "departments" ? "All Departments"
               : view === "courses" ? `Courses in ${activeDept?.name}`
               : `Subjects in ${activeCourse?.name}`}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {view === "departments" ? `${filteredDepts.length} of ${departments.length} shown`
               : view === "courses"   ? `${filteredCourses.length} of ${activeDept?.courses.length ?? 0} shown`
               : `${filteredSubjects.length} of ${activeCourse?.subjects.length ?? 0} shown`}
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={view === "departments" ? "Search departments…" : view === "courses" ? "Search courses…" : "Search subjects…"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
            />
          </div>
        </div>

        {/* ── Departments Grid ── */}
        {view === "departments" && (
          filteredDepts.length === 0
            ? <EmptyState message="No departments found" sub="Try adjusting your search or add a new department." />
            : (
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDepts.map((dept) => {
                  const p = PALETTE[dept.colorIdx % PALETTE.length];
                  const totalSubs = dept.courses.reduce((s, c) => s + c.subjects.length, 0);
                  return (
                    <div
                      key={dept.id}
                      onClick={() => openCourses(dept)}
                      className="relative bg-white rounded-2xl border-2 border-slate-100 hover:border-slate-200 overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-200"
                    >
                      <div className={`h-1.5 ${p.bar}`} />
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-11 h-11 rounded-2xl ${p.icon.split(" ")[0]} flex items-center justify-center`}>
                            <DeptIcon className={`w-5 h-5 ${p.icon.split(" ")[1]}`} />
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: "department", id: dept.id, deptId: dept.id, obj: dept }); }}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash />
                          </button>
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 leading-snug">{dept.name}</h3>
                        <span className={`inline-block mt-1.5 text-xs font-bold px-2.5 py-0.5 rounded-lg ${p.code}`}>{dept.code}</span>

                        <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-slate-100">
                          <div className="flex items-center gap-1">
                            <CourseIcon className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs text-slate-500 font-medium">{dept.courses.length} Courses</span>
                          </div>
                          <span className="text-slate-200">·</span>
                          <div className="flex items-center gap-1">
                            <SubjectIcon className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs text-slate-500 font-medium">{totalSubs} Subjects</span>
                          </div>
                          <div className={`ml-auto w-7 h-7 rounded-xl ${p.icon.split(" ")[0]} flex items-center justify-center group-hover:translate-x-0.5 transition-transform`}>
                            <ChevronRight className={`w-3.5 h-3.5 ${p.icon.split(" ")[1]}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
        )}

        {/* ── Courses Grid ── */}
        {view === "courses" && (
          filteredCourses.length === 0
            ? <EmptyState message="No courses in this department" sub="Add the first course to get started." action={() => { setForm({}); setModal({ type: "addCourse", deptId: activeDeptId }); }} actionLabel="Add First Course" p={dp} />
            : (
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => openSubjects(course)}
                    className="relative bg-white rounded-2xl border-2 border-slate-100 hover:border-slate-200 overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-200"
                  >
                    <div className={`h-1.5 ${dp.bar}`} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl ${dp.icon.split(" ")[0]} flex items-center justify-center`}>
                          <CourseIcon className={`w-5 h-5 ${dp.icon.split(" ")[1]}`} />
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: "course", id: course.id, deptId: activeDeptId, obj: course }); }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash />
                        </button>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 leading-snug">{course.name}</h3>
                      <span className={`inline-block mt-1.5 text-xs font-bold px-2.5 py-0.5 rounded-lg ${dp.code}`}>{course.code}</span>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">{course.duration}</span>
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">{course.seats} seats</span>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <SubjectIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500 font-medium">{course.subjects.length} Subjects</span>
                        <div className={`ml-auto w-7 h-7 rounded-xl ${dp.icon.split(" ")[0]} flex items-center justify-center group-hover:translate-x-0.5 transition-transform`}>
                          <ChevronRight className={`w-3.5 h-3.5 ${dp.icon.split(" ")[1]}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
        )}

        {/* ── Subjects List ── */}
        {view === "subjects" && (
          filteredSubjects.length === 0
            ? <EmptyState message="No subjects in this course" sub="Add subjects to start building the curriculum." action={() => { setForm({}); setModal({ type: "addSubject", deptId: activeDeptId, courseId: activeCourseId }); }} actionLabel="Add First Subject" p={dp} />
            : (
              <div className="p-5 space-y-2.5">
                {filteredSubjects.map((sub, idx) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all group"
                  >
                    {/* Index badge */}
                    <div className={`w-9 h-9 rounded-xl ${dp.icon.split(" ")[0]} flex items-center justify-center shrink-0`}>
                      <span className={`text-xs font-bold ${dp.icon.split(" ")[1]}`}>{String(idx + 1).padStart(2, "0")}</span>
                    </div>

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{sub.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Semester {sub.semester}</p>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 font-semibold whitespace-nowrap">
                        Sem {sub.semester}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${
                        sub.type === "Core"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {sub.type === "Core" ? "● Core" : "◌ Elective"}
                      </span>
                      <button
                        onClick={() => setDeleteTarget({ type: "subject", id: sub.id, deptId: activeDeptId, courseId: activeCourseId, obj: sub })}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 ml-1"
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
        )}
      </div>

      {/* ── Add Department Modal ── */}
      {modal?.type === "addDept" && (
        <Modal title="New Department" subtitle="Add a new faculty or department" gradient="from-blue-600 to-blue-500" accent="blue" onClose={() => setModal(null)} onSubmit={handleAddDept}>
          <Field label="Department Name">
            <input autoFocus required className={inputCls} placeholder="e.g. Faculty of Arts" value={form.name || ""} onChange={setField("name")} />
          </Field>
          <Field label="Department Code">
            <input required className={inputCls} placeholder="e.g. FOA" maxLength={6} value={form.code || ""} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase().slice(0, 6) }))} />
          </Field>
        </Modal>
      )}

      {/* ── Add Course Modal ── */}
      {modal?.type === "addCourse" && (
        <Modal title="New Course" subtitle={`Add a course to ${activeDept?.name}`} gradient={dp.gradient} accent={dp.accent} onClose={() => setModal(null)} onSubmit={handleAddCourse}>
          <Field label="Course Name">
            <input autoFocus required className={inputCls} placeholder="e.g. Bachelor of Arts" value={form.name || ""} onChange={setField("name")} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Course Code">
              <input required className={inputCls} placeholder="e.g. BA" value={form.code || ""} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase().slice(0, 6) }))} />
            </Field>
            <Field label="Duration">
              <input required className={inputCls} placeholder="e.g. 3 Years" value={form.duration || ""} onChange={setField("duration")} />
            </Field>
          </div>
          <Field label="Seat Capacity">
            <input required type="number" min="1" className={inputCls} placeholder="e.g. 60" value={form.seats || ""} onChange={setField("seats")} />
          </Field>
        </Modal>
      )}

      {/* ── Add Subject Modal ── */}
      {modal?.type === "addSubject" && (
        <Modal title="New Subject" subtitle={`Add a subject to ${activeCourse?.name}`} gradient="from-emerald-600 to-teal-500" accent="emerald" onClose={() => setModal(null)} onSubmit={handleAddSubject}>
          <Field label="Subject Name">
            <input autoFocus required className={inputCls} placeholder="e.g. Introduction to Programming" value={form.name || ""} onChange={setField("name")} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Semester">
              <select required className={selectCls} value={form.semester || ""} onChange={setField("semester")}>
                <option value="" disabled>Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </Field>
            <Field label="Credits">
              <select required className={selectCls} value={form.credits || ""} onChange={setField("credits")}>
                <option value="" disabled>Select</option>
                {[1, 2, 3, 4, 5, 6].map((c) => <option key={c} value={c}>{c} Credit{c !== 1 ? "s" : ""}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Subject Type">
            <div className="flex gap-3">
              {["Core", "Elective"].map((t) => (
                <button
                  key={t} type="button"
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    form.type === t
                      ? t === "Core" ? "bg-emerald-100 border-emerald-300 text-emerald-700" : "bg-amber-100 border-amber-300 text-amber-700"
                      : "border-slate-200 text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {t === "Core" ? "● Core" : "◌ Elective"}
                </button>
              ))}
            </div>
          </Field>
        </Modal>
      )}

      {/* ── Delete Confirmation ── */}
      {deleteTarget && (
        <DeleteModal target={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
      )}
    </div>
  );
};

export default AcademicManagement;

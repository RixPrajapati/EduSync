// Mock data matching EduSync Proposal requirements
export const mockAttendanceData = {
  overallPercentage: 82,
  totalStudents: 1200,
  presentToday: 980,
  absentToday: 220,
  lowAttendanceStudents: [
    {
      id: 1,
      name: "Priya Tamang",
      course: "BCA",
      attendance: 45,
      department: "Engineering",
      email: "priya@edusync.com",
    },
    {
      id: 2,
      name: "Rajan Gurung",
      course: "BIT",
      attendance: 60,
      department: "Engineering",
      email: "rajan@edusync.com",
    },
    {
      id: 3,
      name: "Ananya Singh",
      course: "BBA",
      attendance: 68,
      department: "Management",
      email: "ananya@edusync.com",
    },
  ],
  departmentWise: [
    {
      dept: "Faculty of Engineering",
      avgAttendance: 85,
      totalStudents: 400,
      code: "FOE",
    },
    {
      dept: "Faculty of Management",
      avgAttendance: 78,
      totalStudents: 350,
      code: "FOM",
    },
    {
      dept: "Faculty of Science",
      avgAttendance: 82,
      totalStudents: 450,
      code: "FOS",
    },
  ],
};

export const mockMarksData = {
  totalStudents: 1200,
  averageMarks: 68,
  passPercentage: 87,
  totalBacklogs: 45,
  gradeDistribution: { A: 250, B: 400, C: 300, D: 150, F: 100 },
  backlogStudents: [
    {
      id: 1,
      name: "Sanjay Shrestha",
      course: "BCA",
      failedSubjects: 2,
      department: "Engineering",
    },
    {
      id: 2,
      name: "Priya Tamang",
      course: "BIT",
      failedSubjects: 1,
      department: "Engineering",
    },
    {
      id: 3,
      name: "Arjun Khanal",
      course: "BBA",
      failedSubjects: 3,
      department: "Management",
    },
  ],
  subjectWise: [
    { subject: "Web Development", avgMarks: 72, passRate: 92, course: "BCA" },
    { subject: "Data Structures", avgMarks: 65, passRate: 85, course: "BCA" },
    { subject: "Digital Marketing", avgMarks: 70, passRate: 88, course: "BBA" },
  ],
};

// Mock API functions (will be replaced with real Axios calls later)
export const getAttendanceSummary = () => {
  return Promise.resolve({ success: true, data: mockAttendanceData });
};

export const getMarksSummary = () => {
  return Promise.resolve({ success: true, data: mockMarksData });
};

export const exportAttendanceReport = (deptId) => {
  return Promise.resolve({ success: true, message: "PDF report generated" });
};

export const exportMarksheet = (studentId) => {
  return Promise.resolve({ success: true, message: "Marksheet PDF generated" });
};

export const mockUsers = [
  { id: 1,  name: "Ananya Singh",     email: "ananya@edusync.com",    role: "STUDENT", status: "Active"   },
  { id: 2,  name: "Bikash Shrestha", email: "bikash@edusync.com",    role: "STUDENT", status: "Active"   },
  { id: 3,  name: "Nisha Poudel",    email: "nisha@edusync.com",     role: "STUDENT", status: "Active"   },
  { id: 4,  name: "Aarav Joshi",     email: "aarav@edusync.com",     role: "STUDENT", status: "Inactive" },
  { id: 5,  name: "Arjun Khanal",    email: "arjun@edusync.com",     role: "STUDENT", status: "Active"   },
  { id: 6,  name: "Priya Tamang",    email: "priya@edusync.com",     role: "STUDENT", status: "Active"   },
  { id: 7,  name: "Rajan Gurung",    email: "rajan@edusync.com",     role: "STUDENT", status: "Active"   },
  { id: 8,  name: "Sita Maharjan",   email: "sita@edusync.com",      role: "STUDENT", status: "Inactive" },
  { id: 9,  name: "Kumar Limbu",     email: "kumar@edusync.com",     role: "STUDENT", status: "Active"   },
  { id: 10, name: "Mina Shakya",     email: "mina@edusync.com",      role: "STUDENT", status: "Active"   },
  { id: 11, name: "Mr. Bikram Sharma",  email: "bikram@edusync.com",  role: "TEACHER", status: "Active"   },
  { id: 12, name: "Ms. Rupa Acharya",   email: "rupa@edusync.com",    role: "TEACHER", status: "Active"   },
  { id: 13, name: "Mr. Sanjay Koirala", email: "sanjay@edusync.com",  role: "TEACHER", status: "Active"   },
  { id: 14, name: "Ms. Sunita Thapa",   email: "sunita@edusync.com",  role: "TEACHER", status: "Inactive" },
];

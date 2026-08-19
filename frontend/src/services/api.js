import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Attach JWT from localStorage to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Maps backend shape → UI shape
// role is returned as an array e.g. ["STUDENT"] — flatten to a string for display
const normalizeUser = (u) => ({
  id:     u.id     ?? u._id,
  name:   u.userName,
  email:  u.email,
  role:   u.role?.[0] ?? "STUDENT",
  status: u.status ?? (u.isActive ? "Active" : "Inactive"),
});

export const authAPI = {
  // POST /auth/login — returns { ...user, token }
  login: (email, password) =>
    apiClient.post("/auth/login", { email, password }).then((res) => res.data),
};

export const userAPI = {
  // GET /user/user
  getAll: () =>
    apiClient.get("/user/user").then((res) => {
      const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
      return list.map(normalizeUser);
    }),

  // POST /user/addUser — receives FormData; axios sets multipart/form-data automatically
  create: (formData) =>
    apiClient.post("/user/addUser", formData).then((res) =>
      normalizeUser(res.data?.data ?? res.data)
    ),

  // PUT /user/:id
  update: (id, data) =>
    apiClient.put(`/user/${id}`, data).then((res) => normalizeUser(res.data?.data ?? res.data)),

  // DELETE /user/:id
  remove: (id) => apiClient.delete(`/user/${id}`),
};

export const noticeAPI = {
  // GET /notice/notice
  getAll: () =>
    apiClient.get("/notice/notice").then((res) =>
      Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
    ),

  // POST /notice/create — { title, description, noticeTyped }
  create: (data) =>
    apiClient.post("/notice/create", data).then((res) => res.data),

  // DELETE /notice/:id/delete
  remove: (id) => apiClient.delete(`/notice/${id}/delete`),
};

export const courseAPI = {
  // GET /course
  getAll: () => apiClient.get("/course").then((res) => res.data),

  // POST /course — backend only allows TEACHER role to create
  create: (data) => apiClient.post("/course", data).then((res) => res.data),

  // PUT /course/:id — TEACHER or ADMIN
  update: (id, data) => apiClient.put(`/course/${id}`, data).then((res) => res.data),

  // DELETE /course/:id — ADMIN only
  remove: (id) => apiClient.delete(`/course/${id}`),
};

export const marksAPI = {
  // GET /marks/overview
  getOverview: () => apiClient.get("/marks/overview").then((res) => res.data?.data ?? res.data),

  // GET /marks/course/:courseId
  getByCourse: (courseId) =>
    apiClient.get(`/marks/course/${courseId}`).then((res) => res.data?.data ?? res.data),

  // GET /marks/my-results (student)
  getMyResults: () => apiClient.get("/marks/my-results").then((res) => res.data?.data ?? []),

  // GET /marks/my-summary (student)
  getMySummary: () => apiClient.get("/marks/my-summary").then((res) => res.data?.data ?? res.data),
};

export const attendanceAPI = {
  // GET /attendance/overview
  getOverview: () => apiClient.get("/attendance/overview").then((res) => res.data?.data ?? res.data),

  // GET /attendance/course/:courseId
  getByCourse: (courseId) =>
    apiClient.get(`/attendance/course/${courseId}`).then((res) => res.data?.data ?? res.data),

  // GET /attendance/percentage/:studentId (student)
  getMyPercentage: (studentId) =>
    apiClient.get(`/attendance/percentage/${studentId}`).then((res) => res.data?.data ?? res.data),

  // GET /attendance/student/:studentId (student)
  getMyRecords: (studentId) =>
    apiClient.get(`/attendance/student/${studentId}`).then((res) => res.data?.data ?? []),
};

export const assignmentAPI = {
  // GET /assignments/course/:courseId
  getByCourse: (courseId) =>
    apiClient.get(`/assignments/course/${courseId}`).then((res) => res.data?.data ?? []),

  // POST /assignments/create — FormData (title, description, dueDate, courseId, teacherId?, file?)
  create: (formData) =>
    apiClient.post("/assignments/create", formData).then((res) => res.data?.data ?? res.data),

  // DELETE /assignments/:id
  remove: (id) => apiClient.delete(`/assignments/${id}`),

  // GET /assignments/:id/submissions
  getSubmissions: (assignmentId) =>
    apiClient.get(`/assignments/${assignmentId}/submissions`).then((res) => res.data?.data ?? []),

  // PUT /assignments/submissions/:submissionId/grade
  gradeSubmission: (submissionId, remarks) =>
    apiClient.put(`/assignments/submissions/${submissionId}/grade`, { remarks }).then((res) => res.data?.data ?? res.data),

  // POST /assignments/submit — FormData (assignmentId, file) — student
  submit: (formData) =>
    apiClient.post("/assignments/submit", formData).then((res) => res.data?.data ?? res.data),

  // GET /assignments/my-submissions — student
  getMySubmissions: () =>
    apiClient.get("/assignments/my-submissions").then((res) => res.data?.data ?? []),
};

export const feeAPI = {
  // GET /fees
  getAll: () => apiClient.get("/fees").then((res) => res.data?.data ?? []),

  // GET /fees/my (own records, any authenticated role)
  getMyFees: () => apiClient.get("/fees/my").then((res) => res.data?.data ?? []),

  // POST /fees — { userId, type, amount, status, paidAt }
  create: (data) => apiClient.post("/fees", data).then((res) => res.data?.data ?? res.data),

  // PUT /fees/:id
  update: (id, data) => apiClient.put(`/fees/${id}`, data).then((res) => res.data?.data ?? res.data),

  // DELETE /fees/:id
  remove: (id) => apiClient.delete(`/fees/${id}`),
};

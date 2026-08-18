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
};

export const attendanceAPI = {
  // GET /attendance/overview
  getOverview: () => apiClient.get("/attendance/overview").then((res) => res.data?.data ?? res.data),

  // GET /attendance/course/:courseId
  getByCourse: (courseId) =>
    apiClient.get(`/attendance/course/${courseId}`).then((res) => res.data?.data ?? res.data),
};

export const assignmentAPI = {
  getAll: () =>
    apiClient.get("/assignments").then((res) =>
      Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
    ),
  create: (data) =>
    apiClient.post("/assignments", data).then((res) => res.data?.data ?? res.data),
  update: (id, data) =>
    apiClient.put(`/assignments/${id}`, data).then((res) => res.data?.data ?? res.data),
  remove: (id) => apiClient.delete(`/assignments/${id}`),
};

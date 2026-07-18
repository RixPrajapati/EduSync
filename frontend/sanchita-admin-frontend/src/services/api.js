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

  // TODO: Connect when backend adds PUT /user/:id
  // update: (id, data) => apiClient.put(`/user/${id}`, data).then((res) => normalizeUser(res.data?.data ?? res.data)),

  // TODO: Connect when backend adds DELETE /user/:id
  // remove: (id) => apiClient.delete(`/user/${id}`),
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

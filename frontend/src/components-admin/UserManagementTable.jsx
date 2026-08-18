import { useState, useRef, useEffect } from "react";
import { userAPI } from "../services/api";
import { mockUsers } from "../services/mockApi";

const inputCls = "w-full border border-blue-100 bg-blue-50/40 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all";

// --- AddUserModal ---
function AddUserModal({ role, onSave, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", city: "", gender: "MALE", dob: "",
  });
  const profileRef = useRef(null);
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.phone.trim() || !form.city.trim() || !form.dob) return;
    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim(),
      city: form.city.trim(),
      gender: form.gender,
      dob: form.dob,
      role,
      profile: profileRef.current?.files[0] ?? null,
    });
  };

  const isStudent = role === "Student";

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden">
        <div className={`bg-gradient-to-r ${isStudent ? "from-blue-600 to-blue-500" : "from-violet-600 to-purple-500"} px-6 py-5`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Add {role}</h3>
              <p className="text-xs text-white/70 mt-0.5">Enter the new {role.toLowerCase()}'s details</p>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Full Name</label>
              <input autoFocus required name="name" value={form.name} onChange={handleChange} placeholder={isStudent ? "e.g. Rahul Poudel" : "e.g. Mr. Bikram Sharma"} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Email Address</label>
              <input required name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. rahul@edusync.com" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Password</label>
              <input required name="password" type="password" value={form.password} onChange={handleChange} placeholder="Set initial password" className={inputCls} />
              <p className="text-[11px] text-slate-400 mt-1">Min 6 characters, with an uppercase letter, a number, and a special character.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Phone</label>
                <input required name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 9800000000" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">City</label>
                <input required name="city" value={form.city} onChange={handleChange} placeholder="e.g. Kathmandu" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className={inputCls}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Date of Birth</label>
                <input required name="dob" type="date" value={form.dob} onChange={handleChange} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                Profile Photo <span className="normal-case font-normal text-slate-400">(optional)</span>
              </label>
              <input ref={profileRef} type="file" accept="image/*" className={inputCls} />
            </div>
          </div>
          <div className="px-6 pb-5 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold active:scale-95 transition-all shadow-sm ${isStudent ? "bg-blue-600 hover:bg-blue-700" : "bg-violet-600 hover:bg-violet-700"}`}>Add {role}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- EditModal ---
function EditModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, status: user.status });
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5">
          <h3 className="text-base font-bold text-white">Edit User</h3>
          <p className="text-xs text-white/70 mt-0.5">Update details for {user.name}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Full Name</label>
              <input required name="name" value={form.name} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Email</label>
              <input required name="email" type="email" value={form.email} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="px-6 pb-5 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold active:scale-95 transition-all shadow-sm">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- DeleteConfirmModal ---
function DeleteConfirmModal({ user, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-sm overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-5">
          <h3 className="text-base font-bold text-white">Confirm Delete</h3>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-slate-600">Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.</p>
        </div>
        <div className="px-6 pb-5 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold active:scale-95 transition-all shadow-sm">Delete</button>
        </div>
      </div>
    </div>
  );
}

// --- UserTable ---
function UserTable({ title, color, filteredUsers, onAdd, onEdit, onDelete }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-8 ${color} rounded-full`}></div>
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{filteredUsers.length} users</span>
        </div>
        <button onClick={onAdd} className={`px-4 py-2 ${color} text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm active:scale-95 transition-all`}>
          + Add {title.slice(0, -1)}
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-8 text-slate-400">No {title.toLowerCase()} found.</td></tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{u.name}</td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${u.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => onEdit(u)} className="text-xs font-semibold text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button onClick={() => onDelete(u)} className="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Main Component ---
function UserManagementTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingRole, setAddingRole] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportRef = useRef(null);

  // Fetch users from API on mount; fall back to mock data if backend is unreachable
  useEffect(() => {
    userAPI.getAll()
      .then((data) => setUsers(data))
      .catch((err) => {
        const isNetworkErr = !err.response;
        if (isNetworkErr) {
          setUsers(mockUsers);
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Close export dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) setShowExportMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    if (format === "csv") {
      const headers = ["Name", "Email", "Role", "Status"];
      const rows = users.map((u) => [u.name, u.email, u.role, u.status]);
      const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
      downloadFile(csv, "users.csv", "text/csv");
    } else if (format === "json") {
      downloadFile(JSON.stringify(users, null, 2), "users.json", "application/json");
    }
  };

  // Builds FormData for POST /user/addUser (multipart/form-data)
  const handleAdd = async ({ name, email, password, phone, city, gender, dob, role, profile }) => {
    try {
      const formData = new FormData();
      formData.append("userName", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address[city]", city);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("role", role.toUpperCase());
      if (profile) formData.append("profile", profile);
      const created = await userAPI.create(formData);
      setUsers((prev) => [...prev, created]);
    } catch (err) {
      setError(typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.message);
    }
    setAddingRole(null);
  };

  const handleSaveEdit = async (updated) => {
    try {
      const saved = await userAPI.update(editingUser.id, {
        userName: updated.name,
        email: updated.email,
        isActive: updated.status === "Active",
      });
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? saved : u)));
    } catch (err) {
      setError(typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.message);
    }
    setEditingUser(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await userAPI.remove(deletingUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
    } catch (err) {
      setError(typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.message);
    }
    setDeletingUser(null);
  };

  if (loading) return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6 mt-0">
      <p className="text-sm text-slate-400 text-center py-10">Loading users…</p>
    </div>
  );

  if (error) return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6 mt-0">
      <p className="text-sm text-red-500 text-center py-10">{error}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6 mt-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">User Management</h1>
        <div className="relative" ref={exportRef}>
          <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors">
            Export ↓
          </button>
          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-10">
              <button onClick={() => handleExport("csv")} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">CSV</button>
              <button onClick={() => handleExport("json")} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">JSON</button>
            </div>
          )}
        </div>
      </div>

      <UserTable
        title="Students"
        color="bg-blue-500"
        filteredUsers={users.filter((u) => u.role === "Student" || u.role === "STUDENT")}
        onAdd={() => setAddingRole("Student")}
        onEdit={setEditingUser}
        onDelete={setDeletingUser}
      />

      <UserTable
        title="Teachers"
        color="bg-violet-500"
        filteredUsers={users.filter((u) => u.role === "Teacher" || u.role === "TEACHER")}
        onAdd={() => setAddingRole("Teacher")}
        onEdit={setEditingUser}
        onDelete={setDeletingUser}
      />

      {addingRole && <AddUserModal role={addingRole} onSave={handleAdd} onClose={() => setAddingRole(null)} />}
      {editingUser && <EditModal user={editingUser} onSave={handleSaveEdit} onClose={() => setEditingUser(null)} />}
      {deletingUser && <DeleteConfirmModal user={deletingUser} onConfirm={handleConfirmDelete} onClose={() => setDeletingUser(null)} />}
    </div>
  );
}

export default UserManagementTable;

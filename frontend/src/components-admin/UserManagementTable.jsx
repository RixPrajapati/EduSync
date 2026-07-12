import React, { useState, useRef, useEffect } from "react";

const initialUsers = [
  { id: 1, name: "Sanjay Shrestha", email: "sanjay@edusync.com", role: "Student", status: "Active" },
  { id: 2, name: "Priya Tamang", email: "priya@edusync.com", role: "Student", status: "Inactive" },
  { id: 3, name: "Rajan Gurung", email: "rajan@edusync.com", role: "Student", status: "Active" },
  { id: 4, name: "Mr. Bikram Sharma", email: "bikram@edusync.com", role: "Teacher", status: "Active" },
  { id: 5, name: "Ms. Sunita Rai", email: "sunita@edusync.com", role: "Teacher", status: "Active" },
  { id: 6, name: "Mr. Nabin Thapa", email: "nabin@edusync.com", role: "Teacher", status: "Inactive" },
];

function EditModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, status: user.status });
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-50 p-6 w-full max-w-md mx-4">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Edit {user.role}</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-blue-100 bg-blue-50/40 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-blue-100 bg-blue-50/40 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-blue-100 bg-blue-50/40 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-200 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ user, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-50 p-6 w-full max-w-sm mx-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Delete {user.role}?</h3>
        </div>
        <p className="text-sm text-slate-500 mb-6 ml-12">
          Are you sure you want to delete <span className="font-semibold text-slate-700">{user.name}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function UserTable({ title, color, filteredUsers, onAdd, onEdit, onDelete }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 ${color} rounded-full`}></span>
          <h3 className="text-base font-semibold text-slate-700">{title}</h3>
          <span className="text-xs text-slate-400 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">{filteredUsers.length}</span>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm shadow-blue-200 transition-colors"
        >
          <span className="text-base leading-none">+</span>
          Add {title.slice(0, -1)}
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-blue-50">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-50 border-b border-blue-100">
              <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">ID</th>
              <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Name</th>
              <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Email</th>
              <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
              <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-blue-50 hover:bg-blue-50/40 transition-colors">
                <td className="py-3 px-4 text-slate-400 text-sm">{user.id}</td>
                <td className="py-3 px-4 text-slate-800 font-medium text-sm">{user.name}</td>
                <td className="py-3 px-4 text-slate-500 text-sm">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs font-semibold px-2.5 py-1 rounded-lg border border-blue-100 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold px-2.5 py-1 rounded-lg border border-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserManagementTable() {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setShowExportMenu(false);
      }
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
    const headers = ["ID", "Name", "Email", "Role", "Status"];
    const rows = users.map((u) => [u.id, u.name, u.email, u.role, u.status]);
    if (format === "csv") {
      const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
      downloadFile(csv, "users.csv", "text/csv");
    } else if (format === "tsv") {
      const tsv = [headers, ...rows].map((r) => r.join("\t")).join("\n");
      downloadFile(tsv, "users.tsv", "text/tab-separated-values");
    } else if (format === "json") {
      downloadFile(JSON.stringify(users, null, 2), "users.json", "application/json");
    }
  };

  const handleAdd = (role) => {
    const name = prompt(`Enter ${role} name:`);
    if (!name) return;
    const email = prompt(`Enter ${role} email:`);
    if (!email) return;
    setUsers((prev) => [...prev, { id: prev.length + 1, name, email, role, status: "Active" }]);
  };

  const handleSaveEdit = (updated) => {
    setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...updated } : u)));
    setEditingUser(null);
  };

  const handleConfirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
    setDeletingUser(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6 mt-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">User Management</h2>
            <p className="text-xs text-slate-400">{users.length} total users</p>
          </div>
        </div>
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setShowExportMenu((v) => !v)}
            className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-all duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showExportMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-blue-100 rounded-xl shadow-lg z-10 min-w-[140px] overflow-hidden">
              {[
                { label: "CSV", fmt: "csv", ext: ".csv" },
                { label: "TSV", fmt: "tsv", ext: ".tsv" },
              ].map(({ label, fmt, ext }) => (
                <button
                  key={fmt}
                  onClick={() => handleExport(fmt)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
                >
                  <span className="font-medium">{label}</span>
                  <span className="text-xs text-slate-400">{ext}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <UserTable
        title="Students"
        color="bg-blue-500"
        filteredUsers={users.filter((u) => u.role === "Student")}
        onAdd={() => handleAdd("Student")}
        onEdit={setEditingUser}
        onDelete={setDeletingUser}
      />
      <UserTable
        title="Teachers"
        color="bg-violet-500"
        filteredUsers={users.filter((u) => u.role === "Teacher")}
        onAdd={() => handleAdd("Teacher")}
        onEdit={setEditingUser}
        onDelete={setDeletingUser}
      />

      {editingUser && <EditModal user={editingUser} onSave={handleSaveEdit} onClose={() => setEditingUser(null)} />}
      {deletingUser && <DeleteConfirmModal user={deletingUser} onConfirm={handleConfirmDelete} onClose={() => setDeletingUser(null)} />}
    </div>
  );
}

export default UserManagementTable;

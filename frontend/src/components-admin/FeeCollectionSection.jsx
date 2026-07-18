import { useState, useRef, useEffect } from "react";

const initialTransactions = [
  { id: "TXN-1001", student: "Rahul Poudel", type: "Student", amount: 500, date: "Jun 04, 2026", status: "Paid" },
  { id: "TXN-1002", student: "Priya Karki", type: "Student", amount: 500, date: "Jun 03, 2026", status: "Paid" },
  { id: "TXN-1003", student: "Ananya Singh", type: "Student", amount: 250, date: "Jun 02, 2026", status: "Pending" },
  { id: "TXN-1004", student: "Arjun Khanal", type: "Student", amount: 500, date: "Jun 01, 2026", status: "Paid" },
  { id: "TXN-1005", student: "Mr. Kishan Kumar", type: "Staff", amount: 120, date: "May 30, 2026", status: "Overdue" },
];

const statusConfig = {
  Paid:    { dot: "bg-emerald-400", badge: "bg-emerald-100 text-emerald-700" },
  Pending: { dot: "bg-amber-400",   badge: "bg-amber-100 text-amber-700" },
  Overdue: { dot: "bg-red-400",     badge: "bg-red-100 text-red-600" },
};

function RecordPaymentModal({ onClose, onSave }) {
  const [form, setForm] = useState({ student: "", amount: "", date: "", status: "Paid" });
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-50 p-6 w-full max-w-md mx-4">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Record Payment</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Student / Staff Name</label>
            <input
              name="student"
              value={form.student}
              onChange={handleChange}
              placeholder="e.g. Rahul Poudel"
              className="w-full border border-blue-100 bg-blue-50/40 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Amount ($)</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 500"
              className="w-full border border-blue-100 bg-blue-50/40 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
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
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
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
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceiptModal({ txn, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-sm overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Payment Receipt</h3>
              <p className="text-xs text-white/70 mt-0.5">{txn.id}</p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {[
            { label: "Student / Staff", value: txn.student },
            { label: "Type",            value: txn.type    },
            { label: "Amount",          value: `$${txn.amount.toLocaleString()}` },
            { label: "Date",            value: txn.date    },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
              <span className="text-sm font-semibold text-slate-800">{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[txn.status].badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[txn.status].dot}`} />
              {txn.status}
            </span>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold active:scale-95 transition-all shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function FeeCollectionSection() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showModal, setShowModal] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState(null);
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
    const headers = ["Transaction ID", "Student/Staff", "Type", "Amount", "Date", "Status"];
    const rows = transactions.map((t) => [t.id, t.student, t.type, `$${t.amount}`, t.date, t.status]);
    if (format === "csv") {
      const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
      downloadFile(csv, "fee-collection.csv", "text/csv");
    } else if (format === "tsv") {
      const tsv = [headers, ...rows].map((r) => r.join("\t")).join("\n");
      downloadFile(tsv, "fee-collection.tsv", "text/tab-separated-values");
    } else if (format === "json") {
      downloadFile(JSON.stringify(transactions, null, 2), "fee-collection.json", "application/json");
    }
  };

  const totalCollected = transactions.filter((t) => t.status === "Paid").reduce((s, t) => s + t.amount, 0);
  const totalPending   = transactions.filter((t) => t.status === "Pending").reduce((s, t) => s + t.amount, 0);
  const totalOverdue   = transactions.filter((t) => t.status === "Overdue").reduce((s, t) => s + t.amount, 0);

  const handleSave = (form) => {
    if (!form.student || !form.amount) return;
    const dateLabel = form.date
      ? new Date(form.date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
      : "—";
    const newTxn = {
      id: `TXN-${1000 + transactions.length + 1}`,
      student: form.student,
      type: "Student",
      amount: Number(form.amount),
      date: dateLabel,
      status: form.status,
    };
    setTransactions((prev) => [newTxn, ...prev]);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6 mb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Fee Collection</h2>
              <p className="text-xs text-slate-400 mt-0.5">{transactions.length} transactions recorded</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={exportRef}>
              <button
                onClick={() => setShowExportMenu((v) => !v)}
                className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150"
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
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-sm shadow-blue-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Record Payment
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Collected</p>
            <p className="text-2xl font-bold text-emerald-700">${totalCollected.toLocaleString()}</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-700">${totalPending.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Overdue</p>
            <p className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-blue-50">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50 border-b border-blue-100">
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Transaction ID</th>
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Student / Staff</th>
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Amount</th>
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Date</th>
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-blue-50 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-4 text-slate-400 text-sm font-mono">{txn.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-slate-800 font-medium text-sm">{txn.student}</p>
                      <p className="text-slate-400 text-xs">{txn.type}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-semibold text-sm">${txn.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-500 text-sm">{txn.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[txn.status].badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[txn.status].dot}`} />
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setViewingReceipt(txn)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs font-semibold px-2.5 py-1 rounded-lg border border-blue-100 transition-colors"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <RecordPaymentModal onClose={() => setShowModal(false)} onSave={handleSave} />}
      {viewingReceipt && <ReceiptModal txn={viewingReceipt} onClose={() => setViewingReceipt(null)} />}
    </>
  );
}

export default FeeCollectionSection;

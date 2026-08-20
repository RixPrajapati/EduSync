// src/components/FeeStatusCard.jsx
import { useState, useEffect } from 'react';
import { feeAPI } from '../services/api';

function FeeStatusCard() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        feeAPI.getMyFees()
            .then(setFees)
            .catch(() => setFees([]))
            .finally(() => setLoading(false));
    }, []);

    const totalPaid = fees.filter((f) => f.status === "Paid").reduce((s, f) => s + f.amount, 0);
    const totalDue = fees.filter((f) => f.status === "Pending" || f.status === "Overdue").reduce((s, f) => s + f.amount, 0);
    const total = totalPaid + totalDue;
    const paidPct = total === 0 ? 0 : Math.round((totalPaid / total) * 100);

    return (
        <div className="p-6">
            {/* Header section */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Paid</span>
                <span className="text-3xl font-bold text-green-600">
                    ${totalPaid.toLocaleString()}
                </span>
            </div>

            {loading ? (
                <p className="text-sm text-gray-400 text-center py-4">Loading…</p>
            ) : fees.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No fee records yet.</p>
            ) : (
                <>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <div className="bg-green-600 h-3 rounded-full" style={{ width: `${paidPct}%` }}></div>
                    </div>

                    {/* Footer Details */}
                    <div className="flex justify-between text-sm text-gray-500 mb-5">
                        <span>Remaining: ${totalDue.toLocaleString()}</span>
                        <span>{paidPct}%</span>
                    </div>
                </>
            )}
        </div>
    );
}

export default FeeStatusCard;

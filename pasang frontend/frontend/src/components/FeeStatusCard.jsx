// src/components/FeeStatusCard.jsx
import React from 'react';

function FeeStatusCard() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            {/* Header section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Fee Status</h2>
                <span className="text-3xl font-bold text-green-600">
                    $3,000
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div className="bg-green-600 h-3 rounded-full w-[71%]"></div>
            </div>

            {/* Footer Details */}
            <div className="flex justify-between text-sm text-gray-500 mb-5">
                <span>Remaining: $1,200</span>
                <span>71%</span>
            </div>

            {/* Action Button */}
            <button className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium transition-colors active:scale-95 duration-150 cursor-pointer">
                Pay Dues
            </button>
        </div>
    );
}

export default FeeStatusCard;
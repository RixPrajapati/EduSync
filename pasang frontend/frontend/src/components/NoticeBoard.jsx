import { notices } from '../data/dummyData';

function NoticeBoard() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-5">Notices</h2>

            {/* Notice List */}
            <div className="space-y-5">
                {notices.map((notice, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">
                            {notice.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            {notice.time}
                        </p>
                    </div>
                ))}
            </div>

            {/* Action Button */}
            <button className="mt-7 w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors pt-2 border-t border-gray-100 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-xl active:scale-95 duration-150 py-3">
                View All Notices
            </button>
        </div>
    );
}

export default NoticeBoard;
function SupportCard() {
    return (
        <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">
                Need Support?
            </h2>
            <p className="text-sm text-blue-100 mb-5 leading-relaxed">
                Our help desk is available 24/7 for academic and technical queries.
            </p>
            <button className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm active:scale-95 duration-150 cursor-pointer">
                Contact Support
            </button>
        </div>
    );
}

export default SupportCard;
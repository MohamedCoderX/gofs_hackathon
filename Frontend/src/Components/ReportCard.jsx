const ReportCard = ({ report }) => {
    // Background image URL (same for both images)
    const backgroundImageUrl = "https://media.istockphoto.com/id/1281693065/vector/waste-management-and-recycling-concept.jpg?s=612x612&w=0&k=20&c=H7mdEtSyJ4wva3pQeENWwse_sjBfVJd6TfnL2n5kDoE=";

    // Unified background color for Pending & In Progress
    const getStatusColor = (status) => {
        if (status === "Pending" || status === "In Progress") {
            return "bg-yellow-500 text-white"; // Unified color
        } else if (status === "Cleaned") {
            return "bg-green-500 text-white";
        }
        return "bg-gray-500 text-white";
    };

    return (
        <div className="p-6 rounded-xl shadow-xl border border-gray-400 bg-white/60 backdrop-blur-md flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-2xl">
            {/* Waste Type */}
            <h3 className="text-2xl font-bold text-green-700">{report.waste_type}</h3>
            
            {/* Location */}
            <p className="text-gray-700 mt-1"><strong>📍 Location:</strong> {report.location}</p>

            {/* Waste Image (Larger & Same Background Image) */}
            <div 
                className="mt-4 w-80 h-56 flex items-center justify-center rounded-lg shadow-md overflow-hidden bg-cover bg-center border-4 border-green-500"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            >
                <img 
                    src={report.image_url} 
                    alt="Waste" 
                    className="w-full h-full object-cover rounded-lg transition-opacity hover:opacity-80"
                />
            </div>

            {/* Status with Unified Colors */}
            <p className={`mt-3 text-sm font-bold uppercase px-3 py-2 rounded-lg ${getStatusColor(report.status)}`}>
                {report.status}
            </p>

            {/* Cleaned Image (Larger & Same Background Image) */}
            {report.cleaned_image_url && (
                <div 
                    className="mt-4 w-80 h-56 flex items-center justify-center rounded-lg shadow-md overflow-hidden bg-cover bg-center border-4 border-blue-500"
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                >
                    <img 
                        src={report.cleaned_image_url} 
                        alt="Cleaned Area" 
                        className="w-full h-full object-cover rounded-lg transition-opacity hover:opacity-80"
                    />
                </div>
            )}
        </div>
    );
};

export default ReportCard;

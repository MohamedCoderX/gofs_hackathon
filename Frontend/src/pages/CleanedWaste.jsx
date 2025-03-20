import { useEffect, useState } from "react";
import { getReports } from "../Components/services/api";

const CleanedWastes = () => {
    const [cleanedReports, setCleanedReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCleanedReports = async () => {
            try {
                setLoading(true);
                const { data } = await getReports();
                const filteredReports = data.filter(report => report.status === "Cleaned");
                setCleanedReports(filteredReports);
            } catch (err) {
                setError("Failed to fetch cleaned reports. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCleanedReports();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Waste Cleanup Comparison</h2>

                {loading && <p className="text-blue-500 text-center text-lg">Loading reports...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!loading && cleanedReports.length === 0 && (
                    <p className="text-gray-500 text-center">No cleaned waste reports found.</p>
                )}

                {!loading && cleanedReports.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cleanedReports.map(report => (
                            <div key={report.id} className="bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-700 text-center">Waste Type :{report.waste_type}</h3>
                                <p className="text-sm text-gray-600 text-center">📍 Location: {report.location}</p>

                                {/* Image Comparison Section */}
                                <div className="flex justify-between gap-4 mt-4">
                                    {/* Waste Image */}
                                    <div className="flex-1 text-center">
                                        <p className="text-red-600 font-semibold mb-2">Before (Waste)</p>
                                        <img 
                                            src={report.image_url} 
                                            alt="Waste" 
                                            className="w-full h-40 object-cover rounded-lg shadow-md"
                                        />
                                    </div>

                                    {/* Cleaned Image */}
                                    <div className="flex-1 text-center">
                                        <p className="text-green-600 font-semibold mb-2">After (Cleaned)</p>
                                        <img 
                                            src={report.cleaned_image_url} 
                                            alt="Cleaned Waste" 
                                            className="w-full h-40 object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                </div>

                                <p className="text-green-600 font-bold text-center mt-4">✅ {report.status}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CleanedWastes;

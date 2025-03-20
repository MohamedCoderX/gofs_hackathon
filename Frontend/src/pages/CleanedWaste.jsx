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
        <div className="min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-green-200 py-10 px-4">
            <div className="w-full bg-white/60 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-gray-300">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Waste Cleanup Comparison</h2>

                {/* Loading & Error Handling */}
                {loading && <p className="text-blue-500 text-center text-lg animate-pulse">Loading reports...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!loading && cleanedReports.length === 0 && (
                    <p className="text-gray-500 text-center">No cleaned waste reports found.</p>
                )}

                {/* Waste Comparison Grid */}
                {!loading && cleanedReports.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cleanedReports.map(report => (
                            <div key={report.id} className="bg-white shadow-lg border border-gray-300 p-4 rounded-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
                                {/* Waste Type & Location */}
                                <h3 className="text-2xl font-semibold text-green-700 text-center">{report.waste_type}</h3>
                                <p className="text-gray-700 text-center mt-2">📍 <strong>Location:</strong> {report.location}</p>

                                {/* Image Comparison Section */}
                                <div className="flex justify-between gap-4 mt-6">
                                    {/* Waste Image */}
                                    <div className="flex-1 text-center">
                                        <p className="text-red-600 font-semibold mb-2">Before (Waste)</p>
                                        <div className="relative w-56 h-36 rounded-lg overflow-hidden shadow-md border-2 border-red-500">
                                            <img 
                                                src={report.image_url} 
                                                alt="Waste" 
                                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                    </div>

                                    {/* Cleaned Image */}
                                    <div className="flex-1 text-center">
                                        <p className="text-green-600 font-semibold mb-2">After (Cleaned)</p>
                                        <div className="relative w-56 h-36 rounded-lg overflow-hidden shadow-md border-2 border-green-500">
                                            <img 
                                                src={report.cleaned_image_url} 
                                                alt="Cleaned Waste" 
                                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                                            />
                                            <p className="absolute bottom-2 left-2 text-xs font-semibold text-white bg-black bg-opacity-50 px-2 py-1 rounded-md">After Cleaning</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Label */}
                                <p className="text-green-600 font-bold text-center mt-6 text-lg bg-green-500 text-white px-4 py-2 rounded-full w-fit mx-auto shadow-md">
                                    ✅ {report.status}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CleanedWastes;


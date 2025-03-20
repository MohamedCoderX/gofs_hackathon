import { useEffect, useState } from "react";
import { getReports } from "./services/api";
import ReportCard from "./ReportCard";

const Home = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
                const { data } = await getReports();
                // ✅ Show only reports that are "Pending" or "In Progress"
                const filteredReports = data.filter(report => report.status !== "Cleaned");
                setReports(filteredReports);
            } catch (err) {
                setError("Failed to fetch reports. Please try again.");
            }
            setLoading(false);
        };
        fetchReports();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div 
                className="relative w-full bg-cover bg-center p-30" 
                style={{ backgroundImage: "url('https://img.freepik.com/free-vector/ecology-concept-with-people-cleaning-beach_23-2148425866.jpg?t=st=1742444304~exp=1742447904~hmac=02227e14f13e37c9e2d0be98c9e236ec29c4e4d257c64fb8b89d685f978496cb&w=1800')" }}>
                <div className="flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-4xl font-bold">Smart Waste Management</h1>
                    <p className="text-lg mt-2">Efficient tracking and reporting of waste for a cleaner environment.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Pending Waste Reports</h2>

                {loading && <p className="text-blue-500 text-center text-lg">Loading reports...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!loading && reports.length === 0 && <p className="text-gray-500 text-center">No reports found.</p>}

                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {reports.map((report) => (
                            <ReportCard key={report.id} report={report} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

import { useEffect, useState } from "react";
import { getReports } from "../Components/services/api";
import { useAuth } from "../context/AuthContext";
import ReportCard from "../Components/ReportCard";

const UserDashboard = () => {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserReports = async () => {
            setLoading(true);
            try {
                const { data } = await getReports();
                const userReports = data.filter(report => report.user_id === user?.id);
                setReports(userReports);
            } catch (err) {
                setError("Failed to fetch reports.");
            }
            setLoading(false);
        };
        fetchUserReports();
    }, [user]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">User Dashboard</h2>
                {user && (
                    <div className="bg-gray-200 p-4 rounded-lg mb-6 text-center">
                        <h3 className="text-lg font-semibold">Welcome, {user.email}</h3>
                        <p className="text-gray-600"><strong>User ID:</strong> {user.id}</p>
                    </div>
                )}
                {loading && <p className="text-gray-600 text-center">Loading your reports...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!loading && reports.length === 0 && (
                    <p className="text-gray-600 text-center">No reports submitted yet.</p>
                )}
                <div className="space-y-4">
                    {!loading && reports.map((report) => (
                        <ReportCard key={report.id} report={report} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
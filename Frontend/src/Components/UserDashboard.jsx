import { useEffect, useState } from "react";
import { getReports } from "../Components/services/api";
import { useAuth } from "../context/AuthContext";
import ReportCard from "../Components/ReportCard";

const UserDashboard = () => {
    const { user } = useAuth(); // Get logged-in user details
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserReports = async () => {
            setLoading(true);
            try {
                const { data } = await getReports();
                // Filter reports for the logged-in user
                const userReports = data.filter(report => report.user_id === user?.id);
                setReports(userReports);
            } catch (err) {
                setError("Failed to fetch reports.");
            }
            setLoading(false);
        };
        fetchUserReports();
    }, [user]); // Fetch again if user changes

    return (
        <div style={{ padding: "20px" }}>
            <h2>User Dashboard</h2>

            {/* Display user details */}
            {user && (
                <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                    <h3>Welcome, {user.email}</h3>
                    <p><strong>User ID:</strong> {user.id}</p>
                </div>
            )}

            {/* Show loading state */}
            {loading && <p>Loading your reports...</p>}

            {/* Show error message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Display reports or empty state message */}
            {!loading && reports.length === 0 && <p>No reports submitted yet.</p>}

            {!loading && reports.map((report) => (
                <ReportCard key={report.id} report={report} />
            ))}
        </div>
    );
};

export default UserDashboard;

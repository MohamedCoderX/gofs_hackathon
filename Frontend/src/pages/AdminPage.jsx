import { useEffect, useState } from "react";
import { getReports, updateReportStatus, uploadImage } from "../Components/services/api";

const AdminPage = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [cleanedImage, setCleanedImage] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            const { data } = await getReports();
            setReports(data);
        };
        fetchReports();
    }, []);

    const handleFileChange = (e) => {
        setCleanedImage(e.target.files[0]); // Store the selected file
    };

    const handleUpdateStatus = async (id, status) => {
        if (status === "Cleaned" && !cleanedImage) {
            alert("Please upload a cleaned image.");
            return;
        }

        let cleanedImageUrl = "";

        if (cleanedImage) {
            // ✅ Upload to Supabase Storage
            cleanedImageUrl = await uploadImage(cleanedImage, "wasteimages");
            if (!cleanedImageUrl) {
                alert("Image upload failed!");
                return;
            }
        }

        // ✅ Update status and cleaned image URL in DB
        await updateReportStatus(id, status, cleanedImageUrl);

        // ✅ Update state to reflect changes
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.id === id ? { ...report, status, cleaned_image_url: cleanedImageUrl } : report
            )
        );

        alert(`Status updated to ${status}`);
        setSelectedReport(null);
        setCleanedImage(null); // Reset file input
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {reports.map((report) => (
                <div key={report.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                    <h3>{report.waste_type}</h3>
                    <p>Location: {report.location}</p>
                    <img src={report.image_url} alt="Waste" width="200" />
                    <p>Status: <strong>{report.status}</strong></p>

                    <button
                        onClick={() => handleUpdateStatus(report.id, "In Progress")}
                        style={{ background: "orange", color: "white", marginRight: "10px" }}
                    >
                        Mark as In Progress
                    </button>

                    <button onClick={() => setSelectedReport(report)} style={{ background: "green", color: "white" }}>
                        Mark as Cleaned
                    </button>

                    {/* Show file upload input when "Mark as Cleaned" is clicked */}
                    {selectedReport?.id === report.id && (
                        <div style={{ marginTop: "10px" }}>
                            <label>Upload Cleaned Image:</label>
                            <input type="file" onChange={handleFileChange} style={{ marginLeft: "10px" }} />
                            <button
                                onClick={() => handleUpdateStatus(report.id, "Cleaned")}
                                style={{ background: "blue", color: "white", marginLeft: "10px" }}
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AdminPage;

import { useEffect, useState } from "react";
import { getReports, updateReportStatus, uploadImage } from "../Components/services/api";

const AdminPage = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [cleanedImage, setCleanedImage] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            const { data } = await getReports();
            const userReports = data.filter(report =>  report.status !== "cleaned");
            setReports(userReports);
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl text-center text-gray-800 mb-8">Admin Dashboard</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img src={report.image_url} alt="Waste" className="w-full h-56 object-cover rounded-lg" />
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-800">{report.waste_type}</h3>
                            <p className="text-gray-600">Location: {report.location}</p>
                            <p className="mt-2 text-gray-700">Status: <strong>{report.status}</strong></p>

                            <div className="mt-4 space-x-3">
                                <button
                                    onClick={() => handleUpdateStatus(report.id, "In Progress")}
                                    className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200"
                                >
                                    Mark as In Progress
                                </button>
                                <button
                                    onClick={() => setSelectedReport(report)}
                                    className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-200"
                                >
                                    Mark as Cleaned
                                </button>
                            </div>

                            {/* Show file upload input when "Mark as Cleaned" is clicked */}
                            {selectedReport?.id === report.id && (
                                <div className="mt-4">
                                    <label htmlFor="file-upload" className="block text-sm text-gray-600">Upload Cleaned Image:</label>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        onChange={handleFileChange}
                                        className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={() => handleUpdateStatus(report.id, "Cleaned")}
                                        className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;

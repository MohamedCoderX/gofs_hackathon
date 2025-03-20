import { useState } from "react";
import { submitReport, uploadImage } from "../Components/services/api";
import { useAuth } from "../context/AuthContext";
import { FaMapMarkerAlt, FaTrash, FaUpload } from "react-icons/fa";

const UploadReport = () => {
    const { user } = useAuth();
    const [location, setLocation] = useState("");
    const [wasteType, setWasteType] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("❌ Geolocation is not supported by your browser.");
            return;
        }
        setIsFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    setLocation(data.display_name || "Location not found");
                } catch (error) {
                    alert("❌ Error fetching location.");
                }
                setIsFetchingLocation(false);
            },
            () => {
                alert("❌ Location access denied. Enter manually.");
                setIsFetchingLocation(false);
            }
        );
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file || !["image/png", "image/jpeg", "image/jpg"].includes(file.type) || file.size > 5 * 1024 * 1024) {
            alert("❌ Invalid file. Only PNG, JPG (Max 5MB) allowed.");
            return;
        }
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id || !imageFile) {
            alert("❌ Please fill all fields and select an image.");
            return;
        }
        setIsUploading(true);
        try {
            const imageUrl = await uploadImage(imageFile);
            await submitReport(user.id, location, wasteType, imageUrl);
            alert("✅ Report submitted successfully");
            setLocation("");
            setWasteType("");
            setImageFile(null);
        } catch (error) {
            alert("❌ Failed to submit report. Please try again.");
        }
        setIsUploading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Upload Waste Report</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label className="block font-semibold">Location:</label>
                        <div className="flex">
                            <input type="text" className="w-full p-2 border rounded-lg bg-gray-100" placeholder="Enter location manually" value={location} onChange={(e) => setLocation(e.target.value)} required />
                            <button type="button" onClick={getLocation} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2" disabled={isFetchingLocation}>
                                <FaMapMarkerAlt /> {isFetchingLocation ? "Fetching..." : "Get Location"}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold">Waste Type:</label>
                        <input type="text" className="w-full p-2 border rounded-lg bg-gray-100" placeholder="Enter waste type" value={wasteType} onChange={(e) => setWasteType(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block font-semibold">Upload Image:</label>
                        <input type="file" className="w-full p-2 border rounded-lg bg-gray-100" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" required />
                    </div>
                    <button type="submit" disabled={isUploading} className="w-full bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2">
                        <FaUpload /> {isUploading ? "Uploading..." : "Submit Report"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadReport;
import { useState } from "react";
import { submitReport, uploadImage } from "../Components/services/api";
import { useAuth } from "../context/AuthContext";

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
                    if (data.display_name) {
                        setLocation(data.display_name);
                    } else {
                        alert("❌ Failed to get location. Enter manually.");
                    }
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

        if (!file) {
            alert("❌ No file selected");
            return;
        }

        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
            alert("❌ Invalid file type. Only PNG, JPG, JPEG allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("❌ File is too large. Max 5MB allowed.");
            return;
        }

        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.id) {
            alert("❌ User not found. Please log in again.");
            return;
        }

        if (!imageFile) {
            alert("❌ Please select an image.");
            return;
        }

        setIsUploading(true);
        try {
            const imageUrl = await uploadImage(imageFile);
            if (!imageUrl) {
                alert("❌ Image upload failed. Try again.");
                setIsUploading(false);
                return;
            }

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
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload Waste Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Location:</label>
                    <div className="flex">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Enter location manually"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={getLocation}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={isFetchingLocation}
                        >
                            {isFetchingLocation ? "Fetching..." : "Get Location"}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block font-semibold">Waste Type:</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        placeholder="Enter waste type"
                        value={wasteType}
                        onChange={(e) => setWasteType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Upload Image:</label>
                    <input
                        type="file"
                        className="border p-2 w-full"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/jpg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded"
                >
                    {isUploading ? "Uploading..." : "Submit Report"}
                </button>
            </form>
        </div>
    );
};

export default UploadReport;

import { useState } from 'react';
import { submitReport } from './services/api';
import { useAuth } from '../context/AuthContext';

const UploadReport = () => {
    const { user } = useAuth();
    const [location, setLocation] = useState('');
    const [wasteType, setWasteType] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert('User not found. Please log in again.');
            return;
        }
    
        
        console.log("Submitting Report with User ID:", user.id);
    
        try {
            const response = await submitReport(user.id, location, wasteType, imageUrl);
            console.log(response.data);
            alert('Report submitted successfully');
        } catch (error) {
            console.error("Error submitting report:", error.response?.data || error.message);
            alert('Failed to submit report. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Waste Report</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <input type="text" placeholder="Waste Type" value={wasteType} onChange={(e) => setWasteType(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                <button type="submit">Submit Report</button>
            </form>
        </div>
    );
};

export default UploadReport;
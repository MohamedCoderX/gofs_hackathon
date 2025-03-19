import { useEffect, useState } from 'react';
import { getReports, updateReportStatus } from '../Components/services/api';

const AdminPage = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const { data } = await getReports();
            setReports(data);
        };
        fetchReports();
    }, []);

    const handleUpdateStatus = async (id, status, cleanedImageUrl) => {
        await updateReportStatus(id, status, cleanedImageUrl);
        alert('Status Updated');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {reports.map(report => (
                <div key={report.id}>
                    <h3>{report.waste_type}</h3>
                    <p>Location: {report.location}</p>
                    <img src={report.image_url} alt="Waste" width="200" />
                    <p>Status: {report.status}</p>
                    <button onClick={() => handleUpdateStatus(report.id, 'In Progress', '')}>Mark as In Progress</button>
                    <button onClick={() => handleUpdateStatus(report.id, 'Cleaned', 'cleaned_image_url_here')}>Mark as Cleaned</button>
                </div>
            ))}
        </div>
    );
};

export default AdminPage;
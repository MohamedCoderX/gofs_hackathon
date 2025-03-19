import { useEffect, useState } from 'react';
import { getReports } from './services/api';
import ReportCard from './ReportCard';

const Home = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const { data } = await getReports();
            setReports(data);
        };
        fetchReports();
    }, []);

    return (
        <div>
            <h2>Waste Reports</h2>
            {reports.map(report => (
                <ReportCard key={report.id} report={report} />
            ))}
        </div>
    );
};

export default Home;
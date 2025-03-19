const ReportCard = ({ report }) => {
    return (
        <div>
            <h3>{report.waste_type}</h3>
            <p>Location: {report.location}</p>
            <img src={report.image_url} alt="Waste" width="200" />
            <p>Status: {report.status}</p>
            {report.cleaned_image_url && <img src={report.cleaned_image_url} alt="Cleaned" width="200" />}
        </div>
    );
};

export default ReportCard;
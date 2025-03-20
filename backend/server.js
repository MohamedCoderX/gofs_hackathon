import express from 'express';
import cors from 'cors';
import axios from 'axios'; // ✅ Import axios
import authRoutes from './routes/auth.js';
import reportsRoutes from './routes/reports.js';

const app = express();
const PORT = 5001;

// ✅ Allow frontend at localhost:5173
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);

// ✅ Location Search API
app.get("/api/location", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
                params: {
                    format: "json",
                    q: query,
                    addressdetails: 1,
                },
            }
        );

        console.log("API Response:", response.data); // ✅ Debugging log

        if (!Array.isArray(response.data)) {
            return res.status(500).json({ error: "Unexpected API response format" });
        }

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching locations:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
});

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

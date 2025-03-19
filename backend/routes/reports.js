import express from 'express';
import { createReport, getReports, updateReportStatus } from '../models/reportsModel.js';
import supabase from '../config/supabase.js';

const router = express.Router();

router.post('/report', async (req, res) => {
    try {
        const { user_id, location, waste_type, image_url } = req.body;

        if (!user_id || !location || !waste_type || !image_url) {
            console.error("❌ Missing required fields:", { user_id, location, waste_type, image_url });
            return res.status(400).json({ error: 'All fields are required' });
        }

        console.log("📩 Received report:", { user_id, location, waste_type, image_url });

        const { data, error } = await supabase
            .from('waste_reports')
            .insert([{ 
                user_id, 
                location, 
                waste_type, 
                image_url, 
                status: 'pending', 
                cleaned_image_url: null,
                created_at: new Date() 
            }]);

        if (error) {
            console.error("❌ Supabase Insert Error:", error);
            return res.status(500).json({ error: error.message, details: error });
        }

        console.log("✅ Report successfully inserted:", data);
        res.status(201).json({ message: 'Report submitted successfully', data });
    } catch (err) {
        console.error("❌ Internal Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get('/reports', async (req, res) => {
    try {
        const reports = await getReports();
        res.json(reports);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
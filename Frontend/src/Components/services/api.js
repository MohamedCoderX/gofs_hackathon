import axios from 'axios';
import { supabase } from './supabase';


const API_URL = 'http://localhost:5001/api';
export const registerUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        throw new Error(error.message);
    }

    // ✅ Use `id` from `data.user`
    const userId = data.user?.id;
    if (!userId) throw new Error("User ID not generated");

    // ✅ Insert into the `users` table with user ID
    await supabase.from("users").insert([{ id: userId, email, created_at: new Date() }]);

    return userId;
};
// Login User
export const loginUser = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;
};

// Logout User
export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};



export const submitReport = async (userId, location, wasteType, imageUrl) => {
    try {
        const response = await axios.post(`${API_URL}/reports/report`, {
            user_id: userId,
            location,
            waste_type: wasteType,
            image_url: imageUrl
        });

        console.log("✅ Report submitted:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error submitting report:", error.response ? error.response.data : error.message);
        throw error;
    }
};
export const getReports = () => axios.get(`${API_URL}/reports/reports`);

export const updateReportStatus = (reportId, status, cleanedImageUrl) =>
    axios.put(`${API_URL}/reports/update/${reportId}`, { status, cleaned_image_url: cleanedImageUrl });




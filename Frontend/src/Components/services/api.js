import axios from "axios";
import { supabase } from "./supabase";

const API_URL = "http://localhost:5001/api";

/**
 * ✅ Register User (Inserts user into Supabase DB)
 */
export const registerUser = async (email, password, role = "user") => {
    try {
        const { data, error } = await supabase
            .from("users")
            .insert([{ email, password, role, created_at: new Date() }]);

        if (error) throw new Error(error.message);
        console.log("✅ User Registered:", data);
        return data;
    } catch (error) {
        console.error("❌ Registration Error:", error.message);
        throw error;
    }
};

/**
 * ✅ Login User (Checks Plain Text Password)
 */
export const loginUser = async (email, password) => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("id, email, role")
            .eq("email", email)
            .eq("password", password)
            .single();

        if (error || !data) {
            throw new Error("Invalid email or password");
        }

        // ✅ Store user session manually
        const userSession = { id: data.id, email: data.email, role: data.role };
        localStorage.setItem("user", JSON.stringify(userSession));
        console.log("✅ Login Successful:", userSession);
        return userSession;
    } catch (error) {
        console.error("❌ Login Error:", error.message);
        throw error;
    }
};

/**
 * ✅ Logout User (Clears Session)
 */
export const logoutUser = () => {
    localStorage.removeItem("user");
    console.log("✅ User logged out.");
};

/**
 * ✅ Submit Waste Report
 */
export const submitReport = async (userId, location, wasteType, imageUrl) => {
    try {
        const { data, error } = await supabase
            .from("waste_reports")
            .insert([{ user_id: userId, location, waste_type: wasteType, image_url: imageUrl, status: "Pending" }]);

        if (error) throw new Error(error.message);
        console.log("✅ Report Submitted:", data);
        return data;
    } catch (error) {
        console.error("❌ Report Submission Error:", error.message);
        throw error;
    }
};

/**
 * ✅ Fetch All Waste Reports
 */
export const getReports = () => axios.get(`${API_URL}/reports/reports`);

/**
 * ✅ Update Waste Report Status
 */
export const updateReportStatus = async (id, status, cleanedImageUrl = null) => {
    try {
        if (!id || !status) throw new Error("Missing ID or status.");

        const { data, error } = await supabase
            .from("waste_reports")
            .update({ status, cleaned_image_url: cleanedImageUrl || null })
            .eq("id", id);

        if (error) throw new Error("Failed to update report status.");
        console.log("✅ Report Updated:", data);
        return data;
    } catch (error) {
        console.error("❌ Update Report Error:", error.message);
        throw error;
    }
};

/**
 * ✅ Fetch Cleaned Reports Only
 */
export const fetchCleanedReports = async () => {
    try {
        const { data, error } = await supabase
            .from("waste_reports")
            .select("*")
            .eq("status", "cleaned");

        if (error) throw new Error(error.message);
        return data;
    } catch (error) {
        console.error("❌ Error Fetching Cleaned Reports:", error.message);
        return [];
    }
};

/**
 * ✅ Upload Image to Supabase Storage
 */



export const uploadImage = async (file) => {
    if (!file) {
        console.error("❌ No file selected");
        return null;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const bucketName = "wasteimages"; // Your bucket name
    const filePath = `waste/${fileName}`;

    try {
        // ✅ Upload file directly (no auth needed)
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file);

        if (error) {
            console.error("❌ Upload error:", error.message);
            return null;
        }

        // ✅ Get public URL
        const { data: publicData } = await supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        console.log("✅ Image uploaded:", publicData.publicUrl);
        return publicData.publicUrl;
    } catch (error) {
        console.error("❌ Upload Failed:", error.message);
        return null;
    }
};


/**
 * ✅ Save Image URL in Users Table
 */
export const saveImageUrlToUser = async (imageUrl, cleanedImageUrl) => {
    try {
        const { data, error } = await supabase
            .from("waste_reports")
            .update({ image_url: imageUrl, cleaned_image_url: cleanedImageUrl })
            .eq("id", userId);

        if (error) throw new Error(error.message);
        console.log("✅ Database Updated:", data);
        return data;
    } catch (error) {
        console.error("❌ Error Updating Database:", error.message);
        return null;
    }
};

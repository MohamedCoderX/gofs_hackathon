import supabase from '../config/supabase.js';

export const createReport = async (user_id, location, waste_type, image_url) => {
    const { data, error } = await supabase
        .from('waste_reports')
        .insert([{ user_id, location, waste_type, image_url }])
        .select();

    if (error) throw error;
    return data[0];
};

export const getReports = async () => {
    const { data, error } = await supabase
        .from('waste_reports')
        .select('*');

    if (error) throw error;
    return data;
};

export const updateReportStatus = async (id, status, cleaned_image_url) => {
    const { data, error } = await supabase
        .from('waste_reports')
        .update({ status, cleaned_image_url })
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0];
};
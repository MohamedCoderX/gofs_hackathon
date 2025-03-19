import supabase from '../config/supabase.js';

export const createUser = async (email, password, role = 'user') => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password, role }])
        .select();

    if (error) throw error;
    return data[0];
};

export const findUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error) return null;
    return data;
};

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../Components/services/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ Load user from local storage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ Login function using plain text password from `users` table
    const login = async (email, password) => {
        try {
            console.log("Logging in with:", email, password);

            const { data, error } = await supabase
                .from("users")
                .select("id, email, role")
                .eq("email", email)
                .eq("password", password) // Plain text password check
                .single();

            if (error || !data) {
                console.error("❌ Login Error: Invalid credentials.");
                alert("Invalid email or password");
                return null;
            }

            const userData = { id: data.id, email: data.email, role: data.role };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store session

            console.log("✅ Login Successful:", userData);
            return userData;
        } catch (error) {
            console.error("❌ Login Error:", error.message);
            alert("Login failed. Try again.");
            return null;
        }
    };

    // ✅ Logout function (Clear session)
    const logout = async () => {
        setUser(null);
        localStorage.removeItem("user");
        console.log("✅ User logged out.");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Export the useAuth hook
export const useAuth = () => useContext(AuthContext);

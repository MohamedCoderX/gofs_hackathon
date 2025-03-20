import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth Context

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // ✅ Get login function from Auth Context

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
    
        try {
            const user = await login(email, password); // ✅ User now contains `role`
    
            if (user) {
                alert("Login successful!");
                navigate(user.role === "admin" ? "/admin" : "/dashboard"); // ✅ Redirect based on role
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }
    
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
                
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <form onSubmit={handleLogin} className="flex flex-col">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="border p-2 rounded mb-3"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="border p-2 rounded mb-3"
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

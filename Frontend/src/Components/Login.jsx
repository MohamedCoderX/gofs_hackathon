import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
    
        try {
            const user = await login(email, password);
            if (user) {
                navigate(user.role === "admin" ? "/admin" : "/dashboard");
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }
    
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full pl-10 p-3 border-black-1 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full pl-10 p-3 border-black rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-gray-600 text-center mt-4">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

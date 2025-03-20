import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Components/services/api";
import { FaUser, FaLock } from "react-icons/fa";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await registerUser(email, password);
            alert("Signup successful!");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full pl-10 p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500"
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
                            className="w-full pl-10 p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                <p className="text-gray-600 text-center mt-4">
                    Already have an account? <a href="/login" className="text-green-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
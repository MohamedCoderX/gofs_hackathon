import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="bg-black text-white fixed w-full top-0 left-0 z-50 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
                {/* Left Side - Logo & Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-2xl font-bold text-white hover:text-gray-400 transition">
                        WasteTracker
                    </Link>

                    {user && (
                        <Link to="/upload" className="text-white hover:text-gray-400 transition">
                            Upload Report
                        </Link>
                    )}

                    <Link to="/cleaned-waste" className="text-white hover:text-gray-400 transition">
                        Cleaned Waste
                    </Link>

                    {user?.role === "admin" && (
                        <Link to="/admin" className="text-white hover:text-gray-400 transition">
                            Admin Panel
                        </Link>
                    )}
                </div>

                {/* Right Side - Authentication Links */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            {user?.role !== "admin" && (
                                <Link to="/dashboard" className="text-white hover:text-gray-400 transition">
                                    Dashboard
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

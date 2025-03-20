import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login"); // ✅ Navigate instead of full reload
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            {/* Left Side - Logo & Links */}
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-lg font-bold hover:text-gray-300">Home</Link>
                
                {/* Upload Report (Only for logged-in users) */}
                {user && <Link to="/upload" className="hover:text-gray-300">Upload Report</Link>}
                <Link to="/cleaned-waste" style={{ color: "", marginRight: "15px" }}>Cleaned Waste</Link> 

                {/* Admin Panel (Only for admins) */}
                {user?.role === "admin" && <Link to="/admin" className="hover:text-gray-300">Admin Panel</Link>}
            </div>

            {/* Right Side - Auth Links */}
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        {/* Dashboard (Only for regular users) */}
                        {user?.role !== "admin" && (
                            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                        )}

                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {/* Show Login & Signup if not logged in */}
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                        <Link to="/signup" className="hover:text-gray-300">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

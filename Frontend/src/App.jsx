import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UploadReport from "./Components/UploadReport";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignUpPage.jsx"; 
import UserDashboard from "./Components/UserDashboard.jsx";
import Navbar from "./Components/Navbar";  
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import CleanedWaste from "./pages/CleanedWaste.jsx";

// 🛡️ Protected Route Wrapper (For Logged-In Users)
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

// 🛡️ Admin Protected Route (For Admin Users Only)
const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    return user?.role === "admin" ? children : <Navigate to="/" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar /> {/* ✅ Navbar always visible */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    
                    {/* ✅ Protected Routes */}
                    <Route 
                        path="/dashboard" 
                        element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} 
                    />
                    <Route 
                        path="/upload" 
                        element={<ProtectedRoute><UploadReport /></ProtectedRoute>} 
                    />

                    {/* ✅ Admin Route */}
                    <Route 
                        path="/admin" 
                        element={<AdminRoute><AdminPage /></AdminRoute>} 
                    />

                    {/* ✅ Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/cleaned-waste" element={<CleanedWaste />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

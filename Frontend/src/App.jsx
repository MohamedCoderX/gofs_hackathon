import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UploadReport from "./Components/UploadReport";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignUpPage.jsx"; 
import { AuthProvider } from "./context/AuthContext.jsx";
import UserDashboard from "./Components/UserDashboard.jsx";
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/upload" element={<UploadReport />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} /> 
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

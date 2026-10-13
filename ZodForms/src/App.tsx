import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DeveloperPage from "./pages/DeveloperPage";
import AgePage from "./pages/AgePage";
import ClearErrorPage from "./pages/ClearErrorPage";
import FeedbackPage from "./pages/FeedbackPage";

const App = () => {
    return (
        <BrowserRouter>
            <nav style={{ padding: 10, background: "#1a1a2e" }}>
                <Link to="/" style={{ color: "white", marginRight: 10 }}>Login</Link>
                <Link to="/register" style={{ color: "white", marginRight: 10 }}>Register</Link>
                <Link to="/developer" style={{ color: "white", marginRight: 10 }}>Developer</Link>
                <Link to="/age" style={{ color: "white", marginRight: 10 }}>Age</Link>
                <Link to="/clear" style={{ color: "white", marginRight: 10 }}>Clear Error</Link>
                <Link to="/feedback" style={{ color: "white" }}>Feedback</Link>
            </nav>

            <div style={{ padding: 20 }}>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/developer" element={<DeveloperPage />} />
                    <Route path="/age" element={<AgePage />} />
                    <Route path="/clear" element={<ClearErrorPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
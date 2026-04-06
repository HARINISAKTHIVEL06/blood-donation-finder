import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProfile from "./pages/CreateProfile";
import SearchDonors from "./pages/SearchDonors";
import "./App.css";

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

function Navigation({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const firstName = user?.name?.split(" ")[0] || "Donor";

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span role="img" aria-label="Blood drop">🩸</span> BloodLink
      </Link>

      <div className="nav-links">
        <Link to="/" className={`nav-link ${currentPath === "/" ? "active" : ""}`}>
          Search
        </Link>
        <Link to="/profile" className={`nav-link ${currentPath === "/profile" ? "active" : ""}`}>
          Donor Profile
        </Link>

        {user ? (
          <div className="nav-user-shell">
            <span className="nav-user-badge">Signed in as {firstName}</span>
            <button type="button" className="nav-link nav-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-user-shell">
            <Link to="/login" className={`nav-link ${currentPath === "/login" ? "active" : ""}`}>
              Login
            </Link>
            <Link to="/register" className="nav-link primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState(readStoredUser);

  useEffect(() => {
    const syncUser = () => {
      setUser(readStoredUser());
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <Router>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<SearchDonors user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<CreateProfile user={user} />} />
      </Routes>
    </Router>
  );
}

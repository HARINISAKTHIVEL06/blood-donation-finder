import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProfile from "./pages/CreateProfile";
import SearchDonors from "./pages/SearchDonors";

export default function App() {
  return (
    <Router>
      <div>
        <header className="navbar">
          <div className="container">
            <div className="logo">🩸 Blood Donation Finder</div>
            <nav className="nav-links">
              <Link to="/">Search</Link>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
              <Link to="/profile">Create Profile</Link>
            </nav>
          </div>
        </header>

        <section className="hero">
          <h1>Find Blood Donors Quickly</h1>
          <p>Search blood donors by blood group and location in emergency situations.</p>
        </section>

        <main className="container main-section">
          <div className="card">
            <Routes>
              <Route path="/" element={<SearchDonors />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<CreateProfile />} />
            </Routes>
          </div>
        </main>

        <footer className="footer">
          <p>Blood Donation Finder © 2026</p>
        </footer>
      </div>
    </Router>
  );
}
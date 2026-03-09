import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProfile from "./pages/CreateProfile";
import SearchDonors from "./pages/SearchDonors";

export default function App() {
  return (
    <Router>
      <div style={{ maxWidth: 650, margin: "30px auto", fontFamily: "Arial" }}>
        <h2 style={{ textAlign: "center" }}>🩸 Blood Donation Finder</h2>

        <nav style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/">Search</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Create Profile</Link>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<SearchDonors />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<CreateProfile />} />
        </Routes>
      </div>
    </Router>
  );
}
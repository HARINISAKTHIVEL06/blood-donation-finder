import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "../App.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const trimmedPassword = password.trim();
    const blockedPasswords = ["1234", "12345", "123456", "password", "admin"];

    if (trimmedPassword.length < 6 || blockedPasswords.includes(trimmedPassword.toLowerCase())) {
      setError("Use a stronger password. 1234 and other common default passwords are not allowed.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      window.dispatchEvent(new Event("auth-change"));
      setSuccess("Registered successfully. Continue by creating your donor profile.");
      setTimeout(() => navigate("/profile"), 800);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="glass-card auth-card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join the BloodLink community</p>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "1rem",
              backgroundColor: "#ffe6e6",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              color: "green",
              marginBottom: "1rem",
              backgroundColor: "#e6ffe6",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              className="input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              className="input"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className="input"
              placeholder="Use at least 6 characters"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="btn-gradient" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

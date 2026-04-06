import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allowInput, setAllowInput] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      window.dispatchEvent(new Event("auth-change"));
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="glass-card auth-card">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>

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

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="text"
            name="fake-username"
            autoComplete="username"
            tabIndex={-1}
            style={{ display: "none" }}
          />
          <input
            type="password"
            name="fake-password"
            autoComplete="new-password"
            tabIndex={-1}
            style={{ display: "none" }}
          />

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              className="input"
              type="email"
              name="login-email-field"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setAllowInput(true)}
              autoComplete="off"
              readOnly={!allowInput}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className="input"
              placeholder="Enter your account password"
              type="password"
              name="login-password-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setAllowInput(true)}
              autoComplete="new-password"
              readOnly={!allowInput}
              required
            />
          </div>

          <button type="submit" className="btn-gradient" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login ✅ Token saved");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div>
      <h3>Login</h3>

      <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <br /><br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={onChange}
      />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}
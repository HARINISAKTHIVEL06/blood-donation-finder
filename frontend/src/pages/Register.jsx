import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
    };

    if (!payload.name || !payload.email || !payload.password) {
      alert("Please fill name, email, and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", payload);
      alert("Registered successfully");
      console.log(res.data);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "donor",
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (err?.request ? "Cannot reach backend. Ensure backend is running on port 5000." : null) ||
        "Registration failed";
      alert(message);
    }
  };

  return (
    <div>
      <h3>Register</h3>

      <input name="name" placeholder="Name" value={form.name} onChange={onChange} />
      <br /><br />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
      />
      <br /><br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={onChange}
      />
      <br /><br />

      <select name="role" value={form.role} onChange={onChange}>
        <option value="donor">Donor</option>
        <option value="user">User</option>
      </select>

      <br /><br />
      <button onClick={register}>Register</button>
    </div>
  );
}

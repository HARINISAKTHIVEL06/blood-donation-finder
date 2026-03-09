import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor"
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registered successfully ✅");
      console.log(res.data);

      // clear form after register
      setForm({
        name: "",
        email: "",
        password: "",
        role: "donor"
      });

    } catch (err) {
      alert(err?.response?.data?.message || "Register failed ❌");
    }
  };

  return (
    <div>
      <h3>Register</h3>

      <form autoComplete="off">

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          autoComplete="off"
        />

        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          autoComplete="off"
        />

        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          autoComplete="new-password"
        />

        <br /><br />

        <select name="role" value={form.role} onChange={onChange}>
          <option value="donor">Donor</option>
          <option value="requester">Requester</option>
        </select>

        <br /><br />

        <button type="button" onClick={register}>
          Register
        </button>

      </form>
    </div>
  );
}
import { useState } from "react";
import axios from "axios";

export default function CreateProfile() {
  const [form, setForm] = useState({
    bloodGroup: "O+",
    phone: "",
    city: "",
    area: "",
    available: true,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first ❌");

      const res = await axios.post("http://localhost:5000/api/donors/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile saved ✅");
      console.log(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Profile save failed ❌");
    }
  };

  return (
    <div>
      <h3>Create / Update Donor Profile</h3>

      <label>Blood Group</label>
      <br />
      <select name="bloodGroup" value={form.bloodGroup} onChange={onChange}>
        {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((bg) => (
          <option key={bg} value={bg}>{bg}</option>
        ))}
      </select>

      <br /><br />

      <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
      <br /><br />

      <input name="city" placeholder="City" value={form.city} onChange={onChange} />
      <br /><br />

      <input name="area" placeholder="Area" value={form.area} onChange={onChange} />
      <br /><br />

      <label>
        <input type="checkbox" name="available" checked={form.available} onChange={onChange} />
        Available to donate
      </label>

      <br /><br />
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}
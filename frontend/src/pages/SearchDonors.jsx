import { useState } from "react";
import axios from "axios";

export default function SearchDonors() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);

  const search = async () => {
    try {
      const url = `http://localhost:5000/api/donors/search?bloodGroup=${encodeURIComponent(
        bloodGroup
      )}&city=${encodeURIComponent(city)}`;

      const res = await axios.get(url);
      setDonors(res.data.donors);
    } catch (err) {
      alert("Search failed ❌");
    }
  };

  return (
    <div>
      <h3>Search Donors</h3>

      <input
        placeholder="Blood Group (ex: O+)"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="City (ex: Chennai)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br /><br />

      <button onClick={search}>Search</button>

      <hr />

      {donors.length === 0 ? (
        <p>No donors found</p>
      ) : (
        donors.map((d) => (
          <div
            key={d._id}
            style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8, marginBottom: 10 }}
          >
            <b>{d.userId?.name}</b> <br />
            Blood Group: {d.bloodGroup} <br />
            City: {d.city} <br />
            Area: {d.area} <br />
            Phone: {d.phone}
          </div>
        ))
      )}
    </div>
  );
}
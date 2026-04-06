import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "../App.css";

const emptyForm = {
  bloodGroup: "O+",
  phone: "",
  city: "",
  area: "",
  lastDonatedDate: "",
  available: true,
};

export default function CreateProfile({ user }) {
  const [form, setForm] = useState(emptyForm);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoadingProfile(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/donors/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = response.data?.profile;
        if (profile) {
          setForm({
            bloodGroup: profile.bloodGroup || "O+",
            phone: profile.phone || "",
            city: profile.city || "",
            area: profile.area || "",
            lastDonatedDate: profile.lastDonatedDate ? profile.lastDonatedDate.slice(0, 10) : "",
            available: profile.available ?? true,
          });
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Could not load your donor profile.");
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login first");
      }

      await axios.post(`${API_BASE_URL}/api/donors/profile`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Donor profile saved. You can now appear in donor search results.");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Profile save failed");
    } finally {
      setSaving(false);
    }
  };

  const profileReady = Boolean(form.phone && form.city && form.area);

  return (
    <div className="page-container profile-page">
      <div className="profile-layout">
        <section className="profile-sidebar glass-card">
          <span className="section-tag">Donor Hub</span>
          <h1 className="profile-heading">Keep your donation profile up to date</h1>
          <p className="profile-copy">
            Save your blood group, contact details, and location so people nearby can find you
            quickly during emergencies.
          </p>

          <div className="profile-insights">
            <div className="insight-card">
              <span className="insight-label">Account</span>
              <strong>{user?.email || "Login required"}</strong>
            </div>
            <div className="insight-card">
              <span className="insight-label">Search visibility</span>
              <strong>{form.available ? "Visible to seekers" : "Hidden right now"}</strong>
            </div>
            <div className="insight-card">
              <span className="insight-label">Profile status</span>
              <strong>{profileReady ? "Ready for search" : "Missing a few details"}</strong>
            </div>
          </div>
        </section>

        <section className="glass-card profile-form-card">
          <h2 className="title">Donor Profile</h2>
          <p className="subtitle">Edit once, stay discoverable for future requests.</p>

          {!user && (
            <div className="message-banner error">
              Login or register first before creating your donor profile.
            </div>
          )}

          {error && <div className="message-banner error">{error}</div>}
          {success && <div className="message-banner success">{success}</div>}

          {loadingProfile ? (
            <div className="profile-loading">Loading your saved profile...</div>
          ) : (
            <form onSubmit={saveProfile}>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Blood Group</label>
                  <select className="input" name="bloodGroup" value={form.bloodGroup} onChange={onChange}>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <input
                    className="input"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={onChange}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">City</label>
                  <input
                    className="input"
                    name="city"
                    placeholder="Enter your city"
                    value={form.city}
                    onChange={onChange}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Area / Neighborhood</label>
                  <input
                    className="input"
                    name="area"
                    placeholder="Enter your area"
                    value={form.area}
                    onChange={onChange}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Last Donated</label>
                  <input
                    className="input"
                    type="date"
                    name="lastDonatedDate"
                    value={form.lastDonatedDate}
                    onChange={onChange}
                  />
                </div>
              </div>

              <label className="checkbox-group">
                <input type="checkbox" name="available" checked={form.available} onChange={onChange} />
                <span>I am currently available to donate blood</span>
              </label>

              <button type="submit" className="btn-gradient" disabled={saving || !user}>
                {saving ? "Saving profile..." : "Save Donor Profile"}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

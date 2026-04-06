import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "../App.css";
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const getInitials = (name = "Donor") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function SearchDonors({ user }) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDonors = async (filters = {}) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      const normalizedBloodGroup = filters.bloodGroup?.trim();
      const normalizedLocation = filters.location?.trim();

      if (normalizedBloodGroup) {
        params.set("bloodGroup", normalizedBloodGroup);
      }

      if (normalizedLocation) {
        params.set("location", normalizedLocation);
      }

      const query = params.toString();
      const response = await fetch(`${API_BASE_URL}/api/donors/search${query ? `?${query}` : ""}`);

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to search donors");
      }

      setDonors(data.donors || []);
    } catch (err) {
      setError(err.message || "Failed to search donors");
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDonors({ bloodGroup, location });
  };

  const clearFilters = () => {
    setBloodGroup("");
    setLocation("");
    fetchDonors();
  };

  const stats = useMemo(() => {
    const cities = new Set(donors.map((donor) => donor.city?.trim()).filter(Boolean));
    const countsByGroup = donors.reduce((accumulator, donor) => {
      const key = donor.bloodGroup || "Unknown";
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});

    const topBloodGroup = Object.entries(countsByGroup).sort((first, second) => second[1] - first[1])[0];

    return {
      total: donors.length,
      cities: cities.size,
      topBloodGroup: topBloodGroup ? `${topBloodGroup[0]} (${topBloodGroup[1]})` : "No data yet",
    };
  }, [donors]);

  return (
    <div className="page-container">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="section-tag">Emergency-ready network</span>
          <h1 className="hero-title">Find nearby blood donors in a few seconds</h1>
          <p className="hero-description">
            Search by blood group and location, then call or email active donors directly. Keep
            your own profile updated so others can find you when it matters.
          </p>

          <div className="hero-actions">
            <Link to="/profile" className="btn-gradient hero-button-link">
              {user ? "Update My Donor Profile" : "Become a Donor"}
            </Link>
            {!user && (
              <Link to="/login" className="secondary-action">
                Already registered? Sign in
              </Link>
            )}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Active donors shown</span>
            <strong className="stat-value">{stats.total}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Cities covered</span>
            <strong className="stat-value">{stats.cities}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Most available group</span>
            <strong className="stat-value">{stats.topBloodGroup}</strong>
          </div>
        </div>
      </section>

      <section className="search-panel">
        <div className="search-panel-header">
          <div>
            <h2 className="panel-title">Search donors</h2>
            <p className="panel-copy">Use the filters below to narrow the active donor list.</p>
          </div>

          <div className="quick-group-row">
            {BLOOD_GROUPS.map((group) => (
              <button
                key={group}
                type="button"
                className={`group-chip ${bloodGroup === group ? "active" : ""}`}
                onClick={() => setBloodGroup((current) => (current === group ? "" : group))}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        <form className="search-controls" onSubmit={handleSearch}>
          <div className="input-group">
            <label className="input-label">Blood Group</label>
            <select className="input" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
              <option value="">All Blood Groups</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">City or Area</label>
            <input
              className="input"
              placeholder="Enter city or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-gradient search-submit" disabled={loading}>
            {loading ? "Searching..." : "Search Donors"}
          </button>

          <button type="button" className="secondary-button" onClick={clearFilters} disabled={loading}>
            Clear
          </button>
        </form>
      </section>

      {error && <div className="message-banner error">{error}</div>}

      <div className="results-header">
        <div>
          <h3 className="panel-title">Available donors</h3>
          <p className="panel-copy">
            {loading
              ? "Refreshing donor matches..."
              : `${donors.length} donor${donors.length === 1 ? "" : "s"} available for the current search.`}
          </p>
        </div>
      </div>

      {!loading && donors.length === 0 && (
        <div className="glass-card empty-state">
          <h3 className="title" style={{ fontSize: "28px", marginBottom: "10px" }}>
            No matching donors found
          </h3>
          <p className="subtitle">
            Try a nearby city, remove one filter, or create a donor profile so the directory starts
            filling up.
          </p>
        </div>
      )}

      <div className="card-grid">
        {donors.map((donor) => {
          const donorName = donor.userId?.name || "Donor";

          return (
            <article key={donor._id} className="donor-card">
              <div className="donor-card-top">
                <div className="donor-avatar">{getInitials(donorName)}</div>
                <div>
                  <h3 className="donor-name">{donorName}</h3>
                  <div className="donor-location">{donor.area}, {donor.city}</div>
                </div>
              </div>

              <div className="donor-meta-row">
                <span className="pill accent">{donor.bloodGroup}</span>
                <span className="pill">{donor.available ? "Available now" : "Unavailable"}</span>
              </div>

              <div className="donor-detail-list">
                <div className="donor-detail-item">
                  <span className="detail-label">Phone</span>
                  <strong>{donor.phone}</strong>
                </div>
                <div className="donor-detail-item">
                  <span className="detail-label">Email</span>
                  <strong>{donor.userId?.email || "Not shared"}</strong>
                </div>
              </div>

              <div className="donor-contact">
                <a href={`tel:${donor.phone}`} className="contact-btn">
                  Call Donor
                </a>
                <a href={`mailto:${donor.userId?.email || ""}`} className="contact-btn contact-btn-primary">
                  Send Email
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

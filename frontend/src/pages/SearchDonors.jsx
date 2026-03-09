{donors.length === 0 ? (
  <p>No donors found</p>
) : (
  donors.map((d) => (
    <div key={d._id} className="donor-card">
      <b>{d.userId?.name}</b><br />
      Blood Group: {d.bloodGroup}<br />
      City: {d.city}<br />
      Area: {d.area}<br />
      Phone: {d.phone}
    </div>
  ))
)}
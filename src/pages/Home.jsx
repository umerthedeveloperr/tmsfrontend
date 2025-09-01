// Home page
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("emttms.up.railway.app/api/events")
      .then((r) => setEvents(r.data));
  }, []);
  return (
    <div className="container">
      <h1>Events</h1>
      <div className="grid">
        {events.map((e) => (
          <div key={e._id} className="card">
            <h3>{e.title}</h3>
            <p>{new Date(e.date).toLocaleString()}</p>
            <p>PKR {e.price}</p>
            <Link to={`/events/${e._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

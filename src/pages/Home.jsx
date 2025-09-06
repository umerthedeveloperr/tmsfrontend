// Home page
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://emttms.up.railway.app/api/events")
      .then((r) => setEvents(r.data));
  }, []);

  return (
    <div id="home-container">
      <h1 id="page-title">Events</h1>
      <div id="events-grid">
        {events.map((e) => (
          <div key={e._id} id="event-card">
            <div id="event-image">
              {e.title}
              <Link to={`/events/${e._id}`} id="view-btn">
                View
              </Link>
            </div>
            <div id="event-details">
              <p id="event-date">{new Date(e.date).toLocaleString()}</p>
              <p id="event-price">PKR {e.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

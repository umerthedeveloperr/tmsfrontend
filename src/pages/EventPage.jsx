import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("https://emttms.up.railway.app/api/events").then((r) => {
      const ev = r.data.find((x) => x._id === id);
      setEvent(ev);
    });
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    if (!file) return setMsg("Upload screenshot");
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("eventId", id);
    form.append("screenshot", file);
    try {
      await axios.post("https://emttms.up.railway.app/api/bookings", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg(
        "Booking created. You will be notified by email after confirmation."
      );
      setName("");
      setEmail("");
      setFile(null);
    } catch {
      setMsg("Error creating booking");
    }
  }

  if (!event) return <div id="loading-msg">Loading...</div>;

  return (
    <div id="booking-container">
      <h2 id="event-title">{event.title}</h2>
      <p id="event-description">{event.description}</p>
      <p id="event-date">Date: {new Date(event.date).toLocaleString()}</p>
      <p id="event-price">Price: PKR {event.price}</p>

      <form id="booking-form" onSubmit={submit}>
        <input
          id="name-input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          id="email-input"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div id="file-upload">
          <label htmlFor="screenshot">
            Upload payment screenshot (JazzCash/Easypaisa)
          </label>
          <input
            type="file"
            id="screenshot"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" id="submit-btn">
          Submit booking
        </button>
      </form>

      {msg && <p id="form-msg">{msg}</p>}
    </div>
  );
}

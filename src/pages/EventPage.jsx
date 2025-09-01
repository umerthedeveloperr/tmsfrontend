// Booking form
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
11;
export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    axios.get("emttms.up.railway.app/api/events").then((r) => {
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
      const res = await axios.post("emttms.up.railway.app/api/bookings", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg(
        "Booking created. You will be notified by email after confirmation."
      );
      setName("");
      setEmail("");
      setFile(null);
    } catch (err) {
      setMsg("Error creating booking");
    }
  }
  if (!event) return <div>Loading...</div>;
  return (
    <div className="container">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Price: PKR {event.price}</p>
      <form onSubmit={submit} className="form">
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <label>Upload payment screenshot (JazzCash/Easypaisa)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        12
        <button type="submit">Submit booking</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

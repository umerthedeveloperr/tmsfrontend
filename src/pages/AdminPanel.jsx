import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [list, setList] = useState([]);
  const [modalImage, setModalImage] = useState(null); // modal state
  const nav = useNavigate();

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    const token = localStorage.getItem("adminToken");
    if (!token) return nav("/admin");
    const res = await axios.get("https://emttms.up.railway.app/api/admin/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Use backend's base64 directly
    const bookingsWithBase64 = res.data.map((b) => {
      if (b.screenshot) {
        const mimeType = b.screenshot.contentType || "image/png";
        return { ...b, screenshot: `data:${mimeType};base64,${b.screenshot.data}` };
      }
      return b;
    });

    setList(bookingsWithBase64);
  }

  function viewScreenshot(base64Url) {
    setModalImage(base64Url); // show modal with image
  }

  async function confirm(id) {
    const token = localStorage.getItem("adminToken");
    const res = await axios.put(
      `https://emttms.up.railway.app/api/admin/bookings/${id}/confirm`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data);
    fetchList();
  }

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <button
        style={{ float: "right", marginBottom: "10px" }}
        onClick={() => {
          localStorage.removeItem("adminToken");
          nav("/admin");
        }}
      >
        Logout
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.event?.title}</td>
              <td>{r.status}</td>
              <td>
                <button
                  onClick={() => r.screenshot && setModalImage(r.screenshot)}
                  disabled={!r.screenshot}
                >
                  View SS
                </button>
                {r.status === "Pending" && (
                  <button onClick={() => confirm(r.id)}>Confirm</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {modalImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Screenshot"
            style={{
              maxHeight: "80%",
              maxWidth: "80%",
              border: "2px solid white",
            }}
          />
        </div>
      )}
    </div>
  );
}

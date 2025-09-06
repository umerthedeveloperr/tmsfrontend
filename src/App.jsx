import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <div id="app-container">
      <nav id="main-nav">
        <Link to="/" id="nav-link">Home</Link>
        <Link to="/admin" id="nav-link">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

// Admin login
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  async function login(e) {
    e.preventDefault();
    const res = await axios.post("https://emttms.up.railway.app//api/admin/login", {
      email,
      password,
    });
    localStorage.setItem("adminToken", res.data.token);
    nav("/admin/panel");
  }
  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={login} className="form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

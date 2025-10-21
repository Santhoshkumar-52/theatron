import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Styles/login.css"; // 🎨 Only colors & theme
import axios from "axios";
import { useGlobalStore } from "../globalstore.js";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "jose";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userid: "", password: "" });

  const baseUrl = useGlobalStore((state) => state.baseURL);
  const setUser = useGlobalStore((state) => state.setUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };
  useEffect(() => {
    const cachedUser = localStorage.getItem("loggedUser");
    if (cachedUser != null) {
      setUser(decodeJwt(cachedUser));
      navigate("/dashboard");
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    if (localStorage.getItem("loggedUser")) return;
    e.preventDefault();

    if (!formData.userid.trim() || !formData.password.trim()) {
      showToast("warning", "Please fill all fields");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}login`, formData);
      localStorage.setItem("loggedUser", response.data.token);
      const user = decodeJwt(response.data.token);
      showToast(response.data.icon, response.data.message);
      setUser(user);

      navigate("/dashboard");
    } catch (error) {
      showToast(response.data.icon, response.data.message);
    }
  };

  return (
    <div className="login-container min-h-screen flex">
      {/* Left Side - Logo */}
      <div className="login-left flex flex-col justify-center items-center w-1/2 p-10">
        <img src="../assets/" alt="Logo" className="w-32 h-32 mb-6" />
        <h1 className="text-3xl font-bold">Welcome to Theatron</h1>
      </div>

      {/* Right Side - Form */}
      <div className="login-right flex flex-col justify-center items-center w-1/2">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-lg w-80 login-form"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">User ID</label>
            <input
              type="text"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              placeholder="Enter your user ID"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-theme"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-theme"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold transition-colors login-btn"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

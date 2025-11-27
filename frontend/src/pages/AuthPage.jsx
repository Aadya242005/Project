import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg_img1.jpg";

// ✅ Vite environment variable
const apiUrl = import.meta.env.VITE_API_URL;

// Dynamic config for social logins
const socialProviders = [
  { name: "Google", className: "bg-red-500 hover:bg-red-600" },
  { name: "GitHub", className: "bg-gray-800 hover:bg-gray-900" },
];

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAlumni: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const payload = {
        email: formData.email,
        password: formData.password,
        ...(isLogin ? {} : { name: formData.name, alumni: formData.isAlumni }),
      };

      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to authenticate");

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      alert(error.message);
    }
  };

  const handleClearSession = () => {
    localStorage.removeItem("authToken");
    alert("Session cleared! You are logged out.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl w-full max-w-md p-8 border-4 border-indigo-600">
        <h1 className="text-4xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Welcome Coders! to Linksy
        </h1>
        <h3 className="text-xl text-center text-gray-600 mb-6">
          {isLogin ? "Login to CampusSkillX" : "Sign Up for CampusSkillX"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isAlumni"
                  id="alumni"
                  checked={formData.isAlumni}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="alumni" className="text-gray-700">
                  Are you an Alumni?
                </label>
              </div>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {isLogin && (
            <p className="text-right text-sm text-indigo-600 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="flex flex-col mt-4 space-y-2">
          {socialProviders.map((provider) => (
            <button
              key={provider.name}
              className={`w-full text-white py-2 rounded-lg transition ${provider.className}`}
            >
              Continue with {provider.name}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <div className="text-center mt-4">
          <button
            onClick={handleClearSession}
            className="text-sm text-red-500 hover:underline"
          >
            Clear Session (Log Out)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

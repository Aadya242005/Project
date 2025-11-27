import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlumni, setIsAlumni] = useState(false); // ✅ new state
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // 👉 later: call backend API here
    console.log("Signing up with:", { name, email, password, isAlumni });

    // temporary navigation to profile after signup
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* ✅ Alumni Checkbox */}
        <div className="flex items-center mb-4 space-x-2">
          <input
            type="checkbox"
            id="alumni"
            checked={isAlumni}
            onChange={(e) => setIsAlumni(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="alumni" className="text-gray-700 text-sm">
            Are you an Alumni?
          </label>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

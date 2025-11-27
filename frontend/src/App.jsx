import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";

// ✅ PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/auth" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    // Run check at start
    checkAuth();

    // Listen for login/logout changes from AuthPage
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading...
      </div>
    );

  console.log("isAuthenticated:", isAuthenticated);

  return (
    <Routes>
      {/* Auth Page */}
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
      />

      {/* Home (Landing with Navbar) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <LandingPage />
            </>
          </PrivateRoute>
        }
      />

      {/* Profile Page */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Fallback: redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

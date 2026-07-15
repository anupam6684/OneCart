// ProtectedRoute.jsx
import { toast } from "react-toastify";

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await authService.verifyToken();

      if (!isValid) {
        localStorage.removeItem("token");
      }

      setAuthorized(isValid);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return authorized ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

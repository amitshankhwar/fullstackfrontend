import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { verifyToken } from "./Auth";

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await verifyToken();
      setIsAuthenticated(valid);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;

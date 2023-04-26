import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  // Context API
  const { loading, user } = useContext(AuthContext);

  // Use location for send the pathname to login page.
  const location = useLocation();

  // Waiting for user logged in. Otherwise could not navigate right path
  if (loading) {
    return;
  }

  // If user is logged in then private route is return
  if (user) {
    return children;
  }

  // If user is not logged in then login page is return
  return <Navigate to="/login" state={location} replace></Navigate>;
};

export default PrivateRoutes;

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //if a specific role is required like "admin"
  if(requiredRole && (!user || user.role !== requiredRole)){
    return <Navigate to="/403" replace />;
  }

  // Otherwise, render the protected page
  return children;
}

export default ProtectedRoute;

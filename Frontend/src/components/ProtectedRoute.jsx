import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    alert("Please login first ❌");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

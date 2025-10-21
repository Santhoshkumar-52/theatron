// Components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalStore } from "../globalstore.js";

export default function ProtectedRoute({ children }) {
  const user = useGlobalStore((state) => state.user);
  if (user == null) return <Navigate to="/login" replace />;
  return children;
}

// Components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useGlobalStore from "../globalstore";

export default function ProtectedRoute({ children }) {
  const user = useGlobalStore((state) => state.user);
  if (user) return <Navigate to="/login" replace />;
  return children;
}

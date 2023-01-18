import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

// When wrapped around route, prevents it from being accessed unless logged in
export function PrivateRoute({ children }) {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/login" />;
}

// When wrapped around route, prevents it from being accessed if logged in
export function HiddenRoute({ children }) {
  const { loggedIn } = useAuth();
  console.log(loggedIn);
  return loggedIn ? <Navigate to="/" /> : children;
}

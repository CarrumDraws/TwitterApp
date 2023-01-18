import React from "react";
import { Navigate } from "react-router-dom";

// When wrapped around route, prevents it from being accessed unless logged in
export function PrivateRoute({ children }) {
  return localStorage.getItem("loggedIn") ? children : <Navigate to="/login" />;
}

// When wrapped around route, prevents it from being accessed if logged in
export function HiddenRoute({ children }) {
  return localStorage.getItem("loggedIn") ? <Navigate to="/" /> : children;
}

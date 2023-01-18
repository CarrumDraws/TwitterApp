import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Error from "./components/Error";
import Redirect from "./components/Redirect";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute, HiddenRoute } from "./context/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <HiddenRoute>
              <Login />
            </HiddenRoute>
          }
        />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

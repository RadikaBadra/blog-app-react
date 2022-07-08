import * as React from "react";
import { Routes, Route, useNavigate, useRoutes } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Home from "./pages/home";
import { AuthProvider } from "./AuthProvider";
import { ProtectedHome, ProtectedLogin } from "./ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedLogin>
              <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
            </ProtectedLogin>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <ProtectedHome>
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            </ProtectedHome>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

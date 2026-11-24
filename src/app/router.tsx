import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/AuthPages/LoginPage";
import RegisterPage from "@/pages/AuthPages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/profile", element: <ProfilePage /> }],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

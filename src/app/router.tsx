import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/AuthPages/LoginPage";
import RegisterPage from "@/pages/AuthPages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import ClothesListPage from "@/pages/ClothesListPage/ClothesListPage";
import PatternsListPage from "@/pages/PatternsListPage/PatternsListPage";
import ClothesDetailPage from "@/pages/ClothesDetailPage/ClothesDetailPage";
import PatternDetailPage from "@/pages/PatternDetailPage/PatternDetailPage";
import FavoritesPage from "@/pages/FavoritesPage/FavoritesPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/clothes", element: <ClothesListPage /> },
      { path: "/patterns", element: <PatternsListPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile", element: <ProfilePage /> },
          { path: "/clothes/:slug", element: <ClothesDetailPage /> },
          { path: "/patterns/:slug", element: <PatternDetailPage /> },
          { path: "/favorites", element: <FavoritesPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

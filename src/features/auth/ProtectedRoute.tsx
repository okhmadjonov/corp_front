import { Navigate, Outlet, useLocation } from "react-router-dom";
import { FullPageLoader } from "@/components/FullPageLoader/FullPageLoader";
import { useAuth } from "./useAuth";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageLoader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}

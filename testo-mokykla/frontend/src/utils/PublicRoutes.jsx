import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoutes() {
  const { user } = useAuth();

  return user && user.accessToken ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;

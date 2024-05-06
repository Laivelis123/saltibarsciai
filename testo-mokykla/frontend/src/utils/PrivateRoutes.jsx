import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoutes() {
  const { user } = useAuth();

  return user && user.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/prisijungimas" />
  );
}

export default PrivateRoutes;

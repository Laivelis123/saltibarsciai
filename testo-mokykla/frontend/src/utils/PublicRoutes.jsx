import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function PrivateRoutes() {
  const token = useAuth();
  return token ? <Navigate to="/" /> : <Outlet />;
}

export default PrivateRoutes;

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TeacherRoutes() {
  const { userData } = useAuth();

  return userData.accountType === "teacher" ? <Outlet /> : <Navigate to="/" />;
}

export default TeacherRoutes;

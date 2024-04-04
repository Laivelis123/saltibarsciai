import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function StudentRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3001/api/data/user",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.accountType !== "student") {
            navigate("/");
          }
        } else {
          navigate("/prisijungimas");
        }
      } catch (error) {
        console.error("Klaida gaudant duomenis:", error);
      }
    };

    fetchUser();
  }, []);

  return <Outlet />;
}

export default StudentRoutes;

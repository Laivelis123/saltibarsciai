import React, { useEffect, useState } from "react";
import axios from "axios";
import UI from "../components/UI";

function Profilis() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3001/api/auth/username",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser({
            username: response.data.username,
            email: response.data.email,
            accountType: response.data.accountType,
          });
        }
      } catch (error) {
        console.error("Klaida ieškant vartotojo vardo:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UI>
      {user && (
        <>
          <div>Name: {user.username}</div>
          <div>Email: {user.email}</div>
          <div>
            Account type:
            {user.accountType === "teacher" ? " Mokytojas" : " Mokinys"}
          </div>
        </>
      )}
    </UI>
  );
}

export default Profilis;

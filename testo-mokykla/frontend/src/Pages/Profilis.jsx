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
            "http://localhost:3001/api/auth/data/user",
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
  }, [user]);

  return (
    <UI>
      {user && (
        <>
          <div>Slapyvardis: {user.username}</div>
          <div>Paštas: {user.email}</div>
          <div>
            Paskyros tipas:
            {user.accountType === "teacher" ? " Mokytojas" : " Mokinys"}
          </div>
        </>
      )}
    </UI>
  );
}

export default Profilis;

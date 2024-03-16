import React, { useEffect, useState } from "react";
import axios from "axios";

function Profilis() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
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
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error("Klaida ieškant vartotojo vardo:", error);
      }
    };

    fetchUsername();
  }, []);

  return <div>{username && <div>Name: {username}</div>}</div>;
}

export default Profilis;

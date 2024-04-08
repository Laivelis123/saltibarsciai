// EditGroups.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";

const EditGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3001/api/groups/my-groups",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setGroups(response.data.groups);
        }
      } catch (error) {
        console.error("Error fetching user's groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Mano grupės</h2>
      <div className="mb-3">
        {groups.map((group) => (
          <div key={group.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{group.name}</h5>
              <p className="card-text">Prisijungimo kodas: {group.code}</p>
              <Link
                to={`/valdymas/mokytojas/tvarkyti/grupes/redaguoti/${group.id}`}
                className="btn btn-primary mr-2"
              >
                Redaguoti grupę
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditGroups;

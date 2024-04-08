import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";

const EditGroups = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/groups/my-groups",
          { headers: { Authorization: `Bearer ${user.accessToken}` } }
        );
        setGroups(response.data.groups);
      } catch (error) {
        console.error("Error fetching user's groups:", error);
      }
    };

    fetchGroups();
  }, [user.accessToken]); // Add user.accessToken to the dependency array

  return (
    <UI>
      <div className="container mt-4">
        <h2>My Groups</h2>
        <div className="mb-3">
          {groups.map((group) => (
            <div key={group.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{group.name}</h5>
                <p className="card-text">Access Code: {group.code}</p>
                <Link
                  to={`/valdymas/mokytojas/tvarkyti/grupes/redaguoti/${group.id}`}
                  className="btn btn-primary mr-2"
                >
                  Edit Group
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UI>
  );
};

export default EditGroups;

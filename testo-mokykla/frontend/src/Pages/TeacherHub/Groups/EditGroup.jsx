import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";

const EditGroup = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `http://localhost:3001/api/groups/${groupId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setGroup(response.data.group);
          setNewGroupName(response.data.group.name);
          setUsers(response.data.group.users);
        }
      } catch (error) {
        console.error("Klaida gaunant grupę:", error);
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleGroupNameChange = (event) => {
    setNewGroupName(event.target.value);
  };

  const handleUpdateGroupName = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.put(
          `http://localhost:3001/api/groups/${groupId}`,
          { name: newGroupName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGroup(response.data.group);
      }
    } catch (error) {
      console.error("Klaida atnaujinant grupės vardą:", error);
      setErrorMessage("Nepavyko atnaujint grupės vardo.");
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(`http://localhost:3001/api/groups/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/valdymas/mokytojas/tvarkyti/grupes");
      }
    } catch (error) {
      console.error("Klaida trinant grupę:", error);
      setErrorMessage("Nepavyko pašalinti grupės.");
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(
          `http://localhost:3001/api/groups/${groupId}/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Klaida šalinant vartotoją iš grupės:", error);
      setErrorMessage("Nepavyko panaikinti vartotojo iš grupės.");
    }
  };

  return (
    <div className="container mt-4">
      {group && (
        <>
          <h2>Redaguoti grupę</h2>
          <div className="mb-3">
            <label htmlFor="groupName" className="form-label">
              Grupės pavadinimas:
            </label>
            <input
              type="text"
              className="form-control"
              id="groupName"
              value={newGroupName}
              onChange={handleGroupNameChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleUpdateGroupName}>
            Atnaujinti pavadinimą
          </button>
          <button className="btn btn-danger ml-2" onClick={handleDeleteGroup}>
            Ištrinti grupę
          </button>
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          <h3>Prisijungę vartotojai:</h3>
          <ul className="bg-light">
            {users &&
              users.map((user) => (
                <li key={user.id} className="d-flex align-items-center mb-2">
                  <div>{user.username}</div>
                  <button
                    className="btn btn-danger m-4"
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Šalinti
                  </button>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EditGroup;

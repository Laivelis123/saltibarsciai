import React, { useState, useEffect } from "react";
import axios from "axios";
import UI from "../../../components/UI/UI";

const YourGroups = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [joinCode, setJoinCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchJoinedGroups();
  }, []);

  const fetchJoinedGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "http://localhost:3001/api/groups/joined-groups",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJoinedGroups(response.data.groups);
      }
    } catch (error) {
      console.error("Klaida gaudant grupes:", error);
      setErrorMessage("Nepavyko gauti prisijungusių grupių.");
    }
  };

  const handleJoinGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && joinCode.trim() !== "") {
        await axios.post(
          "http://localhost:3001/api/groups/join",
          { code: joinCode },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchJoinedGroups();
        setJoinCode("");
      }
    } catch (error) {
      console.error("Klaida jungiantis prie grupės:", error);
      setErrorMessage("Nepavyko prisijungti prie grupės.");
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(
          `http://localhost:3001/api/groups/${groupId}/leave`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchJoinedGroups();
      }
    } catch (error) {
      console.error("Klaida paliekant grupę:", error);
      setErrorMessage("Nepavyko palikti grupės.");
    }
  };

  return (
    <UI>
      <div className="container mt-4">
        <h2>Tavo grupės</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <ul className="bg-light">
          {joinedGroups.map((group) => (
            <li className="bg-light" key={group.id}>
              {group.name}
              <button
                className="btn btn-danger m-4"
                onClick={() => handleLeaveGroup(group.id)}
              >
                Palikti grupę
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h2>Prisijungite prie grupės</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Įveskite grupės kodą"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleJoinGroup}>
            Pridėti
          </button>
        </div>
      </div>
    </UI>
  );
};

export default YourGroups;

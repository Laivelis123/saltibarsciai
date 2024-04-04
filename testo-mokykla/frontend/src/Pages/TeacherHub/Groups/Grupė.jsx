import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";

const Grupė = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };
  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.post(
          "http://localhost:3001/api/groups/create",
          { name: groupName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { group } = response.data;
        navigate(`/valdymas/mokytojas/tvarkyti/grupes/redaguoti/${group.id}`);
      }
    } catch (error) {
      console.error("Klaida kuriant grupę: ", error);
    }
  };

  return (
    <UI>
      <div className="container mt-4">
        <h2>Grupės kūrimas</h2>
        <div className="mb-3">
          <form onSubmit={handleSubmitCreate}>
            <label htmlFor="groupName" className="form-label">
              Grupės pavadinimas:
            </label>
            <input
              type="text"
              className="form-control"
              id="groupName"
              value={groupName}
              onChange={handleGroupNameChange}
            />
            <button type="submit" className="btn btn-primary mt-2">
              Sukurti grupę
            </button>
          </form>
        </div>
      </div>
    </UI>
  );
};

export default Grupė;

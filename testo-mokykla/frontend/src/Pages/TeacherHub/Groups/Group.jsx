import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";
import ServerPaths from "../../../context/ServerPaths";

const Group = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState("");

  const handleGroupNameChange = (event) => {
    const value = event.target.value;
    setGroupName(value);
    if (!value.trim()) {
      setGroupNameError("Pavadinimas negali būti tuščias");
    } else {
      setGroupNameError("");
    }
  };

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    if (groupNameError || !groupName) {
      setGroupNameError("Pavadinimas negali būti tuščias");
      return;
    }

    try {
      const response = await axios.post(
        ServerPaths.GroupRoutes.CREATE_GROUP,
        { name: groupName },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      const { group } = response.data;
      navigate(`/valdymas/mokytojas/tvarkyti/grupes/redaguoti/${group.id}`);
    } catch (error) {
      console.error("Klaida kuriant grupę: ", error);
    }
  };

  return (
    <UI>
      <div className="container my-4 ">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div
              className="mt-5 py-4 card"
              style={{
                borderRadius: "30px",
                backgroundColor: "rgba(78, 174, 18, 0.878)",
              }}
            >
              <form className="mx-5" onSubmit={handleSubmitCreate}>
                <h2>Grupės kūrimas</h2>
                <label htmlFor="groupName" className="form-label">
                  Grupės pavadinimas:
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    groupNameError ? "is-invalid" : ""
                  }`}
                  id="groupName"
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
                {groupNameError && (
                  <div className="invalid-feedback">{groupNameError}</div>
                )}
                <button type="submit" className="btn btn-primary mt-2">
                  Sukurti grupę
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
};

export default Group;

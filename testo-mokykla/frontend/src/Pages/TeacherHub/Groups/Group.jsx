import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";
import ServerPaths from "../../../context/ServerPaths";
const Group = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };
  const handleSubmitCreate = async (event) => {
    event.preventDefault();
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
      <div className="container mt-4">
        <h2>Groups kūrimas</h2>
        <div className="mb-3">
          <form onSubmit={handleSubmitCreate}>
            <label htmlFor="groupName" className="form-label">
              Groups pavadinimas:
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

export default Group;

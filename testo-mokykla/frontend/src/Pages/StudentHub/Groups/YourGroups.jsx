import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";
import ServerPaths from "../../../context/ServerPaths";
const YourGroups = () => {
  const { user } = useAuth();
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [joinCode, setJoinCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchJoinedGroups = useCallback(async () => {
    try {
      const response = await axios.get(ServerPaths.GroupRoutes.JOINED_GROUPS, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setJoinedGroups(response.data.groups);
    } catch (error) {
      console.error("Klaida gaudant grupes:", error);
      setErrorMessage("Nepavyko gauti prisijungusių grupių.");
    }
  }, [user.accessToken]);

  useEffect(() => {
    fetchJoinedGroups();
  }, [fetchJoinedGroups]);

  const handleJoinGroup = async () => {
    try {
      await axios.post(
        ServerPaths.GroupRoutes.JOIN_GROUP,
        { code: joinCode },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      fetchJoinedGroups();
      setJoinCode("");
    } catch (error) {
      console.error("Klaida jungiantis prie grupės:", error);
      setErrorMessage("Nepavyko prisijungti prie grupės.");
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await axios.delete(ServerPaths.GroupRoutes.LEAVE_GROUP(groupId), {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      fetchJoinedGroups();
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

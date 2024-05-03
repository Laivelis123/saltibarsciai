import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";
import ServerPaths from "../../../context/ServerPaths";
const EditGroup = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [groupNameError, setGroupNameError] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(
          ServerPaths.GroupRoutes.GET_GROUP(groupId),
          { headers: { Authorization: `Bearer ${user.accessToken}` } }
        );
        setGroup(response.data.group);
        setNewGroupName(response.data.group.name);
        setUsers(response.data.group.users);
      } catch (error) {
        console.error("Klaida gaunant grupę:", error);
      }
    };

    fetchGroup();
  }, [groupId, user.accessToken]);

  const handleGroupNameChange = (event) => {
    const value = event.target.value;
    setNewGroupName(value);
    if (!value.trim()) {
      setGroupNameError("Pavadinimas negali būti tuščias");
    } else {
      setGroupNameError("");
    }
  };

  const handleUpdateGroupName = async () => {
    if (groupNameError) {
      setGroupNameError("Pavadinimas negali būti tuščias");
      return;
    }
    try {
      const response = await axios.put(
        ServerPaths.GroupRoutes.UPDATE_GROUP(groupId),
        { name: newGroupName },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      setGroup(response.data.group);
    } catch (error) {
      console.error("Klaida atnaujinant grupės vardą:", error);
      setErrorMessage("Nepavyko atnaujint grupės vardo.");
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await axios.delete(ServerPaths.GroupRoutes.DELETE_GROUP(groupId), {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      navigate("/valdymas/mokytojas/tvarkyti/grupes");
    } catch (error) {
      console.error("Klaida trinant grupę:", error);
      setErrorMessage("Nepavyko pašalinti grupės.");
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(
        ServerPaths.GroupRoutes.REMOVE_USER_FROM_GROUP(groupId, userId),
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Klaida šalinant vartotoją iš grupės:", error);
      setErrorMessage("Nepavyko panaikinti vartotojo iš grupės.");
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
              {group && (
                <div className="px-3 py-3">
                  <h2 className="text-center">Redaguoti grupę</h2>
                  <label htmlFor="groupName" className="px-3 form-label">
                    Grupės pavadinimas:
                  </label>
                  <div className="py-3">
                    <input
                      type="text"
                      className={`px-3 form-control ${
                        groupNameError ? "is-invalid" : ""
                      }`}
                      id="groupName"
                      value={newGroupName}
                      onChange={handleGroupNameChange}
                    />
                  </div>
                  {groupNameError && (
                    <div className="invalid-feedback">{groupNameError}</div>
                  )}
                  <button
                    className="btn btn-primary mx-4 px-2"
                    onClick={handleUpdateGroupName}
                  >
                    Atnaujinti pavadinimą
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={handleDeleteGroup}
                  >
                    Ištrinti grupę
                  </button>
                  {errorMessage && (
                    <p className="text-danger mt-3">{errorMessage}</p>
                  )}
                  <h3 className="text-center">Prisijungę vartotojai:</h3>
                  <ul className="list-group" style={{ background: "none" }}>
                    {users &&
                      users.map((user) => (
                        <li
                          key={user.id}
                          className="py-3 list-group-item d-flex justify-content-between align-items-center m-2"
                          style={{
                            border: "none",
                            borderRadius: "30px",
                            backgroundColor: "rgba(78, 174, 18, 0.878)",
                          }}
                        >
                          <div className="px-5">{user.username}</div>
                          <button
                            className="btn btn-danger rounded-pill px-3 mx-5"
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            Šalinti
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
};

export default EditGroup;

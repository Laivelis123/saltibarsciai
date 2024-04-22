import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const EditQuizGroup = ({ quizId }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/groups/my-groups",
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setAllGroups(response.data.groups);
      } catch (error) {
        console.error("Error fetching all groups:", error);
      }
    };

    const fetchAssignedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/quizzes/${quizId}/users`,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setAssignedUsers(response.data.assignedUsers);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    fetchAllGroups();
    fetchAssignedUsers(); // Call fetchAssignedUsers when component mounts
  }, [quizId, user.accessToken]);
  const handleAssignQuiz = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/quizzes/assign-quiz",
        { quizId, groupId: selectedGroup },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );

      // Fetch the updated list of assigned users
      const response = await axios.get(
        `http://localhost:3001/api/quizzes/${quizId}/users`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setAssignedUsers(response.data.assignedUsers);

      // Handle success, maybe show a success message
    } catch (error) {
      console.error("Error assigning quiz to group:", error);
      // Handle error, maybe show an error message
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/quizzes/${quizId}/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      // Update assigned users after deletion
      setAssignedUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
      // Handle success, maybe show a success message
    } catch (error) {
      console.error("Error removing user from quiz:", error);
      // Handle error, maybe show an error message
    }
  };
  return (
    <div>
      <div className="mt-3">
        <h4>Priskirti vartotojai</h4>
        <ul className="list-group">
          {assignedUsers.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {user.username}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleRemoveUser(user.id)}
              >
                Šalinti
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <h4>Parink grupę priskirti prie testo</h4>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="form-select"
        >
          <option value="">Parink grupę</option>
          {allGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary mt-2" onClick={handleAssignQuiz}>
          Priskirti
        </button>
      </div>
    </div>
  );
};

export default EditQuizGroup;

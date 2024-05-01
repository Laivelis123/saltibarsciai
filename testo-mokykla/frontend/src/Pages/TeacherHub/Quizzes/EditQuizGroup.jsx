import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import PropTypes from "prop-types";
import ServerPaths from "../../../context/ServerPaths";
const EditQuizGroup = ({ quizId }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const response = await axios.get(ServerPaths.GroupRoutes.MY_GROUPS, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        setAllGroups(response.data.groups);
      } catch (error) {
        console.error("Klaida gaunant visas grupes:", error);
      }
    };

    const fetchAssignedUsers = async () => {
      try {
        console.log(ServerPaths.QuizRoutes.GET_USERS_FOR_QUIZ(quizId));
        const response = await axios.get(
          ServerPaths.QuizRoutes.GET_USERS_FOR_QUIZ(quizId),
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setAssignedUsers(response.data.assignedUsers);
      } catch (error) {
        console.error("Klaida gaunant priskirtus vartotojus:", error);
      }
    };

    fetchAllGroups();
    fetchAssignedUsers();
  }, [quizId, user.accessToken]);
  const handleAssignQuiz = async () => {
    try {
      await axios.post(
        ServerPaths.QuizRoutes.ASSIGN_QUIZ_TO_GROUP,
        { quizId, groupId: selectedGroup },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      const response = await axios.get(
        ServerPaths.QuizRoutes.GET_USERS_FOR_QUIZ(quizId),
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setAssignedUsers(response.data.assignedUsers);
    } catch (error) {
      console.error("Klaida priskiriant testą prie grupės vartotojų:", error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(
        ServerPaths.QuizRoutes.REMOVE_USER_FROM_QUIZ(quizId, userId),
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setAssignedUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Klaida pašalinant vartotoją iš testo:", error);
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
EditQuizGroup.propTypes = {
  quizId: PropTypes.string.isRequired,
};
export default EditQuizGroup;

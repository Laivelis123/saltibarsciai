import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UI from "../../../components/UI/UI";

function DoneQuizzes() {
  const { user } = useAuth();
  const [userGrades, setUserGrades] = useState([]);

  useEffect(() => {
    const fetchDoneQuizzes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/quizzes/assigned/done-quizzes`,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setUserGrades(response.data.userGrades);
      } catch (error) {
        console.error("Error fetching done quizzes:", error);
      }
    };
    fetchDoneQuizzes();
  }, [user.accessToken]);

  return (
    <UI>
      <div className="container">
        <h2 className="mb-4">Baigti testai</h2>
        <div className="row">
          {userGrades.map((userGrade) => (
            <div key={userGrade.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{userGrade.Quiz.title}</h5>
                  <p className="card-text">
                    <strong>Kategorija:</strong>{" "}
                    {userGrade.Quiz.categoryAlias.name}
                  </p>
                  <p className="card-text">
                    <strong>Mokytojas:</strong>{" "}
                    {userGrade.Quiz.Creator.username}
                  </p>
                  <p className="card-text">
                    <strong>Įvertinimas:</strong> {userGrade.score}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UI>
  );
}

export default DoneQuizzes;

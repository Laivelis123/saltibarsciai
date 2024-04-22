import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UI from "../../../components/UI/UI";

function YourQuizzes() {
  const { user } = useAuth();
  const [userQuizzes, setUserQuizzes] = useState([]);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/quizzes/assigned/my-quizzes`,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setUserQuizzes(response.data.userQuizzes);
      } catch (error) {
        console.error("Error fetching UserQuizzes:", error);
      }
    };
    fetchUserQuizzes();
  }, [user.accessToken]);

  return (
    <UI>
      <div>
        <h2>Atliekami testai</h2>
        <div>
          {userQuizzes.map((userQuiz) => (
            <div key={userQuiz.id} className="card my-3">
              <div className="card-body">
                <h3 className="card-title">{userQuiz.Quiz.title}</h3>
                {userQuiz.Quiz && (
                  <div>
                    {userQuiz.Quiz.categoryAlias && (
                      <p>Kategorija: {userQuiz.Quiz.categoryAlias.name}</p>
                    )}
                    {userQuiz.Quiz.Creator && (
                      <p>Sukurta: {userQuiz.Quiz.Creator.username}</p>
                    )}
                    {userQuiz.Quiz.Questions && (
                      <p>Klausimų kiekis: {userQuiz.Quiz.Questions.length}</p>
                    )}
                    <button className="btn btn-primary">Laikyti testą</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </UI>
  );
}

export default YourQuizzes;

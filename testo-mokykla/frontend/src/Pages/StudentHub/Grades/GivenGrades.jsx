import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UI from "../../../components/UI/UI";

const GivenGrades = () => {
  const { quizId, userId } = useParams();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/quizzes/assigned/${quizId}/${userId}`,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setQuiz(response.data.quiz);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [user.accessToken, quizId, userId]);

  return (
    <UI>
      {!loading && (
        <>
          <h2 className="mb-4">Testo {quiz.title} peržiūra</h2>
          <p>įvertinimas: {quiz.grade}</p>
          <h3 className="mb-4">Testo klausimai</h3>
          {quiz &&
            quiz.questions.map((question) => (
              <div key={question.id} className="card mb-4">
                <div className="card-header">
                  <h3 className="card-title">{question.questionText}</h3>
                </div>
                <div className="card-body">
                  <ul className="bg-white">
                    {question.allAnswers.map((answer) => {
                      const selectedAnswer = question.allUserAnswers.find(
                        (userAnswer) => userAnswer.id === answer.id
                      );
                      const isSelected = !!selectedAnswer;
                      const isRed = isSelected && answer.points <= 0;

                      const isPrimary = isSelected && answer.points > 0;
                      const colorClass = isRed
                        ? "text-danger"
                        : isPrimary
                        ? "text-primary"
                        : "";
                      return (
                        <li
                          key={answer.id}
                          className={`bg-white mx-2 ${colorClass}`}
                        >
                          <a>{answer.answerText}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
        </>
      )}
    </UI>
  );
};

export default GivenGrades;

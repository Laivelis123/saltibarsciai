import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import UI from "../../../components/UI/UI";

function TakeQuizes() {
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { quizId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/quizzes/questions/${quizId}`,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setQuiz(response.data.quiz);
        const initialSelectedAnswers = {};
        response.data.quiz.questions.forEach((question) => {
          initialSelectedAnswers[question.id] = [];
        });
        setSelectedAnswers(initialSelectedAnswers);
      } catch (error) {
        if (error.response.status === 400) {
          navigate("/");
        }
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [user.accessToken, quizId]);

  const handleAnswerSelect = (questionId, answerId, isSelected) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelectedAnswers = { ...prevSelectedAnswers };
      if (!updatedSelectedAnswers[questionId]) {
        updatedSelectedAnswers[questionId] = [];
      }
      const answerIndex = updatedSelectedAnswers[questionId].indexOf(answerId);
      if (isSelected && answerIndex === -1) {
        updatedSelectedAnswers[questionId].push(answerId);
      } else if (!isSelected && answerIndex !== -1) {
        updatedSelectedAnswers[questionId].splice(answerIndex, 1);
      }
      return updatedSelectedAnswers;
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(
        selectedAnswers,
        "selectedAnswers",
        quizId,
        "quizId",
        user.accessToken
      );
      const response = await axios.post(
        `http://localhost:3001/api/quizzes/assigned/${quizId}/submit`,
        {
          answers: selectedAnswers,
        },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      navigate("/valdymas/mokinys/testai");
    } catch (error) {
      if (error.response.status === 400) {
        navigate("/");
      }
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <UI>
      <div>
        {quiz ? (
          <>
            <h2 style={{ width: "50%", margin: "auto" }}>{quiz.title}</h2>
            <div>
              {quiz.questions &&
                quiz.questions.map((question) => (
                  <div key={question.id} className="card my-3">
                    <div className="card-body">
                      <h4 style={{ width: "50%", margin: "auto" }}>
                        {question.questionText}
                      </h4>
                      <ul className="list-group bg-white">
                        {question.answers.map((answer) => (
                          <li
                            key={answer.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ width: "50%", margin: "auto" }}
                          >
                            <label
                              htmlFor={answer.id}
                              style={{ flex: "1", marginRight: "10px" }}
                            >
                              {answer.answerText}
                            </label>
                            <input
                              type="checkbox"
                              id={answer.id}
                              checked={selectedAnswers[question.id].includes(
                                answer.id
                              )}
                              onChange={(e) =>
                                handleAnswerSelect(
                                  question.id,
                                  answer.id,
                                  e.target.checked
                                )
                              }
                              style={{
                                flex: "1",
                                width: "30px",
                                height: "30px",
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="btn btn-primary mr-2">
              Teikti
            </button>
            <Link to="/valdymas/mokinys/testai" className="btn btn-secondary">
              Atgal
            </Link>
          </>
        ) : (
          <div>Krauna...</div>
        )}
      </div>
    </UI>
  );
}

export default TakeQuizes;
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import UI from "../../../components/UI/UI";
import ServerPaths from "../../../context/ServerPaths";
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
          ServerPaths.AssignedRoutes.TAKE_QUIZ(quizId),
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
        console.error("Klaida gaunant testą:", error);
      }
    };
    fetchQuiz();
  }, [user.accessToken, quizId, navigate]);

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
      await axios.post(
        ServerPaths.AssignedRoutes.SUBMIT_QUIZ(quizId),
        {
          answers: selectedAnswers,
        },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      navigate("/valdymas/mokinys/testai");
    } catch (error) {
      console.error("Klaida testo užbaigime:", error);
    }
  };

  return (
    <UI>
      <div className="container my-4 ">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              className="my-5 py-4 card text-center"
              style={{
                borderRadius: "30px",
                backgroundColor: "rgba(78, 174, 18, 0.878)",
              }}
            >
              {quiz ? (
                <div className="px-4">
                  <h2 style={{ width: "50%", margin: "auto" }}>{quiz.title}</h2>
                  <div>
                    {quiz.questions &&
                      quiz.questions.map((question) => (
                        <div
                          key={question.id}
                          className="card my-3 mx-3 "
                          style={{ background: "none", border: "none" }}
                        >
                          <div
                            className="card-body"
                            style={{
                              backgroundColor: "rgba(78, 174, 18, 0.878)",
                              borderRadius: "30px",
                            }}
                          >
                            <h4
                              className="py-3"
                              style={{ width: "50%", margin: "auto" }}
                            >
                              {question.questionText}
                            </h4>
                            <ul
                              className="list-group"
                              style={{ background: "none" }}
                            >
                              {question.answers.map((answer) => (
                                <li
                                  key={answer.id}
                                  className="overflow-x-auto my-4 rounded-pill list-group-item d-flex justify-content-between align-items-center "
                                  style={{
                                    width: "50%",
                                    margin: "auto",
                                    backgroundColor: "rgba(78, 174, 18, 0.878)",
                                    border: "none",
                                  }}
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
                                    checked={selectedAnswers[
                                      question.id
                                    ].includes(answer.id)}
                                    onChange={(e) =>
                                      handleAnswerSelect(
                                        question.id,
                                        answer.id,
                                        e.target.checked
                                      )
                                    }
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary mr-2"
                  >
                    Teikti
                  </button>
                  <Link
                    to="/valdymas/mokinys/testai"
                    className="btn btn-secondary"
                  >
                    Atgal
                  </Link>
                </div>
              ) : (
                <div>Krauna...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
}

export default TakeQuizes;

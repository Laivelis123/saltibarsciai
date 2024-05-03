import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UI from "../../../components/UI/UI";
import ServerPaths from "../../../context/ServerPaths";

const CheckQuiz = () => {
  const { quizId, userId } = useParams();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          ServerPaths.AssignedRoutes.GET_QUIZ_FOR_USER(quizId, userId),
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setQuiz(response.data.quiz);
        setLoading(false);
      } catch (error) {
        console.error("Klaida gaunant testą:", error);
      }
    };
    fetchQuiz();
  }, [user.accessToken, quizId, userId]);

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
              {!loading && (
                <>
                  <h2 className="mb-4 text-center">
                    {quiz.title} peržiūra, studentui {quiz.user}
                  </h2>
                  <p className="mb-4 h3  text-center">
                    Įvertinimas: {quiz.grade}%
                  </p>
                  <h3 className="mb-4 text-center">Testo klausimai</h3>
                  {quiz &&
                    quiz.questions.map((question) => (
                      <div
                        key={question.id}
                        className="card mb-4 mx-3"
                        style={{ background: "none", borderRadius: "30px" }}
                      >
                        <div className="card-header">
                          <h3 className="card-title mx-5">
                            {question.questionText}
                          </h3>
                        </div>
                        <div className="card-body">
                          <ul
                            className="list-group"
                            style={{ background: "none", borderRadius: "30px" }}
                          >
                            {question.allAnswers.map((answer) => (
                              <li
                                key={answer.id}
                                style={{
                                  background: "none",
                                  borderRadius: "30px",
                                }}
                                className={`my-3 list-group-item d-flex justify-content-between align-items-center ${
                                  question.allUserAnswers.find(
                                    (userAnswer) => userAnswer.id === answer.id
                                  )
                                    ? "text-primary"
                                    : ""
                                }`}
                              >
                                <div>{answer.answerText}</div>
                                <div> Skiriami balai: {answer.points}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
};

export default CheckQuiz;

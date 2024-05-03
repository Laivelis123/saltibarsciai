import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UI from "../../../components/UI/UI";
import ServerPaths from "../../../context/ServerPaths";
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
          <div className="col-md-8">
            <div
              className="my-5 py-4 card text-center"
              style={{
                borderRadius: "30px",
                backgroundColor: "rgba(78, 174, 18, 0.878)",
              }}
            >
              {!loading && (
                <>
                  <h2 className="mb-4">Testo {quiz.title} peržiūra</h2>
                  <p>Įvertinimas: {quiz.grade}</p>
                  <h3 className="mb-4">Testo klausimai</h3>
                  <h5 className="mx-2 my -2">
                    Raudona - blogai pasirinktas, mėlyna - gerai pasirinktas{" "}
                  </h5>
                  {quiz &&
                    quiz.questions.map((question) => (
                      <div
                        key={question.id}
                        className="card mx-4 mb-4"
                        style={{ background: "none" }}
                      >
                        <div
                          className="card-header m-3 rounded-pill"
                          style={{
                            border: "none",
                            backgroundColor: "rgba(78, 174, 18, 0.878)",
                          }}
                        >
                          <h3 className="card-title">
                            {question.questionText}
                          </h3>
                        </div>
                        <div className="card-body">
                          <ul style={{ background: "none" }}>
                            {question.allAnswers.map((answer) => {
                              const selectedAnswer =
                                question.allUserAnswers.find(
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
                                  className={` mx-2 ${colorClass}`}
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
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
};

export default GivenGrades;

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
      {!loading && (
        <>
          <h2 className="mb-4">
            {quiz.title} peržiūra, studentui {quiz.user}
          </h2>
          <p>Įvertinimas: {quiz.grade}</p>
          <h3 className="mb-4">Testo klausimai</h3>
          {quiz &&
            quiz.questions.map((question) => (
              <div key={question.id} className="card mb-4">
                <div className="card-header">
                  <h3 className="card-title">{question.questionText}</h3>
                </div>
                <div className="card-body">
                  <ul className="bg-white">
                    {question.allAnswers.map((answer) => (
                      <li
                        key={answer.id}
                        className={`bg-white mx-2 ${
                          question.allUserAnswers.find(
                            (userAnswer) => userAnswer.id === answer.id
                          )
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        <a>{answer.answerText}</a>
                        <a> Skiriami balai: {answer.points}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </>
      )}
    </UI>
  );
};

export default CheckQuiz;

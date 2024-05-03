import { useEffect, useState } from "react";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import ServerPaths from "../../../context/ServerPaths";
const CheckGrades = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [grades, setGrades] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          ServerPaths.AssignedRoutes.TEACHER_QUIZZES,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setQuizzes(response.data.quizzes);
        setGrades(response.data.grades);
      } catch (error) {
        console.error("Klaida gaunant mokytojo testus:", error);
      }
    };

    fetchQuizzes();
  }, [user.accessToken]);

  const removeGrade = async (quizId, userId) => {
    try {
      await axios.delete(
        ServerPaths.AssignedRoutes.REMOVE_GRADE(quizId, userId),
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setGrades((prevGrades) =>
        prevGrades.filter(
          (grade) => !(grade.quizId === quizId && grade.userId === userId)
        )
      );
    } catch (error) {
      console.error("Klaida šalinant pažymį:", error);
    }
  };

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
              <h2 className="py-2 text-center">Testų įvertinimai</h2>
              {quizzes.map((quiz) => (
                <div
                  className="card mb-4 px-5 mx-5 py-4"
                  key={quiz.id}
                  style={{
                    background: "rgba(78, 174, 18, 0.878)",
                    border: "none",
                    borderRadius: "30px",
                  }}
                >
                  <div className="card-header px-5  rounded-pill">
                    <h3 className="card-title text-center">{quiz.title}</h3>
                  </div>
                  <div className="card-body">
                    {grades
                      .filter((grade) => grade.quizId === quiz.id)
                      .map((grade) => (
                        <div
                          className="row mb-2 py-2 px-1"
                          style={{
                            background: "rgba(78, 174, 68)",
                            border: "none",
                            borderRadius: "30px",
                          }}
                          key={grade.userId}
                        >
                          <p>Mokinys: {grade.User.username}</p>
                          <p>Įvertinimas: {grade.score}</p>
                          <div className="list-group-item d-flex justify-content-between align-items-center ">
                            <Link
                              to={`/valdymas/mokytojas/tvarkyti/grupes/įvertinimai/${quiz.id}/${grade.userId}`}
                              className="btn btn-primary m-1"
                            >
                              Peržiūrėti testą
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => removeGrade(quiz.id, grade.userId)}
                            >
                              Pašalinti pažymį
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
};

export default CheckGrades;

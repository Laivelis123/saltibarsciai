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
      <h2 className="mb-4">Testų įvertinimai</h2>
      {quizzes.map((quiz) => (
        <div className="card mb-4" key={quiz.id}>
          <div className="card-header">
            <h3 className="card-title">{quiz.title}</h3>
          </div>
          <div className="card-body">
            {grades
              .filter((grade) => grade.quizId === quiz.id)
              .map((grade) => (
                <div className="row mb-2" key={grade.userId}>
                  <div className="col">
                    <p>Mokinys: {grade.User.username}</p>
                    <p>Įvertinimas: {grade.score}</p>
                    <Link
                      to={`/valdymas/mokytojas/tvarkyti/grupes/įvertinimai/${quiz.id}/${grade.userId}`}
                      className="btn btn-primary"
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
    </UI>
  );
};

export default CheckGrades;

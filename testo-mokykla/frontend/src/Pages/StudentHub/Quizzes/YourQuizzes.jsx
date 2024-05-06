import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import UI from "../../../components/UI/UI";
import ServerPaths from "../../../context/ServerPaths";
function YourQuizzes() {
  const { user } = useAuth();
  const [userQuizzes, setUserQuizzes] = useState([]);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        const response = await axios.get(
          ServerPaths.AssignedRoutes.MY_QUIZZES,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setUserQuizzes(response.data.userQuizzes);
      } catch (error) {
        console.error("Klaida gaunant studentui priskirtus testus:", error);
      }
    };
    fetchUserQuizzes();
  }, [user.accessToken]);

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
              <h2>Atliekami testai</h2>
              <div>
                {userQuizzes.map((userQuiz) => (
                  <div
                    key={userQuiz.id}
                    className="card my-3 mx-5"
                    style={{
                      backgroundColor: "rgba(78, 174, 18, 0.878)",
                      border: "none",
                      borderRadius: "30px",
                    }}
                  >
                    <div className="card-body">
                      <h3 className="card-title">{userQuiz.Quiz.title}</h3>
                      {userQuiz.submitted ? (
                        <p>Testas jau pateiktas</p>
                      ) : (
                        <div>
                          {userQuiz.Quiz && (
                            <div>
                              {userQuiz.Quiz.categoryAlias && (
                                <p>
                                  Kategorija: {userQuiz.Quiz.categoryAlias.name}
                                </p>
                              )}
                              {userQuiz.Quiz.Creator && (
                                <p>Sukurta: {userQuiz.Quiz.Creator.username}</p>
                              )}
                              {userQuiz.Quiz.Questions && (
                                <p>
                                  Klausimų kiekis:{" "}
                                  {userQuiz.Quiz.Questions.length}
                                </p>
                              )}
                              <Link
                                to={`/valdymas/mokinys/testai/daryti/${userQuiz.Quiz.id}`}
                                className="btn btn-primary"
                              >
                                Laikyti testą
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
}

export default YourQuizzes;

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UI from "../../../components/UI/UI";
import { Link } from "react-router-dom";
import ServerPaths from "../../../context/ServerPaths";
import { jwtDecode } from "jwt-decode";
function DoneQuizzes() {
  const { user, loading, setLoading } = useAuth();
  const [userGrades, setUserGrades] = useState([]);
  useEffect(() => {
    const fetchDoneQuizzes = async () => {
      try {
        if (!user) console.log("ner");
        setLoading(true);
        const response = await axios.get(
          ServerPaths.AssignedRoutes.DONE_QUIZZES,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setUserGrades(response.data.userGrades);
      } catch (error) {
        console.error("Klaida gaunant baigtus testus:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoneQuizzes();
  }, [user]);

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
              <h2 className="mb-4">Baigti testai</h2>
              <div className="row px-5">
                {!loading &&
                  userGrades &&
                  userGrades.map((userGrade) => (
                    <div key={userGrade.id} className="col-md-6 mb-3">
                      <div
                        className="card"
                        style={{ background: "none", border: "none" }}
                      >
                        <div
                          className="card-body"
                          style={{
                            borderRadius: "30px",
                            backgroundColor: "rgba(78, 174, 18, 0.878)",
                          }}
                        >
                          <h5 className="card-title">{userGrade.Quiz.title}</h5>
                          {userGrade.Quiz.categoryAlias && (
                            <p className="card-text">
                              <strong>Kategorija:</strong>{" "}
                              {userGrade.Quiz.categoryAlias.name}
                            </p>
                          )}
                          <p className="card-text">
                            <strong>Mokytojas:</strong>{" "}
                            {userGrade.Quiz.Creator.username}
                          </p>
                          <p className="card-text">
                            <strong>Įvertinimas:</strong> {userGrade.score}%
                          </p>
                          <Link
                            to={`/valdymas/mokinys/ivertinimai/${
                              userGrade.Quiz.id
                            }/${jwtDecode(user.accessToken).id}`}
                            className="btn btn-primary"
                          >
                            Peržiūrėti
                          </Link>
                        </div>
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

export default DoneQuizzes;

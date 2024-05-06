import { useState, useEffect, useCallback } from "react";
import UI from "../../../components/UI/UI";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ServerPaths from "../../../context/ServerPaths";
function EditQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editedQuizNames, setEditedQuizNames] = useState({});
  const [editedQuizCategory, setEditedQuizCategory] = useState("");
  const { user, setLoading, loading } = useAuth();
  const fetchQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(ServerPaths.QuizRoutes.MY_QUIZZES, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setQuizzes(response.data.quizzes);

      const initialEditedQuizNames = {};
      response.data.quizzes.forEach((quiz) => {
        initialEditedQuizNames[quiz.id] = quiz.title;
      });
      setEditedQuizNames(initialEditedQuizNames);
    } catch (error) {
      console.error("Klaida gaunant testus:", error);
    } finally {
      setLoading(false);
    }
  }, [user.accessToken, setLoading, setQuizzes, setEditedQuizNames]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          ServerPaths.CategoryRoutes.ALL_CATEGORIES,
          { headers: { Authorization: `Bearer ${user.accessToken}` } }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Klaida gaunant kategorijas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
    fetchCategories();
  }, [user.accessToken, fetchQuizzes, setLoading]);
  const handleInputChange = (e, quizId) => {
    const newValue = e.target.value;
    setEditedQuizNames((prev) => ({
      ...prev,
      [quizId]: newValue,
    }));
  };

  const handleCategoryChange = (e, dropdownId) => {
    const newValue = e.target.value;
    setEditedQuizCategory((prev) => ({
      ...prev,
      [dropdownId]: newValue,
    }));
  };

  const handleRemoveQuiz = async (quizId) => {
    try {
      setLoading(true);
      await axios.delete(ServerPaths.QuizRoutes.DELETE_QUIZ(quizId), {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      fetchQuizzes();
    } catch (error) {
      console.error("Klaida šalinant testą:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditQuiz = async (quizId, newName, newCategory) => {
    if (!newName.trim() && !newCategory) {
      console.error("Kategorija arba pavadinimas turi būti užpildyti.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        ServerPaths.QuizRoutes.UPDATE_QUIZ(quizId),
        { name: newName, category: newCategory },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
    } catch (error) {
      console.error("Klaida redaguojant testą:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UI>
      <div className="container my-4 ">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div
              className="my-5 py-4 card"
              style={{
                borderRadius: "30px",
                backgroundColor: "rgba(78, 174, 18, 0.878)",
              }}
            >
              <h2 className="text-center">Redaguoti testus</h2>
              <ul
                className="list-group mx-2"
                style={{
                  backgroundColor: "rgba(78, 174, 18, 0.878)",
                  border: "none",
                  borderRadius: "30px",
                }}
              >
                {!loading &&
                  quizzes &&
                  quizzes.map((quiz) => (
                    <li
                      key={quiz.id}
                      className="list-group-item"
                      style={{ background: "none", border: "none" }}
                    >
                      <div>
                        <p>Pavadinimas:</p>
                        <input
                          type="text"
                          value={editedQuizNames[quiz.id]}
                          className="form-control mb-2 text-dark"
                          onChange={(e) => handleInputChange(e, quiz.id)}
                        />
                      </div>
                      <div>
                        <p>Kategorija: </p>
                        <p>
                          <select
                            value={
                              editedQuizCategory[quiz.id] || quiz.categoryId
                            }
                            onChange={(e) => handleCategoryChange(e, quiz.id)}
                            className="form-select"
                          >
                            <option disabled value="">
                              Pasirinkite kategoriją
                            </option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </p>

                        <div className="m-2">
                          <button
                            onClick={() => {
                              handleEditQuiz(
                                quiz.id,
                                editedQuizNames[quiz.id],
                                editedQuizCategory[quiz.id]
                              );
                            }}
                            className="btn btn-success mx-2 my-1 flex-grow-1"
                            style={{ minWidth: "200px", maxWidth: "400px" }}
                          >
                            Patvirtinti pakeitimus
                          </button>
                          <Link
                            to={`/valdymas/mokytojas/tvarkyti/testai/redaguoti/${quiz.id}`}
                            className="btn btn-primary mx-2 my-1 flex-grow-1"
                            style={{ minWidth: "200px", maxWidth: "400px" }}
                          >
                            Platesnis regavimas
                          </Link>

                          <button
                            onClick={() => handleRemoveQuiz(quiz.id)}
                            className="btn btn-danger mx-2 my-1 flex-grow-1"
                            style={{ minWidth: "200px", maxWidth: "400px" }}
                          >
                            Pašalinti testą
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
}

export default EditQuizzes;

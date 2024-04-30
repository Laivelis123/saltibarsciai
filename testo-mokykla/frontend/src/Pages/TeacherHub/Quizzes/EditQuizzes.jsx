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
      <div className="container mt-4">
        <h2 className="text-center">Redaguoti testus</h2>
        <div className="mt-3">
          <ul className="list-group">
            {!loading &&
              quizzes &&
              quizzes.map((quiz) => (
                <li key={quiz.id} className="list-group-item">
                  <div>
                    <p>Pavadinimas:</p>
                    <input
                      type="text"
                      value={editedQuizNames[quiz.id]}
                      className="form-control mb-2 bg-dark text-light"
                      onChange={(e) => handleInputChange(e, quiz.id)}
                    />
                  </div>
                  <div>
                    <p>Kategorija: </p>
                    <p>
                      <select
                        value={editedQuizCategory[quiz.id] || quiz.categoryId}
                        onChange={(e) => handleCategoryChange(e, quiz.id)}
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

                    <button
                      onClick={() => {
                        handleEditQuiz(
                          quiz.id,
                          editedQuizNames[quiz.id],
                          editedQuizCategory[quiz.id]
                        );
                      }}
                      className="btn btn-success mr-2"
                    >
                      Patvirtinti pakeitimus
                    </button>
                    <Link
                      to={`/valdymas/mokytojas/tvarkyti/testai/redaguoti/${quiz.id}`}
                      className="btn btn-primary mr-2"
                    >
                      Platesnis regavimas
                    </Link>

                    <button
                      onClick={() => handleRemoveQuiz(quiz.id)}
                      className="btn btn-danger"
                    >
                      Pašalinti testą
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </UI>
  );
}

export default EditQuizzes;

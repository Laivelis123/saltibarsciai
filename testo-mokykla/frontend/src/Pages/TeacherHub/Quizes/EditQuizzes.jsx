import React, { useState, useEffect } from "react";
import UI from "../../../components/UI/UI";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function EditQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editedQuizNames, setEditedQuizNames] = useState({});
  const [editedQuizCategory, setEditedQuizCategory] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categories/all",
          { headers: { Authorization: `Bearer ${user.accessToken}` } }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchQuizzes();
    fetchCategories();
  }, [user.accessToken]);
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/quizzes/my-quizzes",
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      setQuizzes(response.data.quizzes);

      // Initialize editedQuizNames with the titles of the quizzes
      const initialEditedQuizNames = {};
      response.data.quizzes.forEach((quiz) => {
        initialEditedQuizNames[quiz.id] = quiz.title;
      });
      setEditedQuizNames(initialEditedQuizNames);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
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
      await axios.delete(`http://localhost:3001/api/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      // Refresh quizzes after removal
      fetchQuizzes();
    } catch (error) {
      console.error("Error removing quiz:", error);
    }
  };

  const handleEditQuiz = async (quizId, newName, newCategory) => {
    // Check if both quiz name and category are empty
    if (!newName.trim() && !newCategory) {
      console.error("New quiz name and category are empty");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3001/api/quizzes/${quizId}`,
        { name: newName, category: newCategory }, // Pass both name and category values
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      // Refresh quizzes after editing
      fetchQuizzes();
    } catch (error) {
      console.error("Error editing quiz:", error);
    }
  };

  return (
    <UI>
      <div className="container mt-4">
        <h2 className="text-center">Redaguoti testus</h2>
        <div className="mt-3">
          <ul className="list-group">
            {quizzes.map((quiz) => (
              <li key={quiz.id} className="list-group-item">
                <div>
                  {/* Input field to edit quiz name */}
                  <p>Pavadinimas:</p>
                  <input
                    type="text"
                    value={editedQuizNames[quiz.id]}
                    className="form-control mb-2 bg-dark text-light"
                    onChange={(e) => handleInputChange(e, quiz.id)}
                  />
                </div>
                <div>
                  {/* Select field to edit quiz category */}
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

                  {/* Button to confirm changes */}
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

                  {/* Button to navigate to the quiz for different editing */}
                  <Link
                    to={`/valdymas/mokytojas/tvarkyti/testai/redaguoti/${quiz.id}`}
                    className="btn btn-primary mr-2"
                  >
                    Edit Group
                  </Link>

                  {/* Button to remove the quiz */}
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

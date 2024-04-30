import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UI from "../../../components/UI/UI";
import ServerPaths from "../../../context/ServerPaths";
function CreateQuiz() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        ServerPaths.CategoryRoutes.ALL_CATEGORIES,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Klaida gaunant kategorijas:", error);
    }
  };

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        ServerPaths.QuizRoutes.CREATE_QUIZ,
        { title, categoryId: selectedCategory },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      const { quiz } = response.data;
      navigate(`/valdymas/mokytojas/tvarkyti/testai/redaguoti/${quiz.id}`);
    } catch (error) {
      console.error("Klaida gaunant testą:", error);
    }
  };

  return (
    <UI>
      <div className="container mt-4">
        <h2>Kurti Testą</h2>
        <div className="mb-3">
          <form onSubmit={handleSubmitCreate}>
            <label htmlFor="title" className="form-label">
              Pavadinimas:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="category" className="form-label">
              Kategorija:
            </label>
            <select
              id="category"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Pasirinkite kategoriją</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary mt-2">
              Kurti Testą
            </button>
          </form>
        </div>
      </div>
    </UI>
  );
}

export default CreateQuiz;

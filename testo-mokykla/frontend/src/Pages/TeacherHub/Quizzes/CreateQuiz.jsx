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
  const [titleError, setTitleError] = useState("");
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
  const handleChangeTitle = (event) => {
    const value = event.target.value;
    setTitle(value);
    if (!value.trim()) {
      setTitleError("Pavadinimas negali būti tuščias");
    } else {
      setTitleError("");
    }
  };
  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    if (titleError || !title) {
      setTitleError("Pavadinimas negali būti tuščias");
      return;
    }
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
      <div className="container my-4 ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="my-5 py-4 card"
              style={{
                borderRadius: "30px",
                backgroundColor: "rgba(78, 174, 18, 0.878)",
              }}
            >
              <h2 className="px-3">Kurti Testą</h2>
              <form onSubmit={handleSubmitCreate}>
                <label htmlFor="title" className="form-label px-3">
                  Pavadinimas:
                </label>
                <div className="mx-3">
                  <input
                    type="text"
                    className={`form-control ${titleError ? "is-invalid" : ""}`}
                    id="title"
                    value={title}
                    onChange={handleChangeTitle}
                  />
                  {titleError && (
                    <div className="invalid-feedback">{titleError}</div>
                  )}
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
                </div>
                <div className="text-center">
                  {" "}
                  <button
                    type="submit"
                    className="btn btn-primary mt-2 py-2 px-1"
                  >
                    Kurti Testą
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
}

export default CreateQuiz;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";

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
        "http://localhost:3001/api/categories/all",
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/quizzes",
        { title, categoryId: selectedCategory },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      const { quiz } = response.data;
      navigate(`/valdymas/mokytojas/tvarkyti/testai/redaguoti/${quiz.id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import UI from "../../../components/UI/UI";
import EditPopup from "./EditPopup";
import { useAuth } from "../../../context/AuthContext";

const EditCategories = () => {
  const { user } = useAuth();
  const [myCategories, setMyCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [user.accessToken]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/categories/my",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      setMyCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleRemoval = async (categoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/categories/${categoryId}/remove`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      fetchCategories();
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    fetchCategories();
    setShowEditPopup(false);
    setSelectedCategory(null);
  };

  return (
    <UI>
      <div className="container mt-4">
        <h2>Redaguoti kategorijas</h2>
        {!loading &&
          myCategories.map((category) => (
            <div key={category.id} className="mb-3">
              <p>Pavadinimas: {category.name}</p>
              <p>
                Viršesnė kategorija:{" "}
                {category.parentId ? category.parent.name : "Nėra"}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoval(category.id)}
              >
                Pašalinti
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => handleEdit(category)}
              >
                Redaguoti
              </button>
            </div>
          ))}
        {showEditPopup && (
          <EditPopup category={selectedCategory} onClose={handleClosePopup} />
        )}
      </div>
    </UI>
  );
};

export default EditCategories;

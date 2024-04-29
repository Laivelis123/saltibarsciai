import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import "./EditPopup.css";

const EditPopup = ({ category, onClose }) => {
  const { user, fetchCategories, loading } = useAuth();
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [bulletPoints, setBulletPoints] = useState([]);
  const [newBulletPoint, setNewBulletPoint] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    fetchCategories(null, setCategories);
    setEditedCategory(category);
    setParentCategory(category.parentId);
    setCategoryName(category.name);
    setBulletPoints(
      category.bulletPoints ? JSON.parse(category.bulletPoints) : []
    );
  }, [user.accessToken, category]);

  const handleCategoryNameChange = (value) => {
    setCategoryName(value);
    setEditedCategory({ ...editedCategory, name: value });
  };

  const handleAddBulletPoint = () => {
    if (newBulletPoint.trim() !== "") {
      setBulletPoints([...bulletPoints, newBulletPoint.trim()]);
      setNewBulletPoint("");
    }
  };

  const handleRemoveBulletPoint = (index) => {
    const updatedBulletPoints = bulletPoints.filter((_, i) => i !== index);
    setBulletPoints(updatedBulletPoints);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/categories/${category.id}/update`,
        {
          name: categoryName,
          parentId: parentCategory,
          bulletPoints: JSON.stringify(bulletPoints),
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      onClose();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Redaguoti</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Kategorijos pavadinimas:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={categoryName}
              onChange={(e) => handleCategoryNameChange(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="parentId" className="form-label">
              Aukštesnė kategorija:
            </label>
            <select
              className="form-select"
              id="parentCategory"
              name="parentId"
              value={parentCategory ?? ""}
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option value="">Parinkti kategorijos šaknį</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="bulletPoints" className="form-label">
              Punktai:
            </label>
            <ul className="list-group mt-2 text-black bg-white">
              {!loading &&
                bulletPoints.length > 0 &&
                bulletPoints.map((point, index) => (
                  <li
                    key={index}
                    className="nav-item text-black bg-white"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      value={point}
                      onChange={(e) => {
                        const updatedBulletPoints = [...bulletPoints];
                        updatedBulletPoints[index] = e.target.value;
                        setBulletPoints(updatedBulletPoints);
                      }}
                    />
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => handleRemoveBulletPoint(index)}
                    ></button>
                  </li>
                ))}

              <li>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={newBulletPoint}
                    onChange={(e) => setNewBulletPoint(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleAddBulletPoint}
                  >
                    Pridėti
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Išsaugoti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;

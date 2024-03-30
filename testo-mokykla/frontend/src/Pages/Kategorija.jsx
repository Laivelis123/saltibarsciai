import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../components/UI";

const Kategorija = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [bulletPoints, setBulletPoints] = useState([]);
  const [newBulletPoint, setNewBulletPoint] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3001/api/data/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
          if (response.data.accountType !== "teacher") {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleBulletPointChange = (event) => {
    setNewBulletPoint(event.target.value);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.post(
          "http://localhost:3001/api/categories/create",
          {
            name: categoryName,
            bulletPoints: bulletPoints,
            parentId: parentCategory, // Send parentId instead of parentCategory
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Category created:", response.data.category);
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <UI>
      <div className="container mt-4">
        <h2>Create a Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              value={categoryName}
              onChange={handleCategoryNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="parentCategory" className="form-label">
              Parent Category:
            </label>
            <select
              className="form-select"
              id="parentCategory"
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option value="">Select Parent Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="bulletPoints" className="form-label">
              Bullet Points:
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="bulletPoints"
                value={newBulletPoint}
                onChange={handleBulletPointChange}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleAddBulletPoint}
              >
                Add
              </button>
            </div>
            <ul className="list-group mt-2">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {point}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => handleRemoveBulletPoint(index)}
                  ></button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Category
          </button>
        </form>
      </div>
    </UI>
  );
};

export default Kategorija;

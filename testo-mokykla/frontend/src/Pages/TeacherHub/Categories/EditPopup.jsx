import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import "./EditPopup.css";
import PropTypes from "prop-types";
import ServerPaths from "../../../context/ServerPaths";
const EditPopup = ({ category, onClose }) => {
  const { user, loading, setLoading } = useAuth();
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [bulletPoints, setBulletPoints] = useState([]);
  const [newBulletPoint, setNewBulletPoint] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        if (user) {
          let url = ServerPaths.CategoryRoutes.FILTER_CATEGORIES;
          const pathname = window.location.pathname;
          if (pathname === "/") {
            url = ServerPaths.CategoryRoutes.FILTER_CATEGORIES_NO_PARENT;
          }
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          });
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Klaida gaunant kategorijas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
    setEditedCategory(category);
    setParentCategory(category.parentId);
    setCategoryName(category.name);
    setBulletPoints(
      category.bulletPoints ? JSON.parse(category.bulletPoints) : []
    );
  }, [user.accessToken, category, setLoading, user]);

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
        ServerPaths.CategoryRoutes.UPDATE_CATEGORY(category.id),
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
      console.error("Klaida redaguojant kategoriją:", error);
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
EditPopup.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    parentId: PropTypes.number,
    bulletPoints: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default EditPopup;

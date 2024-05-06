import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";
import ServerPaths from "../../../context/ServerPaths";
const CategoryCreate = () => {
  const { user, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [catNameError, setCatNameError] = useState("");
  const [bulletPoints, setBulletPoints] = useState([]);
  const [newBulletPoint, setNewBulletPoint] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);

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
  }, [setLoading, user]);

  const handleCategoryNameChange = (event) => {
    const value = event.target.value;
    setCategoryName(value);
    if (!value.trim()) {
      setCatNameError("Pavadinimas negali būti tuščias");
    } else {
      setCatNameError("");
    }
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
    if (catNameError || !categoryName) {
      setCatNameError("Pavadinimas negali būti tuščias");
      return;
    }
    try {
      const response = await axios.post(
        ServerPaths.CategoryRoutes.CREATE_CATEGORY,
        {
          name: categoryName,
          bulletPoints: bulletPoints,
          parentId: parentCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (response.data) {
        navigate(`/category/${response.data.category.id}`);
      }
    } catch (error) {
      console.error("Klaida kuriant kategoriją: ", error);
    }
  };

  return (
    <UI>
      {!loading && (
        <div className="container my-4 ">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="my-5 py-4 card text-center"
                style={{
                  borderRadius: "30px",
                  backgroundColor: "rgba(78, 174, 18, 0.878)",
                }}
              >
                <h2>Sukurti kategorija</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mx-5">
                    <label htmlFor="categoryName" className="form-label">
                      Kategorijos pavadinimas:
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        catNameError ? "is-invalid" : ""
                      }`}
                      id="categoryName"
                      value={categoryName}
                      onChange={handleCategoryNameChange}
                    />
                    {catNameError && (
                      <div className="invalid-feedback">{catNameError}</div>
                    )}
                  </div>
                  <div className="mb-3 mx-5">
                    <label htmlFor="parentCategory" className="form-label">
                      Kategorijos grupė:
                    </label>
                    <select
                      className="form-select"
                      id="parentCategory"
                      value={parentCategory}
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
                  <div className="mb-3 mx-5">
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
                        className="btn bg-primary text-white"
                        onClick={handleAddBulletPoint}
                      >
                        Pridėti
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
                  <button type="submit" className="btn btn-primary px-4 py-2">
                    Kurti
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </UI>
  );
};

export default CategoryCreate;

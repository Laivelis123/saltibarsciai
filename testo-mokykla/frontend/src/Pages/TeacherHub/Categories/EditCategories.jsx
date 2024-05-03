import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import UI from "../../../components/UI/UI";
import EditPopup from "./EditPopup";
import { useAuth } from "../../../context/AuthContext";
import ServerPaths from "../../../context/ServerPaths";
const EditCategories = () => {
  const { user } = useAuth();
  const [myCategories, setMyCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        ServerPaths.CategoryRoutes.MY_CATEGORIES,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      setMyCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Klaida gaunant kategorijas:", error);
    }
  }, [user.accessToken]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleRemoval = async (categoryId) => {
    try {
      await axios.delete(
        ServerPaths.CategoryRoutes.DELETE_CATEGORY(categoryId),
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      fetchCategories();
    } catch (error) {
      console.error("Klaida šalinant kategoriją:", error);
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
              <h2 className="text-center">Redaguoti kategorijas</h2>
              {!loading &&
                myCategories.map((category) => (
                  <div
                    key={category.id}
                    className="mb-3 mx-3 px-3 h5"
                    style={{
                      borderRadius: "30px",
                      backgroundColor: "rgba(78, 174, 18, 0.878)",
                    }}
                  >
                    Pavadinimas: {category.name}
                    <div>
                      Viršesnė kategorija:{" "}
                      {category.parentId ? category.parent.name : "Nėra "}
                    </div>
                    <div className="px-2 mx-2 text-center my-2">
                      <button
                        className="btn btn-primary m-auto mb-2"
                        onClick={() => handleEdit(category)}
                      >
                        Redaguoti
                      </button>
                      <button
                        className="btn btn-danger mx-3"
                        onClick={() => handleRemoval(category.id)}
                      >
                        Pašalinti
                      </button>
                    </div>
                  </div>
                ))}
              {showEditPopup && (
                <EditPopup
                  category={selectedCategory}
                  onClose={handleClosePopup}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
};

export default EditCategories;

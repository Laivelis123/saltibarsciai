import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UI from "../../components/UI";
import styles from "./categoryTemplate.module.css";

const CategoryTemplate = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/categories/${categoryId}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleGoBack = () => {
    // If there is a parent category, navigate back to its route
    if (category && category.parentId) {
      navigate(`/category/${category.parentId}`);
    } else {
      // If there is no parent category, navigate to the main page
      navigate("/");
    }
  };

  return (
    <UI>
      {category ? (
        <div className={`container ${styles.containerColor}`}>
          <p>Kategorijos pavadinimas: {category.name}</p>
          <p>Šią kategorija sukūrė: {category.User.username}</p>
          <ul className={`nav flex-column ${styles.categoryColor}`}>
            {category.bulletPoints &&
              JSON.parse(category.bulletPoints).map((point, index) => (
                <li key={index} className="nav-item">
                  • {point}
                </li>
              ))}
          </ul>
          <div className={`container text-dark ${styles.containerColor}`}>
            <button className={styles.firstBtn}>Bandomasis testas</button>
            <button className={styles.nextBtn}>Mokytojo paskirti testai</button>
            <button onClick={handleGoBack} className={styles.backBtn}>
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </UI>
  );
};

export default CategoryTemplate;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";
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
        console.error("Klaida gaudant kategoriją:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleGoBack = () => {
    if (category && category.parentId) {
      navigate(`/category/${category.parentId}`);
    } else {
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
              Atgal
            </button>
          </div>
        </div>
      ) : (
        <div>Krauna...</div>
      )}
    </UI>
  );
};

export default CategoryTemplate;

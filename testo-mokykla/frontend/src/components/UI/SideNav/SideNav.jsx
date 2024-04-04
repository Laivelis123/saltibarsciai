import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./sidenav.module.css";
import SearchBar from "../SearchBar/SearchBar";

const SideNav = ({ filterText, setFilterText }) => {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let url = "http://localhost:3001/api/categories/filter";
        if (categoryId) {
          url = `http://localhost:3001/api/categories/${categoryId}/children`;
        } else if (location.pathname === "/") {
          url = "http://localhost:3001/api/categories/filter?parentId=null";
        }
        const response = await axios.get(url);
        setCategories(response.data);
      } catch (error) {
        console.error("Klaida gaunant kategorijas:", error);
      }
    };

    fetchCategories();
  }, [categoryId, location.pathname]);

  return (
    <nav className="position-fixed top-0 start-0 bottom-0 bg-dark p-3 d-lg-block d-xl-block">
      <div className={`text-dark px-3 py-2 mb-3 ${styles.titleText}`}>
        Kategorijų filtras
      </div>
      <SearchBar filterText={filterText} onChange={setFilterText} />
      <ul className="nav flex-column bg-dark">
        {categories
          .filter((category) =>
            category.name.toLowerCase().includes(filterText.toLowerCase())
          )
          .map((category) => (
            <li key={category.id} className="nav-item">
              <Link
                to={`/category/${category.id}`}
                className={`nav-link ${styles.navColor} ${styles.listItem}`}
              >
                {category.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default SideNav;

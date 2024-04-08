import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext";
import styles from "./sidenav.module.css";
import SearchBar from "../SearchBar/SearchBar";

const SideNav = ({ filterText, setFilterText }) => {
  const { fetchCategories } = useAuth();
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    fetchCategories(categoryId, setCategories);
  }, [categoryId]);

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

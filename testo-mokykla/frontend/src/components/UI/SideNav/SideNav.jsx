import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext";
import styles from "./sidenav.module.css";
import SearchBar from "../SearchBar/SearchBar";

const SideNav = ({
  filterText,
  setFilterText,
  showSidebar,
  setShowSidebar,
}) => {
  const { fetchCategories } = useAuth();
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    fetchCategories(categoryId, setCategories);
  }, [categoryId]);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`bg-dark ${styles.sideNav} pt-4 flex-wrap`}>
      <div className="pt-2 px-2">
        <div
          className={`list-group-item list-group-item-action rounded-pill ${styles.titleText}`}
        >
          Kategorijų filtras{" "}
          {window.innerWidth <= 768 && (
            <div className="px-5 py-1">
              <div
                id="toggleButton"
                className={`rounded-pill ${styles.toggleButton}`}
                onClick={toggleSidebar}
              >
                {"ΞΞ"}
              </div>
            </div>
          )}
        </div>
      </div>
      <SearchBar filterText={filterText} onChange={setFilterText} />
      <ul className="bg-dark list-group-item list-group-item-action">
        {categories
          .filter((category) =>
            category.name.toLowerCase().includes(filterText.toLowerCase())
          )
          .map((category) => (
            <div key={category.id} className="pt-2 px-2">
              <li className="list-group-item list-group-item-action rounded-pill pt-2">
                <Link
                  to={`/category/${category.id}`}
                  className={`list-group-item list-group-item-action px-3 ${styles.navColor} `}
                >
                  {category.name}
                </Link>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default SideNav;

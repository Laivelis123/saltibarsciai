import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom"; // Import useLocation hook
import axios from "axios";
import styles from "./sidenav.module.css";
import SearchBar from "../SearchBar/SearchBar";

const SideNav = ({ filterText, setFilterText }) => {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let url = "http://localhost:3001/api/categories/filter";
        if (categoryId) {
          // Fetch children categories if categoryId is provided
          url = `http://localhost:3001/api/categories/${categoryId}/children`;
        } else if (location.pathname === "/") {
          // Only fetch categories if user is logged in and not in the home page
          // Fetch only categories without a parent (parentId is null)
          url = "http://localhost:3001/api/categories/filter?parentId=null";
        }
        const response = await axios.get(url);
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [categoryId, location.pathname]); // Add location.pathname to dependency array

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

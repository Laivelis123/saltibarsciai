import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ServerPaths from "../../../context/ServerPaths";
import { useAuth } from "../../../context/AuthContext";
import styles from "./sidenav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import PropTypes from "prop-types";
const SideNav = ({
  filterText,
  setFilterText,
  showSidebar,
  setShowSidebar,
}) => {
  const { user, loading, setLoading } = useAuth();
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        if (user) {
          let url = ServerPaths.CategoryRoutes.FILTER_CATEGORIES;

          if (categoryId) {
            url = ServerPaths.CategoryRoutes.CHILDREN_CATEGORIES(categoryId);
          } else {
            const pathname = window.location.pathname;
            if (pathname === "/") {
              url = ServerPaths.CategoryRoutes.FILTER_CATEGORIES_NO_PARENT;
            }
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
    fetchCategories(categoryId);
  }, [categoryId, setLoading, user]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div
      className={`bg-dark ${styles.sideNav} pt-4 flex-wrap`}
      style={{ maxWidth: "750px" }}
    >
      <div className="pt-2 px-2">
        <div
          className={`h2  list-group-item list-group-item-action rounded-pill ${styles.titleText}`}
        >
          <div className="px-4 py-1">
            {user ? "Kategorijų filtras" : "Prisijunkite prie sistemos"}
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
      </div>
      {user && <SearchBar filterText={filterText} onChange={setFilterText} />}
      <ul className="bg-dark list-group-item list-group-item-action">
        {!loading &&
          categories
            .filter((category) =>
              category.name.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((category) => (
              <div key={category.id} className="pt-2 px-2">
                <li className="h3 list-group-item list-group-item-action rounded-pill pt-2">
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
SideNav.propTypes = {
  filterText: PropTypes.string.isRequired,
  setFilterText: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
};
export default SideNav;

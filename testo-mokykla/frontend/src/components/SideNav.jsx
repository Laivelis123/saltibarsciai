import React, { useEffect, useState } from "react";
import styles from "./sidenav.module.css";
import { Link } from "react-router-dom";

export default function SideNav({ categories }) {
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  return (
    <div className={styles.Snav}>
      {filteredCategories.map((category) => (
        <div key={category.name} className={styles.side_block}>
          <Link
            className={styles.side_link}
            to={`/${category.name.toLowerCase()}`}
          >
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

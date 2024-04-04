import React from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({ filterText, onChange }) => {
  return (
    <div>
      <div className={styles.search_input}>
        <img src="https://img.icons8.com/search" alt="Icon" />
        <input
          id="input_"
          type="text"
          placeholder="Ieškoti"
          value={filterText}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

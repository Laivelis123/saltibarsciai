import PropTypes from "prop-types";
import styles from "./searchBar.module.css";

const SearchBar = ({ filterText, onChange }) => {
  return (
    <div className="pt-2 m-2">
      <div className={`${styles.search_input}`}>
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

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;

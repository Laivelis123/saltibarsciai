import React from "react";
import "./menu.module.css";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export default function Menu({ filterText, handleFilterChange }) {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Pagrindinis</Link>
        </li>
        <li>
          <a>Naujienos</a>
        </li>
        <li>
          <Link to="/prisijungimas">Prisijungimas</Link>
        </li>
        <li>
          <Link to="/registracija">Registracija</Link>
        </li>
        <li>
          <a>Apie</a>
        </li>
        <li>
          <a>Kontaktai</a>
        </li>
      </ul>
      <SearchBar filterText={filterText} onChange={handleFilterChange} />
    </>
  );
}

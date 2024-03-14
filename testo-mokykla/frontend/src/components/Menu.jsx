import React from "react";
import "./menu.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { SearchBar } from "./SearchBar";

export default function Menu({ filterText, handleFilterChange }) {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Pagrindinis</Link>
        </li>
        <li>
          <Link to="/naujienos">Naujienos</Link>
        </li>
        <li>
          <Link to="/prisijungimas">Prisijungimas</Link>
        </li>
        <li>
          <Link to="/registracija">Registracija</Link>
        </li>
        <li>
          <Link to="/apie">Apie</Link>
        </li>
        <li>
          <Link to="/kontaktai">Kontaktai</Link>
        </li>
      </ul>
      <SearchBar filterText={filterText} onChange={handleFilterChange} />
    </>
  );
}

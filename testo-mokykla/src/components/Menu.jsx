import "./menu.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Pagrindinis</Link>
      </li>
      <li>
        <a>Naujienos</a>
      </li>
      <li>
        <Link to="/login">Prisijungimas</Link>
      </li>
      <li>
        <Link to="/register">Registracija</Link>
      </li>
      <li>
        <a>Apie</a>
      </li>
      <li>
        <a>Kontaktai</a>
      </li>
    </ul>
  );
}

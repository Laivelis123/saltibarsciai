import styles from "./menu.module.css";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
export default function Header() {
    return (
        <ul>
            <li>
                <Link to="/">Pagrindinis</Link>
            </li>
            <li>
                <Link to="/naujienos">Naujienos</Link>
            </li>
            <li>
                <Link to="/apie">Apie</Link>
            </li>
            <li>
                <Link to="/kontaktai">Kontaktai</Link>
            </li>
            <li>
                <SearchBar />
            </li>
            <li>
                <a>Prisijungimas</a>
            </li>
            <li>
                <a>Registracija</a>
            </li>
        </ul>
    );
}

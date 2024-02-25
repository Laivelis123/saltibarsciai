import styles from "./menu.module.css";
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
                <a>Prisijungimas</a>
            </li>
            <li>
                <a>Registracija</a>
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

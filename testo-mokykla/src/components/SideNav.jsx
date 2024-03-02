import styles from "./sidenav.module.css";
import { Link } from "react-router-dom";
export default function SideNav() {
    return (
        <div className={styles.Snav}>
            <div className={styles.side_block}><Link to="/fizika">Fizika</Link></div>
            <div className={styles.side_block}><Link to="/chemija">Chemija</Link></div>
            <div className={styles.side_block}><Link to="/anglu">Anglu</Link></div>
            <div className={styles.side_block}><Link to="/lietuviu">Lietuviu</Link></div>
            <div className={styles.side_block}><Link to="/biologija">Biologija</Link></div>
        </div>
    );
}

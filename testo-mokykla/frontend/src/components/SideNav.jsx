import styles from "./sidenav.module.css";
import { Link } from "react-router-dom";
export default function SideNav() {
    return (
        <div className={styles.Snav}>
            <div className={styles.side_block}><Link to="/fizika">Fizika</Link></div>
            <div className={styles.side_block}>2</div>
            <div className={styles.side_block}>3</div>
            <div className={styles.side_block}>4</div>
        </div>
    );
}

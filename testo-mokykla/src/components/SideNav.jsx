import styles from "./sidenav.module.css";
export default function SideNav() {
  return (
    <div className={styles.Snav}>
      <div className={styles.side_block}>1</div>
      <div className={styles.side_block}>2</div>
      <div className={styles.side_block}>3</div>
      <div className={styles.side_block}>4</div>
    </div>
  );
}

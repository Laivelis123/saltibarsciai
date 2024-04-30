import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={`${styles.footerColor}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>
              KTU IFF-2/8 grupės Vite React JS projektas su Node.js ir MySQL
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; {new Date().getFullYear()} Testo Mokykla.</p>
      </div>
    </footer>
  );
}

export default Footer;

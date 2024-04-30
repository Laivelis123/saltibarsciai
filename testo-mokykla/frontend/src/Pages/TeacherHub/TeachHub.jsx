import { Link } from "react-router-dom";
import UI from "../../components/UI/UI";
function TeachHub() {
  return (
    <UI>
      <div className="container mt-4">
        <h2>Mokytojų tvarkyklė</h2>
        <div className="d-grid gap-2">
          <Link
            to="/valdymas/mokytojas/tvarkyti/kategorijas"
            className="btn btn-primary"
          >
            Tvarkyti Kategorijas
          </Link>
          <Link
            to="/valdymas/mokytojas/tvarkyti/testus"
            className="btn btn-primary"
          >
            Tvarkyti Testus
          </Link>
          <Link
            to="/valdymas/mokytojas/tvarkyti/grupes"
            className="btn btn-primary"
          >
            Tvarkyti Grupes
          </Link>
        </div>
      </div>
    </UI>
  );
}

export default TeachHub;

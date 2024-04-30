import UI from "../../../components/UI/UI";
import { Link } from "react-router-dom";
function ManageCategories() {
  return (
    <UI>
      <div className="container mt-4">
        <h2>Kategorijų tvarkyklė</h2>
        <div className="d-grid gap-2">
          <Link
            to="/valdymas/mokytojas/tvarkyti/kategorijas/kurti"
            className="btn btn-primary"
          >
            Kurti Kategorija
          </Link>
          <Link
            to="/valdymas/mokytojas/tvarkyti/kategorijas/redaguoti"
            className="btn btn-primary"
          >
            Redaguoti Kategorijas
          </Link>
          <Link to="/" className="btn btn-primary">
            Peržiūrėti Kategorija
          </Link>
        </div>
      </div>
    </UI>
  );
}

export default ManageCategories;

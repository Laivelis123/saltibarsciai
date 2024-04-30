import { Link } from "react-router-dom";
import UI from "../../../components/UI/UI";
function ManageGroups() {
  return (
    <UI>
      <div className="container mt-4">
        <h2>Grupių tvarkyklė</h2>
        <div className="d-grid gap-2">
          <Link
            to="/valdymas/mokytojas/tvarkyti/grupes/kurti"
            className="btn btn-primary"
          >
            Kurti Grupę
          </Link>
          <Link
            to="/valdymas/mokytojas/tvarkyti/grupes/redaguoti"
            className="btn btn-primary"
          >
            Redaguoti Grupes
          </Link>
          <Link
            to="/valdymas/mokytojas/tvarkyti/grupes/įvertinimai"
            className="btn btn-primary"
          >
            Peržiūrėti Įvertinimus
          </Link>
        </div>
      </div>
    </UI>
  );
}

export default ManageGroups;

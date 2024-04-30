import UI from "../../../components/UI/UI";
import { Link } from "react-router-dom";
function ManageQuizes() {
  return (
    <UI>
      <div className="container mt-4">
        <h2>Testų tvarkyklė</h2>
        <div className="d-grid gap-2">
          <Link
            to="/valdymas/mokytojas/tvarkyti/testai/kurti"
            className="btn btn-primary"
          >
            Kurti Testą
          </Link>
          <Link
            to="/valdymas/mokytojas/tvarkyti/testai/peržiūra"
            className="btn btn-primary"
          >
            Redaguoti Testus
          </Link>
        </div>
      </div>
    </UI>
  );
}

export default ManageQuizes;

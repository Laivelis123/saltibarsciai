import { Link } from "react-router-dom";
import UI from "../../components/UI/UI";
function StudentHub() {
  return (
    <UI>
      <div className="container mt-4">
        <h2>Mokinių tvarkyklė</h2>
        <div className="d-grid gap-2">
          <Link to="/" className="btn btn-primary">
            Priskirti Testai
          </Link>
          <Link to="/" className="btn btn-primary">
            Įvertinimai
          </Link>
          <Link to="/valdymas/mokinys/grupės" className="btn btn-primary">
            Grupės
          </Link>
        </div>
      </div>
    </UI>
  );
}

export default StudentHub;

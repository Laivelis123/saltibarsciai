import React from "react";
import UI from "../../../components/UI/UI";
import { Link } from "react-router-dom";
function ManageQuizes() {
  return (
    <UI>
      <div className="container mt-4">
        <h2>Testų tvarkyklė</h2>
        <div className="d-grid gap-2">
          <Link to="/" className="btn btn-primary">
            Kurti Testą
          </Link>
          <Link to="/" className="btn btn-primary">
            Redaguoti Testą
          </Link>
          <Link to="/" className="btn btn-primary">
            Peržiūrėti Testą
          </Link>
        </div>
      </div>
    </UI>
  );
}

export default ManageQuizes;

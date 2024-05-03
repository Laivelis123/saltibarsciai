import UI from "../../../components/UI/UI";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
function ManageQuizes() {
  return (
    <UI>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div>
            <h2 className="text-center">Testų tvarkyklė</h2>
            <ul
              className="list-unstyled d-flex flex-wrap justify-content-center"
              style={{ background: "none" }}
            >
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokytojas/tvarkyti/testai/kurti"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faFileCirclePlus} size="4x" />
                    <h5>Kurti testus</h5>
                  </div>
                </Link>
              </li>
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokytojas/tvarkyti/testai/peržiūra"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faCalculator} size="4x" />
                    <h5>Redaguoti testus</h5>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </UI>
  );
}

export default ManageQuizes;

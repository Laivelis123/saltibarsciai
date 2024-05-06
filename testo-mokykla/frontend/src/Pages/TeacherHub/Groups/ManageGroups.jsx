import { Link } from "react-router-dom";
import UI from "../../../components/UI/UI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faScrewdriverWrench,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
function ManageGroups() {
  return (
    <UI>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div>
            <h2 className="text-center">Grupių tvarkyklė</h2>
            <ul
              className="list-unstyled d-flex flex-wrap justify-content-center"
              style={{ background: "none" }}
            >
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokytojas/tvarkyti/grupes/kurti"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faAddressBook} size="4x" />
                    <h5>Kurti Grupę</h5>
                  </div>
                </Link>
              </li>
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokytojas/tvarkyti/grupes/redaguoti"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faScrewdriverWrench} size="4x" />
                    <h5>Redaguoti grupes</h5>
                  </div>
                </Link>
              </li>
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokytojas/tvarkyti/grupes/įvertinimai"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faStar} size="4x" />
                    <h5>Peržiūrėti Įvertinimus</h5>
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

export default ManageGroups;

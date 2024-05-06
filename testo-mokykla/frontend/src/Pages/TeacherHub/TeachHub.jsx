import { Link } from "react-router-dom";
import UI from "../../components/UI/UI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faSchool,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

function TeachHub() {
  return (
    <UI>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div>
            <h2 className="text-center">Mokytojų tvarkyklė</h2>
            <ul
              className="list-unstyled d-flex flex-wrap justify-content-center"
              style={{ background: "none" }}
            >
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokytojas/tvarkyti/kategorijas"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faBook} size="4x" />
                    <h5>Tvarkyti Kategorijas</h5>
                  </div>
                </Link>
              </li>
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokytojas/tvarkyti/testus"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faSchool} size="4x" />
                    <h5>Tvarkyti Testus</h5>
                  </div>
                </Link>
              </li>
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokytojas/tvarkyti/grupes"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faUserGroup} size="4x" />
                    <h5>Tvarkyti Grupes</h5>
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

export default TeachHub;

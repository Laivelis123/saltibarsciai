import { Link } from "react-router-dom";
import UI from "../../components/UI/UI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faIdBadge,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
function StudentHub() {
  return (
    <UI>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div>
            <h2 className="text-center">Mokinių tvarkyklė</h2>
            <ul
              className="list-unstyled d-flex flex-wrap justify-content-center"
              style={{ background: "none" }}
            >
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokinys/testai"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faMessage} size="4x" />
                    <h5>Priskirti testai</h5>
                  </div>
                </Link>
              </li>
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokinys/ivertinimai"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faCrown} size="4x" />
                    <h5>Įvertinimai</h5>
                  </div>
                </Link>
              </li>
              <li
                className="mx-2 my-2 flex-grow-1"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Link
                  to="/valdymas/mokinys/grupės"
                  className="card bg-primary d-block h-100"
                >
                  <div className="card-body text-center text-white">
                    <FontAwesomeIcon icon={faIdBadge} size="4x" />
                    <h5>Grupės</h5>
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

export default StudentHub;

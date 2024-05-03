import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import UI from "../components/UI/UI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import {
  faChalkboardTeacher,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import GroupAverages from "./TeacherHub/Groups/GroupAverages";
import Averages from "./StudentHub/Grades/Averages";
import ServerPaths from "../context/ServerPaths";
function Pagrindinis() {
  const { user, loading, setLoading } = useAuth();
  const [userAverage, setUserAverage] = useState(0);
  const [userAllAverages, setUserAllAverages] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [accountType, setAccountType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setAccountType(jwtDecode(user.accessToken).accountType);
        if (accountType === "student") {
          const responseAllCategories = await axios.get(
            ServerPaths.AssignedRoutes.AVERAGE_ALL_CATEGORIES,
            {
              headers: { Authorization: `Bearer ${user.accessToken}` },
            }
          );
          setUserAllAverages(
            responseAllCategories.data.userAveragesByCategories
          );

          const responseOverall = await axios.get(
            ServerPaths.AssignedRoutes.AVERAGE_ALL,
            {
              headers: { Authorization: `Bearer ${user.accessToken}` },
            }
          );
          setUserAverage(responseOverall.data.average);
        } else if (accountType === "teacher") {
          setLoading(true);
          const response = await axios.get(
            ServerPaths.AssignedRoutes.GET_MY_STUDENT_AVERAGES,
            {
              headers: { Authorization: `Bearer ${user.accessToken}` },
            }
          );
          setUserGroups(response.data.groups);
        }
      } catch (error) {
        console.error("Klaida gaunant duomenis:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, accountType, setLoading]);

  const getLinkStyle = () => {
    if (accountType === "teacher") {
      return "card bg-primary text-white";
    } else if (accountType === "student") {
      return "card bg-secondary text-white";
    } else {
      return "card bg-light";
    }
  };

  const renderLinks = () => {
    if (loading) {
      return <p>Krauna...</p>;
    } else {
      return (
        <div className="text-center">
          {user && accountType === "teacher" && (
            <Link
              to="/valdymas/mokytojas"
              className={getLinkStyle()}
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faChalkboardTeacher} size="4x" />
                <h5 className="card-title">Valdyti kaip mokytojas</h5>
              </div>
            </Link>
          )}
          {user && accountType === "student" && (
            <>
              <Link to="/valdymas/mokinys" className={getLinkStyle()}>
                <div className="card-body">
                  <FontAwesomeIcon icon={faUserGraduate} size="4x" />
                  <h5 className="card-title">Valdyti kaip mokinys</h5>
                </div>
              </Link>
            </>
          )}
          {!user && <p>Prašome prisijungti</p>}
          {user && !["teacher", "student"].includes(accountType) && (
            <p>Nei mokytojas nei studentas</p>
          )}
        </div>
      );
    }
  };

  return (
    <UI>
      <div className="container my-4 ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div>{renderLinks()}</div>
            {!loading && (
              <div
                className="my-5 py-4 card text-center"
                style={{
                  borderRadius: "30px",
                  backgroundColor: "rgba(78, 174, 18, 0.878)",
                }}
              >
                {accountType === "teacher" && (
                  <div className="h3 card-body">
                    <h5 className="display-5 card-title">Grupių vidurkiai</h5>
                  </div>
                )}
                {accountType === "student" && (
                  <div className="h3 card-body">
                    <h5 className="display-5 card-title">
                      Kategorijų vidurkiai
                    </h5>
                  </div>
                )}
                {accountType === "teacher" && (
                  <GroupAverages userGroups={userGroups} />
                )}
                {accountType === "student" && (
                  <Averages
                    userAllAverages={userAllAverages}
                    userAverage={userAverage}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </UI>
  );
}

export default Pagrindinis;

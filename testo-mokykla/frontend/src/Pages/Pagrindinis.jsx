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
          console.log("response", response.data.groups);
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
        <div>
          {user && accountType === "teacher" && (
            <Link to="/valdymas/mokytojas" className={getLinkStyle()}>
              <div className="card-body">
                <FontAwesomeIcon icon={faChalkboardTeacher} size="4x" />
                <h5 className="card-title mt-2">Valdyti kaip mokytojas</h5>
              </div>
            </Link>
          )}
          {user && accountType === "student" && (
            <>
              <Link to="/valdymas/mokinys" className={getLinkStyle()}>
                <div className="card-body">
                  <FontAwesomeIcon icon={faUserGraduate} size="4x" />
                  <h5 className="card-title mt-2">Valdyti kaip mokinys</h5>
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
      <div className="container-fluid ">
        <div className="row p-4 m-2 ">
          <main role="main" className="row p-4 m-2">
            <div className="d-flex justify-content-center align-items-center p-3">
              <div className="text-center ">
                <div>{renderLinks()}</div>
              </div>
            </div>
          </main>
          {!loading && (
            <div
              style={{ width: "100%", borderRadius: "100px" }}
              className="bg-secondary "
            >
              <div
                className="row mt-3"
                style={{ width: "40%", margin: "auto" }}
              >
                <div className="col ">
                  <div
                    className="card  bg-secondary text-white text-center mb-2"
                    style={{ borderRadius: "30px" }}
                  >
                    {accountType === "teacher" && (
                      <div className="h3 card-body">
                        <h5 className="display-5 card-title">
                          Grupių vidurkiai
                        </h5>
                      </div>
                    )}
                    {accountType === "student" && (
                      <div className="h3 card-body">
                        <h5 className="display-5 card-title">
                          Kategorijų vidurkiai
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </UI>
  );
}

export default Pagrindinis;

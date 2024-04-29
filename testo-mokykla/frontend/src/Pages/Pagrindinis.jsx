import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import UI from "../components/UI/UI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import {
  faChalkboardTeacher,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons"; // Import icons

function Pagrindinis() {
  const { user, userData, fetchUser, loading, setLoading } = useAuth();
  const [userAverage, setUserAverage] = useState([]);
  const [userAllAverages, setUserAllAverages] = useState([]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchUser();
      if (userData.accountType === "student") {
        fetchUserAverage();
        fetUserAllAverages();
      }
      setLoading(false);
    }
  }, [user]);

  const fetUserAllAverages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/quizzes/assigned/average-all-categories`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setUserAllAverages(response.data.userAveragesByCategories);
    } catch (error) {
      console.error("Error fetching user average:", error);
    }
  };

  const fetchUserAverage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/quizzes/assigned/average-all",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setUserAverage(response.data.average);
    } catch (error) {
      console.log("Error getting average:", error);
    }
  };

  const getLinkStyle = () => {
    if (userData.accountType === "teacher") {
      return "card bg-primary text-white";
    } else if (userData.accountType === "student") {
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
          {user && userData.accountType === "teacher" && (
            <Link to="/valdymas/mokytojas" className={getLinkStyle()}>
              <div className="card-body">
                <FontAwesomeIcon icon={faChalkboardTeacher} size="4x" />
                <h5 className="card-title mt-2">Valdyti kaip mokytojas</h5>
              </div>
            </Link>
          )}
          {user && userData.accountType === "student" && (
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
          {user && !["teacher", "student"].includes(userData.accountType) && (
            <p>Nei mokytojas nei studentas</p>
          )}
        </div>
      );
    }
  };

  const renderAveragesByCategories = () => {
    if (!userAllAverages || userAllAverages.length === 0) {
      return <p>Neturite dar pažymių</p>;
    }
    const numRows = Math.ceil(userAllAverages.length / 3);
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const rowItems = [];
      for (
        let j = i * 3;
        j < Math.min(i * 3 + 3, userAllAverages.length);
        j++
      ) {
        const quiz = userAllAverages[j];
        const categoryName = quiz.Quiz.categoryAlias
          ? quiz.Quiz.categoryAlias.name
          : "Nežinoma";
        rowItems.push(
          <tr key={quiz.quizId}>
            <td className="bg-secondary text-white">
              Kategorija: {categoryName}
            </td>
            <td className="bg-secondary text-white">
              Vidurkis: {quiz.average}%
            </td>
          </tr>
        );
      }
      rows.push(rowItems);
    }
    return (
      <>
        <div
          style={{
            maxHeight: "40vh",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <table className="table table-striped">
            <tbody>{rows}</tbody>
          </table>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="card bg-secondary text-white text-center mb-2">
              <div className="card-body">
                <h5 className="card-title">Bendras vidurkis</h5>
                <p className="card-text">{userAverage}%</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <UI>
      <div className="container-fluid">
        <div className="row p-4 m-2">
          {!loading && userData.accountType === "student" && (
            <nav className="col-md-2 d-none d-md-block bg-secondary sidebar">
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white text-center">
                <span>Kategorijų vidurkiai</span>
              </h6>
              <div className="sidebar-sticky ">
                <div>{renderAveragesByCategories()}</div>
              </div>
            </nav>
          )}

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-center align-items-center p-3">
              <div className="text-center">
                <div>{renderLinks()}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </UI>
  );
}

export default Pagrindinis;

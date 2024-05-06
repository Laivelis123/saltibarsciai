import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UI from "../../../components/UI/UI";
import { useAuth } from "../../../context/AuthContext";
import ServerPaths from "../../../context/ServerPaths";
const EditGroups = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(ServerPaths.GroupRoutes.MY_GROUPS, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        setGroups(response.data.groups);
      } catch (error) {
        console.error("Error fetching user's groups:", error);
      }
    };

    fetchGroups();
  }, [user.accessToken]);

  return (
    <UI>
      <div className="container my-4 ">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div
              className="mt-5 py-4 card"
              style={{
                borderRadius: "30px",
                backgroundColor: "rgba(78, 174, 18, 0.878)",
              }}
            >
              <h2 className="px-3 text-center">Mano grupės</h2>
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="card mb-3 px-3"
                  style={{ background: "none", border: "none" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{group.name}</h5>
                    <p className="card-text">
                      Prisijungimo kodas: {group.code}
                    </p>
                    <Link
                      to={`/valdymas/mokytojas/tvarkyti/grupes/redaguoti/${group.id}`}
                      className="btn btn-primary mr-2"
                    >
                      Redaguoti
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
};

export default EditGroups;

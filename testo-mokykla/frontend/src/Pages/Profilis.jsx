import React, { useEffect, useState } from "react";
import axios from "axios";
import UI from "../components/UI";
import "bootstrap/dist/css/bootstrap.min.css";

function Profilis() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3001/api/auth/data/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser({
            username: response.data.username,
            email: response.data.email,
            accountType: response.data.accountType,
          });
        }
      } catch (error) {
        console.error("Klaida ieškant vartotojo vardo:", error);
      }
    };

    fetchUser();
  }, [user]);

  const [profilePicture, setProfilePicture] = useState(null);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <UI>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <h3 className="card-title">Vartotojo profilis</h3>
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="img-thumbnail mb-3"
                    style={{ maxWidth: "200px" }}
                  />
                )}
                <input
                  type="file"
                  className="form-control-file mb-3"
                  onChange={handlePictureChange}
                  accept="image/*"
                />
                {user && (
                  <>
                    <div>Slapyvardis: {user.username}</div>
                    <div>Paštas: {user.email}</div>
                    <div>
                      Paskyros tipas:
                      {user.accountType === "teacher"
                        ? " Mokytojas"
                        : " Mokinys"}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UI>
    // <UI>
    //   {user && (
    //     <>
    //       <div>Slapyvardis: {user.username}</div>
    //       <div>Paštas: {user.email}</div>
    //       <div>
    //         Paskyros tipas:
    //         {user.accountType === "teacher" ? " Mokytojas" : " Mokinys"}
    //       </div>
    //     </>
    //   )}
    // </UI>
  );
}

export default Profilis;

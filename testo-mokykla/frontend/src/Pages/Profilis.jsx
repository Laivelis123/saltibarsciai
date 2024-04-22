import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import UI from "../components/UI/UI";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultProfile from "../Images/default-profile-picture.jpg";
import { Link, useNavigate } from "react-router-dom";

function Profilis() {
  const { user, userData, fetchUser } = useAuth();
  useEffect(() => {
    if (user) {
      fetchUser().then(() => {
        if (userData.pictureUrl) {
          setProfilePicture(userData.pictureUrl);
        }
      });
    }
  }, [user]);

  const uploadImage = async (imageData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/profile/upload",
        {
          image: imageData,
          userId: userData.id,
        }
      );
      console.log("Pavyko ikelti nuotrauką: ", response.data.imageUrl);
    } catch (error) {
      console.error(
        "Nepavyko ikelti nuotraukos: ",
        error.response.data.message
      );
    }
  };

  const [profilePicture, setProfilePicture] = useState(null);
  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        setProfilePicture(event.target.result);
        await uploadImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <UI>
      {" "}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  Vartotojo profilis
                </Card.Title>
                <div className="text-center mb-3">
                  <div>
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="img-thumbnail rounded-circle"
                        style={{ width: "200px", height: "200px" }}
                      />
                    ) : (
                      <img
                        src={defaultProfile}
                        alt="Default Profile"
                        className="img-thumbnail rounded-circle"
                        style={{ width: "200px", height: "200px" }}
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handlePictureChange}
                    accept="image/*"
                  />
                </div>
                <div className="text-center mb-3">
                  <Button onClick={handleButtonClick}>
                    Pakeisti nuotrauką
                  </Button>
                </div>
                {user && (
                  <div className="text-center">
                    <div>Slapyvardis: {userData.username}</div>
                    <div>Paštas: {userData.email}</div>
                    <div>
                      Paskyros tipas:{" "}
                      {userData.accountType === "teacher"
                        ? "Mokytojas"
                        : userData.accountType === "student"
                        ? "Studentas"
                        : userData.accountType}
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </UI>
  );
}

export default Profilis;

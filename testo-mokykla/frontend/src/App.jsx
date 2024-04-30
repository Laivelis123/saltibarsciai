import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useAuth } from "./context/AuthContext";
import { jwtDecode } from "jwt-decode";
import {
  allRoutes,
  allPrivateRoutes,
  allPublicRoutes,
  allTeacherRoutes,
  allStudentRoutes,
} from "./routes";
import "./transition.css";

function App() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Routes location={location}>
      {!user ? (
        // Tik publikos pasiekiami puslapiai
        allPublicRoutes.map(({ element, children }) => (
          <Route key={element} element={element}>
            {children.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        ))
      ) : (
        <>
          {/* Privačiai pasiekiami puslapiai */}
          {allPrivateRoutes.map(({ element, children }) => (
            <Route key={element} element={element}>
              {children.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          ))}
          {/* Mokinių pasiekiami puslapiai */}
          {jwtDecode(user.accessToken).accountType === "student" &&
            allStudentRoutes.map(({ element, children }) => (
              <Route key={element} element={element}>
                {children.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Route>
            ))}
          {/* Mokytojų pasiekiami puslapiai */}
          {jwtDecode(user.accessToken).accountType === "teacher" &&
            allTeacherRoutes.map(({ element, children }) => (
              <Route key={element} element={element}>
                {children.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Route>
            ))}
        </>
      )}

      {/* Bet ko pasiekiami puslapiai */}
      {allRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;

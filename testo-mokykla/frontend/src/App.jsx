import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          {/* Bet ko pasiekiami puslapiai */}
          {allRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {/* Tik publikos pasiekiami puslapiai */}
          {allPublicRoutes.map(({ element, children }) => (
            <Route key={element} element={element}>
              {children.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          ))}
          {/* Privačiai pasiekiami puslapiai */}
          {allPrivateRoutes.map(({ element, children }) => (
            <Route key={element} element={element}>
              {children.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          ))}
          {/* Mokytojų pasiekiami puslapiai */}
          {allTeacherRoutes.map(({ parent, element, children }) => (
            <Route key={parent} element={parent}>
              <Route key={element} element={element}>
                {children.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Route>
            </Route>
          ))}
          {/* Mokinių pasiekiami puslapiai */}
          {allStudentRoutes.map(({ parent, element, children }) => (
            <Route key={parent} element={parent}>
              <Route key={element} element={element}>
                {children.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Route>
            </Route>
          ))}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;

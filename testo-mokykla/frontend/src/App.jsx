import { Routes, Route, useLocation } from "react-router-dom";
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
    <div className="page">
      <Routes location={location}>
        {!user ? (
          // Public Routes
          allPublicRoutes.map(({ element, children }) => (
            <Route key={element} element={element}>
              {children.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          ))
        ) : (
          <>
            {/* Private Routes */}
            {allPrivateRoutes.map(({ element, children }) => (
              <Route key={element} element={element}>
                {children.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Route>
            ))}
            {/* Student Routes */}
            {jwtDecode(user.accessToken).accountType === "student" &&
              allStudentRoutes.map(({ element, children }) => (
                <Route key={element} element={element}>
                  {children.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Route>
              ))}
            {/* Teacher Routes */}
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

        {/* All Routes */}
        {allRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;

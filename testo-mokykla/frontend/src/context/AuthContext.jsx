import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ServerPaths from "./ServerPaths";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post(ServerPaths.Auth.LOGOUT_PATH, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("token");
      if (user && user.accessToken) {
        navigate("/prisijungimas");
      }
    } catch (error) {
      setError(error.response.data.error);
      console.error("Klaida atjungiant vartotoją: ", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [logout]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      if (user && user.accessToken) {
        const response = await axios.get(ServerPaths.Auth.USER_PATH, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setUserData(response.data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      setError(error.response.data.error);
      console.error("Klaida gaunant vartotojo duomenis: ", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(ServerPaths.Auth.LOGIN_PATH, {
        username,
        password,
      });
      setUser(response.data);
      localStorage.setItem("token", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      console.error("Klaida prijungiant vartotoją: ", error);
      console;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const response = await axios.post(ServerPaths.Auth.REFRESH_PATH, {
          refreshToken: user.refreshToken,
        });
        setUser((prevUser) => ({
          ...prevUser,
          accessToken: response.data.accessToken,
        }));
      } else {
        logout();
      }
    } catch (error) {
      setError(error.response.data.error);
      console.error("Klaida atnaujinant tokeną: ", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [user, logout]);

  let refreshTimeout = useRef(null);

  useEffect(() => {
    const tokenExp = user ? jwtDecode(user.accessToken).exp * 1000 : 0;
    const now = new Date().getTime();
    const handleUserActivity = () => {
      if (!refreshTimeout.current) {
        refreshTimeout.current = setTimeout(() => {
          refreshToken();
          refreshTimeout.current = null;
        }, 1000 * 60 * 2);
      }
    };

    if (user && tokenExp - now < 60 * 60 * 1000) {
      refreshToken();
    }

    window.addEventListener("click", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [user, refreshToken]);

  const contextValue = {
    user,
    userData,
    fetchUser,
    login,
    logout,
    loading,
    setLoading,
    refreshToken,
    setError,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};

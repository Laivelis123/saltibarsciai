import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const fetchCategories = async (categoryId, setCategories) => {
    setLoading(true);
    try {
      let url = "http://localhost:3001/api/categories/filter";

      if (categoryId) {
        url = `http://localhost:3001/api/categories/${categoryId}/children`;
      } else {
        const pathname = window.location.pathname;
        if (pathname === "/") {
          url = "http://localhost:3001/api/categories/filter?parentId=null";
        }
      }

      const response = await axios.get(url);
      setCategories(response.data);
    } catch (error) {
      console.error("Klaida gaunant kategorijas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      if (user && user.accessToken) {
        const response = await axios.get(
          "http://localhost:3001/api/auth/user",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        if (!response.data) {
          navigate("/prisijungimas");
        } else {
          setUserData(response.data);
        }
      } else {
        navigate("/prisijungimas");
      }
    } catch (error) {
      console.error(error);
      navigate("/prisijungimas");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          username,
          password,
        }
      );
      setUser(response.data);
      localStorage.setItem("token", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("token");
      navigate("/prisijungimas");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    setLoading(true);
    try {
      if (user) {
        const response = await axios.post(
          "http://localhost:3001/api/auth/refresh",
          {
            refreshToken: user.refreshToken,
          }
        );
        setUser((prevUser) => ({
          ...prevUser,
          accessToken: response.data.accessToken,
        }));
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  let refreshTimeout;
  useEffect(() => {
    if (user && user.accessToken) {
      const tokenExp = new Date(jwtDecode(user.accessToken).exp * 1000);
      const now = new Date();
      if (tokenExp - now < 60 * 60 * 1000) {
        refreshToken();
      }

      const handleUserActivity = () => {
        if (!refreshTimeout) {
          refreshTimeout = setTimeout(() => {
            refreshToken();
            refreshTimeout = null;
          }, 1000 * 60 * 2);
        }
      };

      window.addEventListener("click", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);

      return () => {
        window.removeEventListener("click", handleUserActivity);
        window.removeEventListener("keydown", handleUserActivity);
      };
    }
  }, [user]);

  const contextValue = {
    user,
    userData,
    fetchUser,
    login,
    logout,
    loading,
    refreshToken,
    fetchCategories,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import { createContext, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  // TOKEN STATE
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const logOut = () => {
    console.log("LOg out click");
    authService.logout();
    setToken("");
    navigate("/login");
  };
  const value = {
    token,
    setToken,
    logOut,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;

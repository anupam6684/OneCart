import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import AdminContextProvider from "./context/AdminContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AdminContextProvider>
          <ToastContainer />
          <AppRoutes />
        </AdminContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

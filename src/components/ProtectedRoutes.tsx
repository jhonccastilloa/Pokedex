import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Theme from "./shared/Theme";
import { ThemeProvider } from "../context/ThemeContext";
const ProtectedRoutes = () => {
  const { trainer } = useSelector((state: RootState) => state);
  if (trainer) {
    return (
      <>
        <ThemeProvider>
          <Theme />
          <Outlet />
        </ThemeProvider>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;

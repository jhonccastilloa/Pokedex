import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const ProtectedRoutes = () => {
  const { trainer } = useSelector((state: RootState) => state);
  if (trainer) {
    return (<Outlet />);
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;

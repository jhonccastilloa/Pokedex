import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Theme from "./shared/Theme";
const ProtectedRoutes = () => {
  const { trainer } = useSelector((state: RootState) => state);
  if (trainer) {
    return (<div>
      <Theme/>
      <Outlet />
    </div>);
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;

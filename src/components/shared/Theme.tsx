import React, { useContext, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./style/theme.css";

const Theme = () => {
  const {isDark,handleTheme} = useContext(ThemeContext)
  
  return (

    <div className="container">
      <div className="theme">
          <span className={`theme__icon ${isDark && "icon__dark"}`}onClick={handleTheme}>
            {isDark ? (
              <i className="fa-regular fa-sun "></i>
            ) : (
              <i className="fa-solid fa-moon "></i>
            )}
          </span>
      </div>
    </div>
  );
};

export default Theme;

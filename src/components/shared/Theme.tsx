import React, { useState } from "react";
import "./style/theme.css";

const Theme = () => {
  const [isDark, setIsDark] = useState(false);
  const handleTheme = () => setIsDark(!isDark);
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

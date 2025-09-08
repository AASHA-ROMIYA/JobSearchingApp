import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import './Header.css';

export function Header() {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div className={`job-header-container ${theme}`}>
      <h1>Job Searching App</h1>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        style={{
          background: theme === "light" ? "#fff" : "#000",
          color: theme === "light" ? "#000" : "#fff",
          cursor:"pointer"
        }}
      >
        {theme === "light" ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i className="fa-solid fa-moon"></i>
        )}
      </button>
    </div>
  );
}

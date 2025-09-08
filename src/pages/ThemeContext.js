// ThemeContext.js
import React, { createContext, useState ,useEffect} from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
   useEffect(() => {
    document.body.className = "";         // clear old theme
    document.body.classList.add(theme);   // add new theme
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

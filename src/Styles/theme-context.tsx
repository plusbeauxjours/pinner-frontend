import React, { useState, useContext, useCallback, createContext } from "react";
import { ThemeProvider as BaseThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const initialMode = localStorage.getItem("isDarkMode")
    ? localStorage.getItem("isDarkMode") === "true"
    : true;
  const [isDarkMode, setDarkMode] = useState<boolean>(initialMode);
  const themeObject = isDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ isDarkMode, setDarkMode }}>
      <BaseThemeProvider theme={themeObject}>{children}</BaseThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  const { isDarkMode, setDarkMode } = context;
  const toggleTheme = useCallback(() => {
    if (isDarkMode === false) {
      setDarkMode(true);
      localStorage.setItem("isDarkMode", "true");
    } else if (isDarkMode === true) {
      setDarkMode(false);
      localStorage.setItem("isDarkMode", "false");
    }
  }, [isDarkMode]);
  return {
    theme: isDarkMode,
    toggleTheme
  };
}

export { ThemeProvider, useTheme };

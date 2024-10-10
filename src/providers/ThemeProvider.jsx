import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props = {}) => {
  const { children } = props || {};
  const [theme, setTheme] = useState({});
  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("theme"));
    if (!currentTheme) {
      const defaultTheme = {
        mode: "light",
        light: "light",
        dark: "dark",
      };
      setTheme(defaultTheme);
      localStorage.setItem("theme", JSON.stringify(defaultTheme));
    } else {
      setTheme(currentTheme);
    }
  }, []);

  const toggleTheme = (mode) => {
    let currentTheme = JSON.parse(localStorage.getItem("theme"));
    if (mode == "light") {
      currentTheme.mode = "dark";
    } else {
      currentTheme.mode = "light";
    }
    setTheme({ ...currentTheme });
    localStorage.setItem("theme", JSON.stringify(currentTheme));
  };

  const changeLightTheme = (themeName) => {
    let currentTheme = JSON.parse(localStorage.getItem("theme"));
    currentTheme.light = themeName;
    currentTheme.mode = "light";
    setTheme({ ...currentTheme });
    localStorage.setItem("theme", JSON.stringify(currentTheme));
  };

  const changeDarkTheme = (themeName) => {
    let currentTheme = JSON.parse(localStorage.getItem("theme"));
    currentTheme.dark = themeName;
    currentTheme.mode = "dark";
    setTheme({ ...currentTheme });
    localStorage.setItem("theme", JSON.stringify(currentTheme));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        changeLightTheme,
        changeDarkTheme,
      }}
    >
      <div data-theme={theme.mode == "light" ? theme.light : theme.dark}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

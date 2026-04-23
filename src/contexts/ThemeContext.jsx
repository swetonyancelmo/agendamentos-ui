import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [snowEffect, setSnowEffect] = useState(() => {
    const stored = localStorage.getItem("snowEffect");
    return stored === null ? true : stored === "true";
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("darkMode");
  }, []);

  useEffect(() => {
    localStorage.setItem("snowEffect", snowEffect);
  }, [snowEffect]);

  return (
    <ThemeContext.Provider value={{ snowEffect, setSnowEffect }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}

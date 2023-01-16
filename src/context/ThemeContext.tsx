import { createContext, useState } from "react";
import { Children } from "../interfaces/types";

interface ThemeContextProps {
  isDark: Boolean;
  handleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const ThemeProvider = ({ children }: Children) => {
  const [isDark, setIsDark] = useState(false);
  const handleTheme = () => setIsDark(!isDark);
  const data = { isDark, handleTheme };
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider };
export default ThemeContext;

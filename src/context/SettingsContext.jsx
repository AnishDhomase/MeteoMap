import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

SettingsContext.propTypes = {
  children: PropTypes.any,
};

const AppSettingsContext = createContext();

function SettingsContext({ children }) {
  const [tempUnit, setTempUnit] = useState("C");
  const [theme, setTheme] = useState("light");
  const [isAuthorized, setIsAuthorized] = useState(null);
  return (
    <AppSettingsContext.Provider
      value={{
        tempUnit,
        setTempUnit,
        theme,
        setTheme,
        isAuthorized,
        setIsAuthorized,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

export default SettingsContext;

export function useAppSettings() {
  const values = useContext(AppSettingsContext);
  if (!values) console.error("SettingsContext Used Outside Provider");
  return values;
}

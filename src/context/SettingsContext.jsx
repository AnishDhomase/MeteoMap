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
  const [savedLocations, setSavedLocations] = useState([]);
  const [favLocations, setFavLocations] = useState([]);

  function deleteSavedLocation(locationToDelete) {
    setSavedLocations((locations) =>
      locations.filter((location, ind) => locationToDelete !== location.name)
    );
  }
  function deleteFavLocation(locationToDelete) {
    setFavLocations((locations) =>
      locations.filter((location, ind) => locationToDelete !== location.name)
    );
  }
  function addToSavedLocation(locationToADD) {
    deleteSavedLocation(locationToADD);
    setSavedLocations((location) => [...location, { name: locationToADD }]);
  }
  function addToFavLocation(locationToADD) {
    deleteFavLocation(locationToADD);
    setFavLocations((location) => [...location, { name: locationToADD }]);
  }
  function isInSavedLocation(locationToSearch) {
    return savedLocations.find((loc, ind) => loc.name === locationToSearch);
  }
  function isInFavLocation(locationToSearch) {
    return favLocations.find((loc, ind) => loc.name === locationToSearch);
  }
  return (
    <AppSettingsContext.Provider
      value={{
        tempUnit,
        setTempUnit,
        theme,
        setTheme,
        isAuthorized,
        setIsAuthorized,
        savedLocations,
        favLocations,
        setSavedLocations,
        setFavLocations,
        deleteSavedLocation,
        deleteFavLocation,
        addToSavedLocation,
        addToFavLocation,
        isInSavedLocation,
        isInFavLocation,
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

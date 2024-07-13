import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

LocationsContext.propTypes = {
  children: PropTypes.any,
};

const AppLocationsContext = createContext();

function LocationsContext({ children }) {
  const [savedLocations, setSavedLocations] = useState([
    // { name: "Bhopal, M.P." },
    // { name: "Indore" },
  ]);
  const [favLocations, setFavLocations] = useState([
    // { name: "Junnar, Pune" },
    // { name: "Pune, Maharashtra" },
  ]);

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

  return (
    <AppLocationsContext.Provider
      value={{
        deleteSavedLocation,
        deleteFavLocation,
        setFavLocations,
        setSavedLocations,
        savedLocations,
        favLocations,
      }}
    >
      {children}
    </AppLocationsContext.Provider>
  );
}

export default LocationsContext;

export function useLocations() {
  const values = useContext(AppLocationsContext);
  if (!values) console.error("AppLocationsContext Used Outside Provider");
  return values;
}

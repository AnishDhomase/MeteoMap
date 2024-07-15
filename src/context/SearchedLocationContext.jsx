import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

SearchedLocationContext.propTypes = {
  children: PropTypes.any,
};

const AppSearchedLocationContext = createContext();

function SearchedLocationContext({ children }) {
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [searchedLocationWeatherData, setSearchedLocationWeatherData] =
    useState(null);

  return (
    <AppSearchedLocationContext.Provider
      value={{
        searchedLocation,
        setSearchedLocation,
        searchedLocationWeatherData,
        setSearchedLocationWeatherData,
      }}
    >
      {children}
    </AppSearchedLocationContext.Provider>
  );
}

export default SearchedLocationContext;

export function useSearchedLocation() {
  const values = useContext(AppSearchedLocationContext);
  if (!values)
    console.error("AppSearchedLocationContext Used Outside Provider");
  return values;
}

import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

import SearchBarAutoComplete from "./SearchBarAutoComplete";
import { useSearchedLocation } from "../../../context/SearchedLocationContext";
import { getWeatherDataOfCity } from "../../../api/api";
import { useEffect } from "react";

function SearchedBox() {
  const { searchedLocation, setSearchedLocationWeatherData } =
    useSearchedLocation();

  async function getCityWeather(searchedLocation) {
    if (!searchedLocation) return;
    const data = await getWeatherDataOfCity(searchedLocation);
    setSearchedLocationWeatherData(data);
  }

  return (
    <div className="input">
      <SearchBarAutoComplete />
      <IconButton onClick={() => getCityWeather(searchedLocation)}>
        <SearchIcon color="primary" />
      </IconButton>
    </div>
  );
}

export default SearchedBox;

import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

import SearchBarAutoComplete from "./SearchBarAutoComplete";
import { useSearchedLocation } from "../../../context/SearchedLocationContext";
import { getWeatherDataOfCity } from "../../../api/api";
import { useAppSettings } from "../../../context/SettingsContext";
import { useEffect } from "react";

function SearchedBox() {
  const { searchedLocation, setSearchedLocationWeatherData } =
    useSearchedLocation();

  const { tempUnit } = useAppSettings();

  useEffect(
    function () {
      getCityWeather(searchedLocation, tempUnit);
    },
    [tempUnit]
  );

  async function getCityWeather(searchedLocation, tempUnit) {
    if (!searchedLocation) return;
    const data = await getWeatherDataOfCity(searchedLocation, tempUnit);
    setSearchedLocationWeatherData(data);
  }
  console.log("render");

  return (
    <div className="input">
      <SearchBarAutoComplete />
      <IconButton onClick={() => getCityWeather(searchedLocation, tempUnit)}>
        <SearchIcon color="primary" />
      </IconButton>
    </div>
  );
}

export default SearchedBox;

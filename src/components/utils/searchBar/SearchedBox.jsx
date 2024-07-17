import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

import { useAppSettings } from "../../../context/SettingsContext";
import { useSearchedLocation } from "../../../context/SearchedLocationContext";
import { getWeatherDataOfCity } from "../../../api/api";
import SearchBarAutoComplete from "./SearchBarAutoComplete";

function SearchedBox() {
  const { searchedLocation, setSearchedLocationWeatherData } =
    useSearchedLocation();
  const { tempUnit } = useAppSettings();

  // When temp unit changes fetch data in that unit
  useEffect(
    function () {
      getCityWeather(searchedLocation, tempUnit);
    },
    [tempUnit]
  );

  async function getCityWeather() {
    if (!searchedLocation) return;
    const data = await getWeatherDataOfCity(searchedLocation, tempUnit);
    setSearchedLocationWeatherData(data);
  }

  return (
    <div className="input">
      <SearchBarAutoComplete />
      <IconButton onClick={() => getCityWeather()}>
        <SearchIcon color="primary" />
      </IconButton>
    </div>
  );
}

export default SearchedBox;

import { Chart, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { useSearchedLocation } from "../../context/SearchedLocationContext";
import { useAppSettings } from "../../context/SettingsContext";
import TooltipIcon from "../utils/tooltipIcon/TooltipIcon";
import { formatDate, getCurrentTimestamp } from "../../helpers/dateTime";
import NoSearchedLocation from "../utils/noSearchedLocation/NoSearchedLocation";
import { getForecastData } from "../../helpers/getForecastData";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const currentTimestamp = getCurrentTimestamp();

function WeatherDetail() {
  const {
    isAuthorized,
    deleteSavedLocation,
    deleteFavLocation,
    addToFavLocation,
    addToSavedLocation,
    isInSavedLocation,
    isInFavLocation,
    tempUnit,
  } = useAppSettings();
  const { searchedLocationWeatherData, searchedLocation } =
    useSearchedLocation();

  const data = searchedLocationWeatherData;
  if (!data) return <NoSearchedLocation />;

  function handleSaveLocation() {
    if (isInSavedLocation(searchedLocation))
      deleteSavedLocation(searchedLocation);
    else addToSavedLocation(searchedLocation);
  }
  function handleFavLocation() {
    if (isInFavLocation(searchedLocation)) deleteFavLocation(searchedLocation);
    else addToFavLocation(searchedLocation);
  }
  const { FormattedFiveHrsForecast, dailyForecast } = getForecastData(
    data,
    currentTimestamp
  );
  const formattedWeatherInfo = {
    date: formatDate(),
    locationName: data.name,
    locationCountry: data.sys.country,
    iconOfWeather: data?.weather[0]?.icon,
    weatherDescription: data?.weather[0]?.description,
    temp: Math.floor(data.main.temp),
    tempFeelsLike: data.main.feels_like,
    tempUnit: tempUnit === "C" ? "°C" : "°F",
    humidity: data.main.humidity,
    windSpeed: data?.wind?.speed,
    windSpeedUnit: tempUnit === "C" ? "Kph" : "Mph",
    minTemp: data?.main?.temp_min,
    maxTemp: data?.main?.temp_max,
    hourlyForecast: FormattedFiveHrsForecast,
    dailyForecast: dailyForecast,
  };

  return (
    <div className="weather">
      <div className="date">{formattedWeatherInfo.date}</div>

      <h1 className="LocationName">
        {formattedWeatherInfo.locationName},{" "}
        {formattedWeatherInfo.locationCountry}
      </h1>

      <div className="savePanel">
        <span className="fav">
          <TooltipIcon
            title="Saved"
            onBtnClick={() => {
              if (!isAuthorized) {
                toast.error(`To Access Favourite Locations
                   Try Login or SignUp!`);
                return;
              }
              handleSaveLocation();
            }}
          >
            <BookmarkIcon
              sx={
                isInSavedLocation(searchedLocation)
                  ? { color: "#198BFD" }
                  : { color: "gray" }
              }
            />
          </TooltipIcon>
        </span>
        <span className="fav">
          <TooltipIcon
            title="Saved"
            onBtnClick={() => {
              if (!isAuthorized) {
                toast.error(`To Access Favourite Locations
                   Try Login or SignUp!`);
                return;
              }
              handleFavLocation();
            }}
          >
            <FavoriteIcon
              sx={
                isInFavLocation(searchedLocation)
                  ? { color: "#fd5c63" }
                  : { color: "gray" }
              }
            />
          </TooltipIcon>
        </span>
      </div>

      <div className="data">
        <div className="left">
          <img
            src={`https://openweathermap.org/img/wn/${formattedWeatherInfo.iconOfWeather}@2x.png`}
            alt="weather condition"
          />
        </div>
        <div className="mid">
          <h1>{Math.floor(formattedWeatherInfo.temp)}</h1>
          {formattedWeatherInfo.tempUnit}
        </div>
        <div className="right">
          <div className="dataRow">
            <span>
              <ThermostatIcon />
            </span>
            <span>
              Feels {formattedWeatherInfo.tempFeelsLike}{" "}
              {formattedWeatherInfo.tempUnit}
            </span>
          </div>
          <div className="dataRow">
            <span>
              <WaterDropIcon />
            </span>
            <span>Humidity {formattedWeatherInfo.humidity} %</span>
          </div>
          <div className="dataRow">
            <span>
              <AirIcon />
            </span>
            <span>
              Wind {formattedWeatherInfo.windSpeed}{" "}
              {formattedWeatherInfo.windSpeedUnit}
            </span>
          </div>
        </div>
      </div>
      <span className="condition">
        {formattedWeatherInfo.weatherDescription}
      </span>

      <div className="highlow">
        <div className="high">
          <span>
            <TrendingUpIcon />
          </span>
          <span>
            {formattedWeatherInfo.maxTemp} {formattedWeatherInfo.tempUnit}
          </span>
        </div>
        <div className="high">
          <span>
            <TrendingDownIcon />
          </span>
          <span>
            {formattedWeatherInfo.minTemp} {formattedWeatherInfo.tempUnit}
          </span>
        </div>
      </div>

      <h3 className="forecastTitle">Hourly Forecast</h3>
      <div className="lineChartBox">
        <Line
          data={{
            labels: formattedWeatherInfo.hourlyForecast.map(
              (forecast, ind) => forecast.localeTime
            ),
            datasets: [
              {
                label: tempUnit === "C" ? "°C" : "°F",
                data: formattedWeatherInfo.hourlyForecast.map(
                  (forecast, ind) => forecast.temp
                ),
                fill: true,
                borderColor: "blue",
                tension: 0.1,
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
          }}
        />
      </div>

      <h3 className="forecastTitle">Daily Forecast</h3>
      <div className="forecastBox">
        {formattedWeatherInfo.dailyForecast.map((forecast, ind) => (
          <div className="forecastCard" key={forecast + ind}>
            <header>{forecast.day}</header>
            <main>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                alt="weather condition"
              />
            </main>
            <footer>
              {Math.round(forecast.temp)} {tempUnit === "C" ? "°C" : "°F"}
            </footer>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetail;

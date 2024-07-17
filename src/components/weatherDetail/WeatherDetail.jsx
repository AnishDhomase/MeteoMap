import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Chart, defaults, plugins } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";
import TooltipIcon from "../utils/tooltipIcon/TooltipIcon";
import { useAppSettings } from "../../context/SettingsContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useSearchedLocation } from "../../context/SearchedLocationContext";
import { formatDate } from "../../helpers/formatDate";
import moment from "moment-timezone";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function timeConverterToAMPM(timestamp, timezoneOffset) {
  // Convert timestamp to milliseconds
  const date = moment.unix(timestamp);

  // Apply timezone offset (in seconds)
  const adjustedDate = date.utcOffset(timezoneOffset / 60);

  // Format the time in AM/PM
  const formattedTime = adjustedDate.format("hh:mm A");

  return formattedTime;
}
function getDayFromTimestamp(timestamp, timezoneOffset) {
  // Convert timestamp to milliseconds if it's in seconds
  const timestampMs = timestamp * 1000;

  // Create a moment object from the timestamp
  const date = moment(timestampMs);

  // Apply timezone offset (convert seconds to minutes)
  const adjustedDate = date.utcOffset(timezoneOffset / 60);

  // Get the day of the week (0 is Sunday, 1 is Monday, etc.)
  const dayNumber = adjustedDate.day();

  // Convert day number to day name
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = days[dayNumber];

  return dayName;
}
function getCurrentDay() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const dayNumber = currentDate.getDay();
  return days[dayNumber];
}

const currentTimestamp = Math.floor(Date.now() / 1000);

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

  function handleSaveLocation() {
    if (isInSavedLocation(searchedLocation))
      deleteSavedLocation(searchedLocation);
    else addToSavedLocation(searchedLocation);
  }
  function handleFavLocation() {
    if (isInFavLocation(searchedLocation)) deleteFavLocation(searchedLocation);
    else addToFavLocation(searchedLocation);
  }
  if (!data)
    return (
      <span className="NotData">
        <h1>Search Locations To get weather Updates!</h1>
        <p>{formatDate()}</p>
      </span>
    );

  const afterCurrentTime = data.list.filter(
    (item, ind) => item.dt > currentTimestamp
  );
  const FiveHrsForecast = afterCurrentTime.slice(0, 5);
  const FormattedFiveHrsForecast = FiveHrsForecast.map((item, ind) => {
    return {
      localeTime: timeConverterToAMPM(item.dt, data?.timezone),
      temp: item.main.temp,
    };
  });
  const today = getCurrentDay();
  const afterToday = afterCurrentTime
    .map((item, ind) => {
      return {
        day: getDayFromTimestamp(item.dt, data?.timezone),
        temp: item.main.temp,
        icon: item.weather[0].icon,
      };
    })
    .filter((item, ind) => item.day !== today);
  let dailyForecast = afterToday.filter((item, ind) => ind % 8 === 0);

  return (
    <div className="weather">
      <div className="date">{formatDate()}</div>

      <h1 className="LocationName">
        {data?.name}, {data?.sys?.country}
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
            src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
            alt="weather condition"
          />
        </div>
        <div className="mid">
          <h1>{Math.floor(data?.main?.temp)}</h1>
          {tempUnit === "C" ? "°C" : "°F"}
        </div>
        <div className="right">
          <div className="dataRow">
            <span>
              <ThermostatIcon />
            </span>
            <span>
              Feels {data?.main?.feels_like} {tempUnit === "C" ? "°C" : "°F"}
            </span>
          </div>
          <div className="dataRow">
            <span>
              <WaterDropIcon />
            </span>
            <span>Humidity {data?.main?.humidity} %</span>
          </div>
          <div className="dataRow">
            <span>
              <AirIcon />
            </span>
            <span>
              Wind {data?.wind?.speed} {tempUnit === "C" ? "Kph" : "Mph"}
            </span>
          </div>
        </div>
      </div>
      <span className="condition">{data?.weather[0]?.description}</span>

      <div className="highlow">
        <div className="high">
          <span>
            <TrendingUpIcon />
          </span>
          <span>
            {data?.main?.temp_max} {tempUnit === "C" ? "°C" : "°F"}
          </span>
        </div>
        <div className="high">
          <span>
            <TrendingDownIcon />
          </span>
          <span>
            {data?.main?.temp_min} {tempUnit === "C" ? "°C" : "°F"}
          </span>
        </div>
      </div>

      <h3 className="forecastTitle">Hourly Forecast</h3>
      <div className="lineChartBox">
        <Line
          data={{
            labels: FormattedFiveHrsForecast.map(
              (forecast, ind) => forecast.localeTime
            ),
            datasets: [
              {
                label: tempUnit === "C" ? "°C" : "°F",
                data: FormattedFiveHrsForecast.map(
                  (forecast, ind) => forecast.temp
                ),
                fill: true,
                borderColor: "blue",
                tension: 0.1,
              },
            ],
          }}
          options={{
            // plugins: {
            //   title: {
            //     text: "Hourly Forecast",
            //   },
            // },
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
        {dailyForecast.map((forecast, ind) => (
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

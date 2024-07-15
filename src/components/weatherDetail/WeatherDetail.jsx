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

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function WeatherDetail() {
  const {
    isAuthorized,
    deleteSavedLocation,
    deleteFavLocation,
    addToFavLocation,
    addToSavedLocation,
    isInSavedLocation,
    isInFavLocation,
  } = useAppSettings();

  const { searchedLocationWeatherData, searchedLocation } =
    useSearchedLocation();
  const data = searchedLocationWeatherData;
  console.log(searchedLocationWeatherData);

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
          <h1>{Math.floor(data?.main?.temp)}</h1>°C
        </div>
        <div className="right">
          <div className="dataRow">
            <span>
              <ThermostatIcon />
            </span>
            <span>Feels {data?.main?.feels_like} °C</span>
          </div>
          <div className="dataRow">
            <span>
              <WaterDropIcon />
            </span>
            <span>Humidity {data?.main?.humidity}%</span>
          </div>
          <div className="dataRow">
            <span>
              <AirIcon />
            </span>
            <span>Wind {data?.wind?.speed} Km/h</span>
          </div>
        </div>
      </div>
      <span className="condition">{data?.weather[0]?.description}</span>

      <div className="highlow">
        <div className="high">
          <span>
            <TrendingUpIcon />
          </span>
          <span>{data?.main?.temp_max} °C</span>
        </div>
        <div className="high">
          <span>
            <TrendingDownIcon />
          </span>
          <span>{data?.main?.temp_min} °C</span>
        </div>
      </div>

      <h3 className="forecastTitle">Hourly Forecast</h3>
      <div className="lineChartBox">
        <Line
          data={{
            labels: [
              "10:00 AM",
              "10:00 AM",
              "10:00 AM",
              "10:00 AM",
              "10:00 AM",
            ],
            datasets: [
              {
                label: "°C",
                data: [28, 29, 38, 32, 25],
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
        <div className="forecastCard">
          <header>Wed</header>
          <main>
            <img src="../../../public/image.png" alt="weather condition" />
          </main>
          <footer>13 °C</footer>
        </div>
        <div className="forecastCard">
          <header>Wed</header>
          <main>
            <img src="../../../public/image.png" alt="weather condition" />
          </main>
          <footer>13 °C</footer>
        </div>
        <div className="forecastCard">
          <header>Wed</header>
          <main>
            <img src="../../../public/image.png" alt="weather condition" />
          </main>
          <footer>13 °C</footer>
        </div>
        <div className="forecastCard">
          <header>Wed</header>
          <main>
            <img src="../../../public/image.png" alt="weather condition" />
          </main>
          <footer>13 °C</footer>
        </div>
        <div className="forecastCard">
          <header>Wed</header>
          <main>
            <img src="../../../public/image.png" alt="weather condition" />
          </main>
          <footer>13 °C</footer>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;

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

defaults.maintainAspectRatio = false;
defaults.responsive = true;
// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "blue";

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
  // const [isSaved, setIsSaved] = useState(false);
  // const [isFav, setIsFav] = useState(false);

  function handleSaveLocation() {
    if (isInSavedLocation("currLocation")) deleteSavedLocation("currLocation");
    else addToSavedLocation("currLocation");
  }
  function handleFavLocation() {
    if (isInFavLocation("currLocation")) deleteFavLocation("currLocation");
    else addToFavLocation("currLocation");
  }

  return (
    <div className="weather">
      <div className="date">Tuesday, 02 July 2024</div>

      <h1 className="LocationName">Pune, IN</h1>
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
                isInSavedLocation("currLocation")
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
                isInFavLocation("currLocation")
                  ? { color: "#fd5c63" }
                  : { color: "gray" }
              }
            />
          </TooltipIcon>
        </span>
      </div>

      <div className="data">
        <div className="left">
          <img src="../../../public/image.png" alt="weather condition" />
        </div>
        <div className="mid">
          <h1>34</h1>°C
        </div>
        <div className="right">
          <div className="dataRow">
            <span>
              <ThermostatIcon />
            </span>
            <span>Feels like 34 °C</span>
          </div>
          <div className="dataRow">
            <span>
              <WaterDropIcon />
            </span>
            <span>Humidity 50%</span>
          </div>
          <div className="dataRow">
            <span>
              <AirIcon />
            </span>
            <span>Wind 3 Km/h</span>
          </div>
        </div>
      </div>

      <div className="highlow">
        <div className="high">
          <span>
            <TrendingUpIcon />
          </span>
          <span>34 °C</span>
        </div>
        <div className="high">
          <span>
            <TrendingDownIcon />
          </span>
          <span>34 °C</span>
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

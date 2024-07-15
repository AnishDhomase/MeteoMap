import { useEffect, useState } from "react";
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useSearchedLocation } from "../../context/SearchedLocationContext";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { getWeatherDataOfCity } from "../../api/api";

const API_KEY = "b4620542d70be9a9dbdbae914c06ebc1";

Map.propTypes = {
  isFull: PropTypes.bool,
};

function Map({ isFull }) {
  const {
    searchedLocation,
    setSearchedLocation,
    setSearchedLocationWeatherData,
    searchedLocationWeatherData,
  } = useSearchedLocation();
  const data = searchedLocationWeatherData;

  // const [pos, setPos] = useState([19.2032, 73.8743]);
  const [pos, setPos] = useState([0, 0]);

  // Change on Search
  useEffect(
    function () {
      const position = [
        data?.coord?.lat || 19.2032,
        data?.coord?.lon || 73.8743,
      ];
      setPos(position);
    },
    [data]
  );

  // On mount get current location
  async function setSearchQuery(lat, lon) {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    const data = await res.json();
    const nameOfCity = data[0].name;
    setSearchedLocation(nameOfCity);

    const data1 = await getWeatherDataOfCity(nameOfCity);
    setSearchedLocationWeatherData(data1);
  }
  function getBrowserLocation(isToUpdateQuery) {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setPos([lat, lon]);
        if (isToUpdateQuery) {
          setSearchQuery(lat, lon);
        }
      },
      (error) => {
        toast.error(error.message);
      }
    );
  }
  useEffect(() => {
    if (!searchedLocationWeatherData) getBrowserLocation();
  }, []);

  return (
    <div
      className="map"
      style={isFull ? { width: "100vw !important", background: "red" } : {}}
    >
      <MapContainer center={pos} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* <Marker position={pos}>
          <Popup>
            <h3>
              {data ? `${data?.name}, ${data?.sys?.country}` : "Junnar, IN"}
            </h3>
          </Popup>
        </Marker> */}
        <FeatureGroup pathOptions={{ color: "blue" }}>
          <Popup>
            {data
              ? `${data?.weather[0]?.description} in ${data?.name}`
              : "Search Location to get Weather Forecast!"}
          </Popup>
          <Circle center={pos} radius={2000} />
        </FeatureGroup>
        <ChangeCenter position={pos} />
      </MapContainer>
      <span className="myLocation">
        <span>
          <MyLocationIcon />
        </span>
        <span
          onClick={() => {
            getBrowserLocation(true);
          }}
        >
          Use My Location
        </span>
      </span>
    </div>
  );
}

export default Map;

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 13);
  return null;
}

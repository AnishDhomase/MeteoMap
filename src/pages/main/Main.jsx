import { useViewport } from "react-viewport-hooks";
import Header from "../../components/header/Header";
import BottomNavBar from "../../components/mobileBottomBar/BottomNavBar";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import Map from "../../components/map/Map";
import "./Main.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSearchedLocation } from "../../context/SearchedLocationContext";

function Main() {
  const { vw } = useViewport();
  const [isMapOpen, setIsMapOpen] = useState(false);
  return (
    <>
      {!isMapOpen && <Header />}
      <main className="weatherMapBox">
        {vw <= 750 && (
          <span className="mapToggler" onClick={() => setIsMapOpen(!isMapOpen)}>
            <span>
              {!isMapOpen ? <FmdGoodIcon /> : <KeyboardBackspaceIcon />}
            </span>
            {vw > 600 && <span>{!isMapOpen ? "See Map" : "Close Map"}</span>}
          </span>
        )}
        {!isMapOpen && <WeatherDetail />}
        {(vw > 750 || isMapOpen) && <Map />}
      </main>
      {vw <= 750 && <BottomNavBar />}
    </>
  );
}

export default Main;

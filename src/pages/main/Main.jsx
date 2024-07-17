import { useViewport } from "react-viewport-hooks";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { lazy, Suspense, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import "./Main.css";
import Header from "../../components/header/Header";
import BottomNavBar from "../../components/mobileBottomBar/BottomNavBar";
import PageLoader from "../../components/utils/pageLoader/PageLoader";

import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
const Map = lazy(() => import("../../components/map/Map"));

function Main() {
  const { vw } = useViewport();
  const [isMapOpen, setIsMapOpen] = useState(false);
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}

export default Main;

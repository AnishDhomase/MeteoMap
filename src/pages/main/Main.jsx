import { useViewport } from "react-viewport-hooks";
import Header from "../../components/header/Header";
import BottomNavBar from "../../components/mobileBottomBar/BottomNavBar";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import Map from "../../components/map/Map";
import "./Main.css";

function Main() {
  const { vw } = useViewport();
  return (
    <>
      <Header />
      <main className="weatherMapBox">
        <WeatherDetail />
        <Map />
      </main>
      {vw <= 750 && <BottomNavBar />}
    </>
  );
}

export default Main;

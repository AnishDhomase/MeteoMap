import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

import { useSearchedLocation } from "../../../context/SearchedLocationContext";
import { useAppSettings } from "../../../context/SettingsContext";
import TooltipIcon from "../../utils/tooltipIcon/TooltipIcon";
import { panelConfig } from "../../../helpers/panelConfig";
import { getWeatherDataOfCity } from "../../../api/api";
import NoLocationsPanel from "../../utils/noLocationsPanel/NoLocationsPanel";

FavPanel.propTypes = {
  show: PropTypes.bool,
  direction: PropTypes.string,
};

function FavPanel({ show, direction = "up" }) {
  const { favLocations, deleteFavLocation, tempUnit } = useAppSettings();
  const { setSearchedLocation, setSearchedLocationWeatherData } =
    useSearchedLocation();
  const config = panelConfig(direction);

  async function openLocationFromList(locationName) {
    setSearchedLocation(locationName);
    const data1 = await getWeatherDataOfCity(locationName, tempUnit);
    setSearchedLocationWeatherData(data1);
  }

  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.div
          className="favPanel panel"
          initial={config.initial}
          animate={config.animate}
          exit={config.exit}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
        >
          {favLocations.length ? (
            favLocations.map((location, ind) => (
              <div className="location" key={location.name}>
                <span
                  className="loc"
                  onClick={() => openLocationFromList(location.name)}
                >
                  {location.name}
                </span>
                <TooltipIcon
                  title="close"
                  onBtnClick={() => deleteFavLocation(location.name)}
                >
                  <CloseIcon />
                </TooltipIcon>
              </div>
            ))
          ) : (
            <NoLocationsPanel title="Favorite" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FavPanel;

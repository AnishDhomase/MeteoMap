import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

import { useSearchedLocation } from "../../../context/SearchedLocationContext";
import { useAppSettings } from "../../../context/SettingsContext";
import TooltipIcon from "../../utils/tooltipIcon/TooltipIcon";
import NoLocationsPanel from "../../utils/noLocationsPanel/NoLocationsPanel";
import { panelConfig } from "../../../helpers/panelConfig";
import { getWeatherDataOfCity } from "../../../api/api";

SavedPanel.propTypes = {
  show: PropTypes.bool,
  direction: PropTypes.string,
};

function SavedPanel({ show, direction = "up" }) {
  const { savedLocations, deleteSavedLocation, tempUnit } = useAppSettings();
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
          className="savedPanel panel"
          initial={config.initial}
          animate={config.animate}
          exit={config.exit}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
        >
          {savedLocations.length ? (
            savedLocations.map((location, ind) => (
              <div className="location" key={location.name}>
                <span
                  className="loc"
                  onClick={() => openLocationFromList(location.name)}
                >
                  {location.name}
                </span>
                <TooltipIcon
                  title="close"
                  onBtnClick={() => deleteSavedLocation(location.name)}
                >
                  <CloseIcon />
                </TooltipIcon>
              </div>
            ))
          ) : (
            <NoLocationsPanel title="Saved" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SavedPanel;

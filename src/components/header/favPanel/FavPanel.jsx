import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import TooltipIcon from "../../utils/tooltipIcon/TooltipIcon";
import { useLocations } from "../../../context/LocationsContext";
import { useSearchedLocation } from "../../../context/SearchedLocationContext";
import { panelConfig } from "../../helpers/panelConfig";

FavPanel.propTypes = {
  show: PropTypes.bool,
  direction: PropTypes.string,
};

function FavPanel({ show, direction = "up" }) {
  const { favLocations, deleteFavLocation } = useLocations();
  const { setSearchedLocation } = useSearchedLocation();
  const config = panelConfig(direction);

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
                  onClick={() => setSearchedLocation(location.name)}
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
            <>
              <>
                <h3>No favorite locations yet</h3>
                <p>Start adding locations!</p>
              </>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FavPanel;

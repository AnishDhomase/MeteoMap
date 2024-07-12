import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import TooltipIcon from "../../utils/tooltipIcon/TooltipIcon";
import { useLocations } from "../../../context/LocationsContext";
import { useSearchedLocation } from "../../../context/SearchedLocationContext";

FavPanel.propTypes = {
  show: PropTypes.bool,
  setIsSavedPanelOpen: PropTypes.func,
};

function FavPanel({ show }) {
  const { favLocations, deleteFavLocation } = useLocations();
  const { setSearchedLocation } = useSearchedLocation();

  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.div
          className="favPanel panel"
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -30,
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
        >
          {favLocations.map((location, ind) => (
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
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FavPanel;

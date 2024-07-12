import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import TooltipIcon from "../../utils/tooltipIcon/TooltipIcon";
import { useLocations } from "../../../context/LocationsContext";
import { useSearchedLocation } from "../../../context/SearchedLocationContext";

SavedPanel.propTypes = {
  show: PropTypes.bool,
};

function SavedPanel({ show }) {
  const { savedLocations, deleteSavedLocation } = useLocations();
  const { setSearchedLocation } = useSearchedLocation();

  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.div
          className="savedPanel panel"
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
          {savedLocations.map((location, ind) => (
            <div className="location" key={location.name}>
              <span
                className="loc"
                onClick={() => setSearchedLocation(location.name)}
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
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SavedPanel;

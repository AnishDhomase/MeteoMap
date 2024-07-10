import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import TooltipIcon from "../../utils/tooltipIcon/TooltipIcon";

SavedPanel.propTypes = {
  show: PropTypes.bool,
};

function SavedPanel({ show }) {
  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.div
          className="savedPanel"
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
          <div className="location">
            <span className="loc">Junnar, Pune</span>
            <TooltipIcon title="close">
              <CloseIcon />
            </TooltipIcon>
          </div>
          <div className="location">
            <span className="loc">Pune, Maharashtra</span>
            <TooltipIcon title="close">
              <CloseIcon />
            </TooltipIcon>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SavedPanel;

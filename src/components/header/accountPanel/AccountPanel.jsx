import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TooltipIcon from "../../utils/tooltipIcon/TooltipIcon";
import { Typography } from "@mui/material";
import { useAppSettings } from "../../../context/SettingsContext";
import { panelConfig } from "../../../helpers/panelConfig";
import toast from "react-hot-toast";

AccountPanel.propTypes = {
  show: PropTypes.bool,
  direction: PropTypes.string,
};

function AccountPanel({ show, direction = "up" }) {
  const {
    tempUnit,
    theme,
    setTempUnit,
    setTheme,
    isAuthorized,
    setIsAuthorized,
  } = useAppSettings();
  const config = panelConfig(direction);

  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.div
          className="accPanel panel"
          initial={config.initial}
          animate={config.animate}
          exit={config.exit}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
        >
          <div className="toggles">
            <div className="toogleBox">
              <div className="mode">
                <TooltipIcon
                  title="Celsius"
                  onBtnClick={() => setTempUnit("C")}
                  active={tempUnit === "C"}
                >
                  <Typography
                    sx={
                      tempUnit === "C"
                        ? { padding: "0 4px", color: "#ffa952" }
                        : { padding: "0 4px" }
                    }
                  >
                    °C
                  </Typography>
                </TooltipIcon>
                <TooltipIcon
                  title="Fahrenheit"
                  onBtnClick={() => setTempUnit("F")}
                  active={tempUnit === "F"}
                >
                  <Typography
                    sx={
                      tempUnit === "F"
                        ? { padding: "0 4px", color: "#27296d" }
                        : { padding: "0 4px" }
                    }
                  >
                    °F{" "}
                  </Typography>
                </TooltipIcon>
              </div>
            </div>
            <div className="toogleBox">
              <div className="mode">
                <TooltipIcon
                  title="Light Mode"
                  onBtnClick={() => setTheme("light")}
                  active={theme === "light"}
                >
                  <LightModeIcon
                    sx={theme === "light" ? { color: "#ffa952" } : {}}
                  />
                </TooltipIcon>
                <TooltipIcon
                  title="Dark Mode"
                  onBtnClick={() => setTheme("dark")}
                  active={theme === "dark"}
                >
                  <DarkModeIcon
                    sx={theme === "dark" ? { color: "#27296d" } : {}}
                  />
                </TooltipIcon>
              </div>
            </div>
          </div>
          {isAuthorized && (
            <button
              className="logout btn"
              onClick={() => {
                toast.success(`Successfully Logout!`);
                setIsAuthorized(null);
              }}
            >
              LOGOUT
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AccountPanel;

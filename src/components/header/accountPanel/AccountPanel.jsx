import { Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

AccountPanel.propTypes = {
  show: PropTypes.bool,
};

function AccountPanel({ show }) {
  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.div
          className="accPanel"
          initial={{
            // scale: 0,
            x: 200,
            y: -200,
            rotate: 120,
          }}
          animate={{
            x: 0,
            y: 0,
            rotate: 0,
          }}
          exit={{
            x: 250,
            y: -200,
            rotate: 120,
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
        >
          <div className="toggles"></div>
          <Button variant="outlined">Login</Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AccountPanel;

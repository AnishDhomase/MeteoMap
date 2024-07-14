import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

TooltipIcon.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  isOn: PropTypes.bool,
  children: PropTypes.any,
  onBtnClick: PropTypes.func,
};

function TooltipIcon({ title, children, onBtnClick, active, isOn = false }) {
  return (
    <Tooltip title={title}>
      <IconButton
        variant="outlined"
        onClick={onBtnClick}
        style={active ? { background: "white" } : {}}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default TooltipIcon;

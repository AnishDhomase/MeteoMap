import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

TooltipIcon.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

function TooltipIcon({ title, children }) {
  return (
    <Tooltip title={title}>
      <IconButton variant="outlined">{children}</IconButton>
    </Tooltip>
  );
}

export default TooltipIcon;

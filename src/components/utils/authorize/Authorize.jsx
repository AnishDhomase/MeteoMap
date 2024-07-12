import { Button } from "@mui/material";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Authorize.propTypes = {
  isAuthorized: PropTypes.bool,
};

function Authorize({ isAuthorized }) {
  return (
    <>
      {isAuthorized ? (
        <p className="greet">Welcome, {isAuthorized.name}</p>
      ) : (
        <Link to="/authorization">
          <Button variant="outlined">Login</Button>
        </Link>
      )}
    </>
  );
}

export default Authorize;

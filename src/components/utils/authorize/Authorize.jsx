import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useAppSettings } from "../../../context/SettingsContext";

function Authorize() {
  const { isAuthorized } = useAppSettings();
  return (
    <div className="authorizeCompo">
      {isAuthorized ? (
        <p className="greet">Welcome, {isAuthorized.name}</p>
      ) : (
        <Link to="/authorization">
          <Button variant="outlined">Login</Button>
        </Link>
      )}
    </div>
  );
}

export default Authorize;

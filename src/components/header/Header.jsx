import { Badge } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TuneIcon from "@mui/icons-material/Tune";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";

import "./Header.css";
import AccountPanel from "./accountPanel/AccountPanel";
import SavedPanel from "./savedPanel/SavedPanel";
import FavPanel from "./favPanel/FavPanel";
import TooltipIcon from "../utils/tooltipIcon/TooltipIcon";
import Authorize from "../utils/authorize/Authorize";
import { useAppSettings } from "../../context/SettingsContext";
import { useLocations } from "../../context/LocationsContext";
import SearchedBox from "../utils/searchBar/SearchedBox";
import { Link } from "react-router-dom";
import { useViewport } from "react-viewport-hooks";
import toast from "react-hot-toast";

function Header() {
  const [isAccPanelOpen, setIsAccPanelOpen] = useState(false);
  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false);
  const [isFavPanelOpen, setIsFavPanelOpen] = useState(false);
  const { favLocations, savedLocations } = useLocations();
  const { vw } = useViewport();
  const {
    tempUnit,
    theme,
    setTempUnit,
    setTheme,
    isAuthorized,
    setIsAuthorized,
  } = useAppSettings();
  return (
    <nav className="navbar">
      {vw > 750 && (
        <div className="saved">
          <TooltipIcon
            title="Saved"
            onBtnClick={() => {
              if (!isAuthorized) {
                toast.error(`To Access Saved Locations
                   Try Login or SignUp!`);
                return;
              }
              setIsSavedPanelOpen((isSavedPanelOpen) => !isSavedPanelOpen);
              setIsFavPanelOpen(false);
            }}
            active={isSavedPanelOpen}
          >
            <Badge
              badgeContent={savedLocations.length}
              max={9}
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              <BookmarkIcon />
            </Badge>
          </TooltipIcon>
          <TooltipIcon
            title="Favourite"
            onBtnClick={() => {
              if (!isAuthorized) {
                toast.error(
                  `To Access Favourite Locations, 
                  Try Login or SignUp!`
                );
                return;
              }
              setIsFavPanelOpen((isFavPanelOpen) => !isFavPanelOpen);
              setIsSavedPanelOpen(false);
            }}
            active={isFavPanelOpen}
          >
            <Badge
              badgeContent={favLocations.length}
              max={9}
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              <FavoriteIcon />
            </Badge>
          </TooltipIcon>
          <SavedPanel show={isSavedPanelOpen} direction="up" />
          <FavPanel show={isFavPanelOpen} direction="up" />
        </div>
      )}

      <SearchedBox />

      {vw > 750 && (
        <div className="userSettings">
          <Authorize />
          <div className="menu">
            <TooltipIcon
              title="Menu"
              onBtnClick={() => setIsAccPanelOpen(!isAccPanelOpen)}
              active={isAccPanelOpen}
            >
              <TuneIcon />
            </TooltipIcon>
          </div>
          <AccountPanel show={isAccPanelOpen} direction="up" />
        </div>
      )}

      {vw <= 750 && (
        <div className="mobileLogin">
          <Link to="/authorization">
            <TooltipIcon
              title="Account"
              onBtnClick={() => setIsAccPanelOpen(!isAccPanelOpen)}
              active={isAccPanelOpen}
            >
              <PersonIcon />
            </TooltipIcon>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;

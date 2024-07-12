import { Badge } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import "./Header.css";
import AccountPanel from "./accountPanel/AccountPanel";
import SavedPanel from "./savedPanel/SavedPanel";
import FavPanel from "./favPanel/FavPanel";
import TooltipIcon from "../utils/tooltipIcon/TooltipIcon";
import Authorize from "../utils/authorize/Authorize";
import SearchedBox from "../searchBar/SearchedBox";
import { useAppSettings } from "../../context/SettingsContext";
import { useLocations } from "../../context/LocationsContext";

function Header() {
  const [isAccPanelOpen, setIsAccPanelOpen] = useState(false);
  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false);
  const [isFavPanelOpen, setIsFavPanelOpen] = useState(false);
  const { favLocations, savedLocations } = useLocations();

  const { isAuthorized } = useAppSettings();
  return (
    <nav className="navbar">
      <div className="saved">
        <TooltipIcon
          title="Saved"
          onBtnClick={() => {
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
        <SavedPanel show={isSavedPanelOpen} />
        <FavPanel show={isFavPanelOpen} />
      </div>

      <SearchedBox />

      <div className="userSettings">
        <div className="account">
          <Authorize isAuthorized={isAuthorized} />
          <TooltipIcon
            title="Account"
            onBtnClick={() => setIsAccPanelOpen(!isAccPanelOpen)}
            active={isAccPanelOpen}
          >
            <PersonIcon />
          </TooltipIcon>
        </div>
        <div className="menu">
          <TooltipIcon
            title="Saved"
            onBtnClick={() => setIsAccPanelOpen(!isAccPanelOpen)}
            active={isAccPanelOpen}
          >
            <MenuIcon />
          </TooltipIcon>
        </div>
        <AccountPanel show={isAccPanelOpen} />
      </div>
    </nav>
  );
}

export default Header;

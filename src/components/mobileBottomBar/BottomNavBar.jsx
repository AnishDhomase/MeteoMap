import { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge } from "@mui/material";

import TooltipIcon from "../utils/tooltipIcon/TooltipIcon";
import { useLocations } from "../../context/LocationsContext";
import SavedPanel from "../header/savedPanel/SavedPanel";
import FavPanel from "../header/favPanel/FavPanel";
import AccountPanel from "../header/accountPanel/AccountPanel";
import { useAppSettings } from "../../context/SettingsContext";
import toast from "react-hot-toast";

function BottomNavBar() {
  const [isAccPanelOpen, setIsAccPanelOpen] = useState(false);
  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false);
  const [isFavPanelOpen, setIsFavPanelOpen] = useState(false);
  const { favLocations, savedLocations } = useLocations();
  const {
    tempUnit,
    theme,
    setTempUnit,
    setTheme,
    isAuthorized,
    setIsAuthorized,
  } = useAppSettings();

  return (
    <div className="bottomNavBar">
      <TooltipIcon
        title="Saved"
        onBtnClick={() => {
          if (!isAuthorized) {
            toast.error(
              `To Access Saved Locations
               Try Login or SignUp!`
            );
            return;
          }
          setIsSavedPanelOpen((isSavedPanelOpen) => !isSavedPanelOpen);
          setIsFavPanelOpen(false);
          setIsAccPanelOpen(false);
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
          setIsAccPanelOpen(false);
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
      <TooltipIcon
        title="Menu"
        onBtnClick={() => {
          setIsAccPanelOpen(!isAccPanelOpen);
          setIsSavedPanelOpen(false);
          setIsFavPanelOpen(false);
        }}
        active={isAccPanelOpen}
      >
        <TuneIcon />
      </TooltipIcon>
      {<SavedPanel show={isSavedPanelOpen} direction="down" />}
      {<FavPanel show={isFavPanelOpen} direction="down" />}
      {<AccountPanel show={isAccPanelOpen} direction="down" />}
    </div>
  );
}

export default BottomNavBar;

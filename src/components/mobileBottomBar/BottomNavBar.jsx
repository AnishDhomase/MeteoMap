import { lazy, Suspense, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge } from "@mui/material";
import { useViewport } from "react-viewport-hooks";
import toast from "react-hot-toast";

import { useAppSettings } from "../../context/SettingsContext";
import TooltipIcon from "../utils/tooltipIcon/TooltipIcon";
import ComponentLoader from "../utils/componentLoader/ComponentLoader";
const AccountPanel = lazy(() => import("../header/accountPanel/AccountPanel"));
const FavPanel = lazy(() => import("../header/favPanel/FavPanel"));
const SavedPanel = lazy(() => import("../header/savedPanel/SavedPanel"));

function BottomNavBar() {
  const [isAccPanelOpen, setIsAccPanelOpen] = useState(false);
  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false);
  const [isFavPanelOpen, setIsFavPanelOpen] = useState(false);
  const { isAuthorized, favLocations, savedLocations } = useAppSettings();
  const { vw } = useViewport();

  const badgeColor = vw < 750 ? "success" : "primary";

  return (
    <Suspense fallback={<ComponentLoader />}>
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
            color={badgeColor}
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
            color={badgeColor}
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
    </Suspense>
  );
}

export default BottomNavBar;

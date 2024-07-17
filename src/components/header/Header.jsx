import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TuneIcon from "@mui/icons-material/Tune";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useViewport } from "react-viewport-hooks";
import { useState } from "react";

import "./Header.css";
import { useAppSettings } from "../../context/SettingsContext";
import TooltipIcon from "../utils/tooltipIcon/TooltipIcon";
import Authorize from "../utils/authorize/Authorize";
import SearchedBox from "../utils/searchBar/SearchedBox";
import { saveAccDataToLocalStorage } from "../../helpers/saveAccDataToLocalStorage";
import AccountPanel from "./accountPanel/AccountPanel";
import SavedPanel from "./savedPanel/SavedPanel";
import FavPanel from "./favPanel/FavPanel";
import { handleLogout } from "../../helpers/handleLogout";

function Header() {
  const [isAccPanelOpen, setIsAccPanelOpen] = useState(false);
  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false);
  const [isFavPanelOpen, setIsFavPanelOpen] = useState(false);
  const [isConsentBoxOpen, setIsConsentBoxOpen] = useState(false);
  const { vw } = useViewport();
  const {
    favLocations,
    savedLocations,
    isAuthorized,
    setIsAuthorized,
    setSavedLocations,
    setFavLocations,
  } = useAppSettings();

  const handleClose = () => {
    setIsConsentBoxOpen(false);
  };

  return (
    <>
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
            {!isAuthorized ? (
              <Link to="/authorization">
                <TooltipIcon
                  title="Account"
                  onBtnClick={() => setIsAccPanelOpen(!isAccPanelOpen)}
                  active={isAccPanelOpen}
                >
                  <PersonIcon />
                </TooltipIcon>
              </Link>
            ) : (
              <TooltipIcon
                title="Logout"
                onBtnClick={() => setIsConsentBoxOpen(!isAccPanelOpen)}
                active={true}
              >
                <LogoutIcon />
              </TooltipIcon>
            )}
          </div>
        )}
      </nav>

      {/* Consent Box to logout in mobile device */}
      <Dialog
        open={isConsentBoxOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              handleLogout(
                isAuthorized,
                savedLocations,
                favLocations,
                setIsAuthorized,
                setSavedLocations,
                setFavLocations,
                saveAccDataToLocalStorage
              );
              handleClose();
            }}
            autoFocus
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;

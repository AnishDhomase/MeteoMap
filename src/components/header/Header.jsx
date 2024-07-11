import { Badge, Button, IconButton } from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import SearchBarAutoComplete from "../searchBarAutoComplete/SearchBarAutoComplete";
import "./Header.css";
import AccountPanel from "./accountPanel/AccountPanel";
import { useState } from "react";
import SavedPanel from "./savedPanel/SavedPanel";
import FavPanel from "./favPanel/FavPanel";
import TooltipIcon from "../utils/tooltipIcon/TooltipIcon";

function Header() {
  const [isAccPanelOpen, setIsAccPanelOpen] = useState(false);
  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false);
  const [isFavPanelOpen, setIsFavPanelOpen] = useState(false);
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
            badgeContent={1}
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
            badgeContent={1}
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

      <div className="input">
        <SearchBarAutoComplete />
        <IconButton>
          <SearchIcon color="primary" />
        </IconButton>
      </div>

      <div className="userSettings">
        <div className="account">
          <Button variant="outlined">Login</Button>
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

import {
  backdropClasses,
  Badge,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import SearchBarAutoComplete from "../searchBarAutoComplete/SearchBarAutoComplete";
import "./Header.css";
import AccountPanel from "./accountPanel/AccountPanel";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function Header() {
  const [isAccPanelOpen, setIsAccPanelOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="saved">
        <Tooltip title="Saved">
          <IconButton variant="outlined">
            <Badge
              badgeContent={1}
              max={9}
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              <BookmarkIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Favourite">
          <IconButton variant="outlined">
            <Badge
              badgeContent={1}
              max={9}
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </div>

      <div className="input">
        <SearchBarAutoComplete />
        <IconButton>
          <SearchIcon color="primary" />
        </IconButton>
      </div>

      <div className="account">
        <Button variant="outlined">Login</Button>
        <Tooltip title="Account">
          <IconButton variant="outlined">
            <PersonIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div className="menu">
        <Tooltip title="Saved">
          <IconButton
            variant="outlined"
            onClick={() => setIsAccPanelOpen(!isAccPanelOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </div>

      <AccountPanel show={isAccPanelOpen} />
    </nav>
  );
}

export default Header;

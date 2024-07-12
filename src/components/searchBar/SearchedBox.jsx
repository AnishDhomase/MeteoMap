import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

import SearchBarAutoComplete from "./SearchBarAutoComplete";

function SearchedBox() {
  return (
    <div className="input">
      <SearchBarAutoComplete />
      <IconButton>
        <SearchIcon color="primary" />
      </IconButton>
    </div>
  );
}

export default SearchedBox;

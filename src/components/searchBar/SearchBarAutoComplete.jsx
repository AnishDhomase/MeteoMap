import { useSearchedLocation } from "../../context/SearchedLocationContext";

function SearchBarAutoComplete() {
  const { searchedLocation, setSearchedLocation } = useSearchedLocation();
  return (
    <input
      type="text"
      value={searchedLocation}
      onChange={(ev) => setSearchedLocation(ev.target.value)}
    />
  );
}

export default SearchBarAutoComplete;

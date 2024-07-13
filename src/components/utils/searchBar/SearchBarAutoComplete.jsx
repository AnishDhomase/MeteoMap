import { useSearchedLocation } from "../../../context/SearchedLocationContext";

function SearchBarAutoComplete() {
  const { searchedLocation, setSearchedLocation } = useSearchedLocation();
  return (
    <input
      type="text"
      placeholder="Search Places  . . ."
      value={searchedLocation}
      onChange={(ev) => setSearchedLocation(ev.target.value)}
    />
  );
}

export default SearchBarAutoComplete;

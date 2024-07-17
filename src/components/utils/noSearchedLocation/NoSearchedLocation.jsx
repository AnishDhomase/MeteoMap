import { formatDate } from "../../../helpers/dateTime";

function NoSearchedLocation() {
  return (
    <span className="NotData">
      <h1>Search Locations To get weather Updates!</h1>
      <p>{formatDate()}</p>
    </span>
  );
}

export default NoSearchedLocation;

import PropTypes from "prop-types";

NoLocationsPanel.propTypes = {
  title: PropTypes.string,
};

export default function NoLocationsPanel({ title }) {
  return (
    <div className="noLocationInPanel">
      <h3>No {title} Locations Found</h3>
      <p>Start adding locations!</p>
    </div>
  );
}

import PropTypes from "prop-types";

const Filter = ({ filter, setFilter, section }) => {
  return (
    <div className="filters">
      {["all", "high", "medium", "low"].map((priority) => (
        <button
          key={`${section}-${priority}`}
          className={filter === priority ? "active" : ""}
          onClick={() => setFilter(priority)}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </button>
      ))}
    </div>
  );
};

// Define prop types for the Filter component
Filter.propTypes = {
  filter: PropTypes.string.isRequired, // The current priority filter (e.g., "all", "high", etc.)
  setFilter: PropTypes.func.isRequired, // Function to update the priority filter
  section: PropTypes.string.isRequired, // Section name for unique button keys (e.g., "upcoming", "overdue")
};

export default Filter;

// import React, { useState } from "react";
import "./AppHeader.css";
import PropTypes from "prop-types";

const AppHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="app-header">
      console.log(tasks);
      <h1>Task Manager</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired, // The current priority filter (e.g., "all", "high", etc.)
  setSearchTerm: PropTypes.func.isRequired, // Function to update the priority filter
};

export default AppHeader;

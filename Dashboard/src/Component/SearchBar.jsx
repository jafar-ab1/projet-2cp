import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");

  // Function to format the date
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const today = new Date();

  // Function to handle search
  const handleSearch = () => {
    if (query.trim() !== "") {
      console.log("Searching for:", query);
      // You can replace this with actual search logic
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="Container">
      <div className="Top">
        <div className="Search">
          <input
            type="text"
            placeholder="Search for rooms and offers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress} // Trigger search on Enter
          />
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        <div className="Right">
          <img src="#" className="icon" alt="icon" />
          <img src="#" className="icon" alt="icon" />
        </div>
      </div>
      <div className="Bottom">
        <p className="Date">{formatDate(today)}</p>
        <button className="booking">Create booking</button>
      </div>
    </div>
  );
}

export default SearchBar;

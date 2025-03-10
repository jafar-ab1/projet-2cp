import React from "react";
import Sidebar from "./Component/Sidebar.jsx";
import SearchBar from "./Component/SearchBar.jsx";
import "./App.css"
function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <SearchBar />
        </div>
        {/* Rest of your content here */}
      </div>
    </div>
  );
}

export default App;

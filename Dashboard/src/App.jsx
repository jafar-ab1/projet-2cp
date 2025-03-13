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


/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Component/Sidebar.jsx";
import overview from "./Component/overview.jsx";
import Rooms from "./Component/Rooms.jsx";
import Statistics from "./Component/Statistics.jsx";
import Feedback from "./Component/Feedback.jsx";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Overview data={data.overview} />
        <Rooms rooms={data.rooms} />
        <Statistics stats={data.statistics} />
        <Feedback feedback={data.feedback} />
      </div>
    </div>
  );
};

export default Dashboard;
*/
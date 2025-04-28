import React, { useState, useEffect } from 'react';
import './OccupancyStatistic.css';

const OccupancyStatistic = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchOccupancyStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/reservation/dash/occupancy/${selectedYear}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch occupancy data');
        }
        
        const data = await response.json();
        
        // Transform data to match our display format
        const formattedStats = data.occupancyStatistics.map(item => ({
          month: item.month,
          rate: item.occupancyRate
        }));
        
        setStats(formattedStats);
      } catch (err) {
        console.error('Error fetching occupancy stats:', err);
        setError('Failed to load occupancy statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchOccupancyStats();
  }, [selectedYear]);

  // Month order as shown in your screenshot
  const monthOrder = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="occupancy-card">
      <div className="card-header">
        <h2>Occupancy statistics</h2>
        <div className="year-selector">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            disabled={loading}
          >
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div className="month-stats">
          {monthOrder.map(month => {
            const monthData = stats.find(s => s.month === month) || { month, rate: 0 };
            return (
              <div key={month} className="month-stat">
                <div className="month-name">{month}</div>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar" 
                    style={{ height: `${monthData.rate}%` }}
                    title={`${monthData.rate}% occupancy`}
                  >
                    <span className="stat-value">{monthData.rate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OccupancyStatistic;
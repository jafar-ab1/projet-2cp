import "./OccupancyStatistic.css"

const OccupancyStatistics = () => {
  // Data from the image
  const occupancyData = [60, 70, 100, 65, 95, 85, 95, 75, 65, 75, 85, 95]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <section className="occupancy-statistics">
      <h3>Occupancy statistics</h3>
      <div className="bar-chart">
        {occupancyData.map((d, idx) => (
          <div key={idx} className="bar" style={{ height: `${d}%` }}>
            <span>{d}%</span>
            <label>{months[idx]}</label>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OccupancyStatistics

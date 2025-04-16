import "./Overview.css"

const Overview = () => {
  return (
    <section className="overview">
      <h3>Overview</h3>
      <div className="stats">
        <div>
          <strong>23</strong>
          Today's <span>check-in</span>
        </div>
        <div>
          <strong>13</strong>
          Today's <span>check-out</span>
        </div>
        <div>
          <strong>60</strong>
          Total <span>In hotel</span>
        </div>
        <div>
          <strong>10</strong>
          Total <span>Available rooms</span>
        </div>
        <div>
          <strong>90</strong>
          Total <span>Occupied rooms</span>
        </div>
      </div>
    </section>
  )
}

export default Overview

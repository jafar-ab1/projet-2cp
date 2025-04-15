import "./Floor.css"

const FloorStatus = () => {
  return (
    <section className="floor-status">
      <h3>Floor status</h3>
      <div className="circle">70%</div>
      <div className="legend">
        <span className="completed">Completed</span>
        <span className="yet">Yet to complete</span>
      </div>
    </section>
  )
}

export default FloorStatus

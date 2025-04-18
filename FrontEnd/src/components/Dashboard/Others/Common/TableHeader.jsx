const TableHeader = ({ title, leftActions, rightActions }) => {
    return (
      <>
        <h3>{title}</h3>
        <div className="top-actions">
          <div className="left-actions">{leftActions}</div>
          <div className="right-actions">{rightActions}</div>
        </div>
      </>
    )
  }
  
  export default TableHeader
  
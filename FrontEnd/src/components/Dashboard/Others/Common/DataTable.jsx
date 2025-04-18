import StatusBadge from "./StatusBadge"

const DataTable = ({ columns, data }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
          <th></th> {/* Actions column */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {column.isStatus ? (
                  <StatusBadge status={row[column.accessor]} />
                ) : column.isBold ? (
                  <strong>{row[column.accessor]}</strong>
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
            <td className="actions">⋮</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable

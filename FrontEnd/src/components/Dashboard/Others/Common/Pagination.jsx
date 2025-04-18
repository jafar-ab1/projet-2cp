"use client"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers array
  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    totalPages > 1 && (
      <div className="pagination">
        <button
          className="prev-next"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          {"< previous"}
        </button>

        {getPageNumbers().map((page) => (
          <button key={page} className={currentPage === page ? "active" : ""} onClick={() => onPageChange(page)}>
            {page}
          </button>
        ))}

        <button
          className="prev-next"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {"Next >"}
        </button>
      </div>
    )
  )
}

export default Pagination

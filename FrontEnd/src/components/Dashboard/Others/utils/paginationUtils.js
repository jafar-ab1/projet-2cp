/**
 * Get paginated data from an array
 * @param {Array} data - The full data array
 * @param {number} currentPage - Current page number (1-based)
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Array} - The current page data
 */
export const getPaginatedData = (data, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return data.slice(indexOfFirstItem, indexOfLastItem)
  }
  
  /**
   * Calculate total number of pages
   * @param {number} totalItems - Total number of items
   * @param {number} itemsPerPage - Number of items per page
   * @returns {number} - Total number of pages
   */
  export const calculateTotalPages = (totalItems, itemsPerPage) => {
    return Math.ceil(totalItems / itemsPerPage)
  }
  
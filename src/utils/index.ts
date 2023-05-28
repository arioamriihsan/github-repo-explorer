/**
 * Function to check if value is empty
 * 
 * @param {*} value
 * @returns {boolean}
 */
export const isEmpty = (value: any): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);
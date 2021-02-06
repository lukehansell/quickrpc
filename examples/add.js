/**
 * Request parameters
 * @typedef {Object} AddRequest
 * @property {number} a
 * @property {number} b
 */

/**
 * Adds two numbers together
 * @param {AddRequest} request - request parameters
 */
const add = ({a, b}) => a + b

module.exports = add
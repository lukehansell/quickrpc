/**
 * Request parameters
 *
 * @typedef {Object} MultiplyRequest
 * @property {number} a
 * @property {number} b
 */

/**
 * Multiplies two numbers
 *
 * @param {MultiplyRequest} param0
 */
const multiply = ({a, b}) => a * b

module.exports = multiply

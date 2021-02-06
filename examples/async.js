/**
 * Request parameters
 *
 * @typedef {Object} AsyncRequest
 * @property {number} timeout
 */

/**
 * Returns the delay taken to respond from the timeout
 *
 * @param {AsyncRequest} param0
 */
const asyncExample = async ({ timeout }) => {
  const start = Date.now()
  const result = await delayedResponse(timeout)
  return `request took ${result - start}`
}

const delayedResponse = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(Date.now())
    }, timeout)
  })
}

module.exports = asyncExample

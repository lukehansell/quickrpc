const { getMethods } = require('../lib')

const rpcRoute = (directory, body) => new Promise((resolve, reject) => {
  if (!body) {
    throw new Error('RPC request was expecting some data')
  }

  const methods = getMethods(directory)
  const json = JSON.parse(body)
  const keys = Object.keys(json)

  const promiseArr = keys.map(key => {
    if (methods[key] && typeof (methods[key].exec === 'function')) {
      const execPromise = methods[key].exec.call(null, json[key])
      if (!(execPromise instanceof Promise)) {
        return Promise.resolve(execPromise)
      }
      return execPromise
    } else {
      return Promise.resolve({
        error: 'method not defined'
      })
    }
  })

  Promise.all(promiseArr).then(iter => {
    const response = {}
    iter.forEach((val, index) => {
      response[keys[index]] = val
    })

    resolve(response)
  }).catch(err => {
    reject(err)
  })
})

module.exports = rpcRoute
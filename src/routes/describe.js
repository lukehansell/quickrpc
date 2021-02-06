const { getMethods, getTypes } = require('../lib')

const describeRoute = directory => {
  const methods = getMethods(directory)

  return Promise.resolve({
    types: getTypes(directory),
    methods: Object.keys(methods).reduce((acc, method) => {
      return {
        ...acc,
        [method]: JSON.parse(JSON.stringify(methods[method]))
      }
    }, {})
  })
}

module.exports = describeRoute

const fs = require('fs')
const path = require('path')
const jsdoc = require('jsdoc-api')

path.basename(process.cwd())

const getMethods = (directory) => {
  const files = fs.readdirSync(directory)
  return files.reduce((acc, file) => {
    return {
      ...acc,
      [file.replace(/\.[t|j]sx?$/, '')]: {
        exec: require(path.resolve(directory, file))
      }
    }
  }, {})
}

const getTypes = (directory) => {
  const files = fs.readdirSync(directory).map(file => path.resolve(directory, file))
  const docs = jsdoc.explainSync({ files })
  const functions = docs.filter(doc => doc.kind === 'function')

  return functions.reduce((acc, func) => {
    if (func.undocumented) return acc
    requestType = docs.find(doc => {
      if (func.params.length === 0) return false
      if (!(typeof func.params[0] === 'object' && func.params[0] !== null)) return false
      const requestParam = func.params[0]
      const type = requestParam.type || {}
      const names = type.names || []
      return names.includes(doc.longname)
    })


    const props = (requestType || {}).properties || []

    return {
      ...acc,
      [func.name]: {
        description: func.description,
        props: props.reduce((acc, prop) => {
          return {
            ...acc,
            [prop.name]: prop.type.names
          }
        }, {})
      }
    }
  }, {})
}

module.exports = {
  getMethods,
  getTypes
}

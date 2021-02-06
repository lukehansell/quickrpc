const http = require('http')
const url = require('url')

const rpcRoute = require('./routes/rpc')
const describeRoute = require('./routes/describe')

const requestListener = (routes, directory) => (request, response) => {
  const reqUrl = `http://${request.headers.host}${request.url}`
  const parsedUrl = url.parse(reqUrl, true)
  const pathname = parsedUrl.pathname

  response.setHeader('Content-Type', 'application/json')

  let buff = null

  request.on('data', data => {
    if(buff === null) {
      buff = data
    } else {
      buff = buff + data
    }
  })

  request.on('end', () => {
    const body = buff !== null ? buff.toString() : null

    if (routes[pathname]) {
      const compute = routes[pathname].call(null, directory, body)

      if (!(compute instanceof Promise)) {
        response.statusCode = 500
        response.end('server error')
        console.warn('rpc was not a promise')
      } else {
        compute.then(res => response.end(JSON.stringify(res)))
        .catch(err => {
          console.error(err)
          response.statusCode = 500
          response.end('server error')
        })
      }
    } else {
      response.statusCode = 404
      response.end(`${pathname} not found`)
    }
  })
}

const run = (directory, { port = 9090 }) => {
  const routes = {
    '/rpc': rpcRoute,
    '/describe': describeRoute
  }

  const server = http.createServer(requestListener(routes, directory))
  server.listen(port, () => {
    console.log(`server listening on localhost:${port}`)
  })
}

module.exports = run

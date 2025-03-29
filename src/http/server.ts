import http from 'node:http'
import { extractQueryParams } from '../utils/extract-query-params'
import { json } from './middlewares/json'
import { routes } from './routes'

const server = http.createServer(async (req, res) => {
  const { url, method } = req

  await json(req, res)

  if (!url) {
    return res.writeHead(400).end()
  }

  const route = routes.find(
    route => route.method === method && route.path.test(url)
  )

  if (!route) {
    return res.writeHead(404).end()
  }

  const routeParams = url.match(route.path)

  if (routeParams?.groups) {
    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}
  }

  return route.handler(req, res)
})

server.listen(3333)

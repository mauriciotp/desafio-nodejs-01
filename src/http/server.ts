import http from 'node:http'
import { json } from './middlewares/json'
import { routes } from './routes'

const server = http.createServer(async (req, res) => {
  const { url, method } = req

  await json(req, res)

  const route = routes.find(
    route => route.method === method && route.path === url
  )

  if (!route) {
    return res.writeHead(404).end()
  }

  return route.handler(req, res)
})

server.listen(3333)

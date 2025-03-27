import { IncomingMessage, ServerResponse } from 'node:http'

export const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req: IncomingMessage, res: ServerResponse) => {
      res.end(JSON.stringify(req.body))
    },
  },
]

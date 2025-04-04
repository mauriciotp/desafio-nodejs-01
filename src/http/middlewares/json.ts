import { IncomingMessage, ServerResponse } from 'node:http'

declare module 'node:http' {
  interface IncomingMessage {
    body?: unknown
    params: Record<string, string>
    query: Record<string, string>
  }
}

export async function json(req: IncomingMessage, res: ServerResponse) {
  const buffers: Buffer[] = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  res.setHeader('Content-Type', 'application/json')
}

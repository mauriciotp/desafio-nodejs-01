import { IncomingMessage, ServerResponse } from 'node:http'
import { Database } from '../database/db'
import { CreateTaskDto } from './dtos/create-task-dto'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: '/tasks',
    handler: (req: IncomingMessage, res: ServerResponse) => {
      const task = req.body as CreateTaskDto

      database.create('tasks', task)

      res.writeHead(201).end()
    },
  },
  {
    method: 'GET',
    path: '/tasks',
    handler: (_: IncomingMessage, res: ServerResponse) => {
      const tasks = database.findAll('tasks')

      res.writeHead(201).end(JSON.stringify(tasks))
    },
  },
]

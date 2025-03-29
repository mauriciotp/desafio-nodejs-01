import { IncomingMessage, ServerResponse } from 'node:http'
import { Database } from '../database/db'
import { buildRoutePath } from '../utils/build-route-path'
import { CreateTaskDto } from './dtos/create-task-dto'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req: IncomingMessage, res: ServerResponse) => {
      const task = req.body as CreateTaskDto

      database.create('tasks', task)

      res.writeHead(201).end()
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (_: IncomingMessage, res: ServerResponse) => {
      const tasks = database.findAll('tasks')

      res.writeHead(200).end(JSON.stringify(tasks))
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req: IncomingMessage, res: ServerResponse) => {
      const { id } = req.params

      try {
        database.delete('tasks', id)
        res.writeHead(204).end()
      } catch (e) {
        if (e instanceof Error) {
          res.writeHead(404).end(e.message)
        }
      }
    },
  },
]

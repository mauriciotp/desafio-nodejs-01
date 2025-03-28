import { CreateTaskDto } from '../http/dtos/create-task-dto'
import { DatabaseTask, TaskMapper } from '../http/mappers/task-mapper'
import { Task } from './models/task'

type Tables = 'tasks'
type Data = DatabaseTask

export class Database {
  private database: Record<Tables, Data[]> = {
    tasks: [],
  }

  create(table: Tables, { title, description }: CreateTaskDto) {
    const task = Task.create({
      title,
      description,
    })

    const databaseTask = TaskMapper.toDatabase(task)

    if (!this.database[table]) {
      this.database[table] = [databaseTask]
    }

    this.database[table].push(databaseTask)
  }

  findAll(table: Tables) {
    return this.database[table] ?? []
  }
}

import { Task } from '../../database/models/task'

export interface DatabaseTask {
  id: string
  title: string
  description: string
  completedAt?: Date | null
  createdAt: Date
  updatedAt?: Date
}

export class TaskMapper {
  static toDatabase(raw: Task): DatabaseTask {
    return {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      completedAt: raw.completedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
}

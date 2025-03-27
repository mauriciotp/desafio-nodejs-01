import { randomUUID } from 'node:crypto'
import { Optional } from '../../types/optional'

interface TaskProps {
  title: string
  description: string
  completedAt?: Date
  createdAt: Date
  updatedAt?: Date
}

export class Task {
  id: string
  props: TaskProps

  constructor(props: TaskProps, id: string) {
    this.props = props
    this.id = id
  }

  static create(props: Optional<TaskProps, 'createdAt'>, id?: string) {
    const taskId = id ?? randomUUID()

    const task = new Task(
      {
        createdAt: props.completedAt ?? new Date(),
        ...props,
      },
      taskId
    )

    return task
  }
}

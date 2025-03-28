import { randomUUID } from 'node:crypto'
import { Optional } from '../../types/optional'

interface TaskProps {
  title: string
  description: string
  completedAt?: Date | null
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

  get title() {
    return this.props.title
  }

  set title(newTitle: string) {
    this.props.title = newTitle
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(newDescription: string) {
    this.props.description = newDescription
    this.touch()
  }

  get completedAt() {
    return this.props.completedAt
  }

  set completedAt(completedDate: Date | undefined | null) {
    this.props.completedAt = completedDate
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<TaskProps, 'createdAt'>, id?: string) {
    const taskId = id ?? randomUUID()

    const task = new Task(
      {
        createdAt: props.completedAt ?? new Date(),
        completedAt: props.completedAt ?? null,
        updatedAt: props.updatedAt ?? new Date(),
        ...props,
      },
      taskId
    )

    return task
  }
}

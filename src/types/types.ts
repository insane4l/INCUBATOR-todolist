export type TodoListType = {
    title: string
    tasks: Array<TodoListItemType>
}

export type TodoListItemType = {
    title: string
    isDone: boolean
    id: number
}
import { apiBase, ResponseType } from "./API"

export const taskListsAPI = {
    getTasks(todoListId: string) {
        return apiBase.get<GetTasksResponseType>(`/todo-lists/${todoListId}/tasks`).then(res => res.data);
    },
    createTask(todoListId: string, title: string) {
        return apiBase.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todoListId}/tasks`, {title}).then(res => res.data);
    },
    deleteTask(todoListId: string, taskId: string) {
        return apiBase.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`).then(res => res.data);
    },
    updateTask(todoListId: string, taskId: string, newTaskProperties: UpdateTaskModelType) {
        return apiBase.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todoListId}/tasks/${taskId}`, newTaskProperties).then(res => res.data);
    },
    changeTaskOrder(todoListId: string, taskId: string, putAfterTaskId: string | null = null) {
        return apiBase.put(`/todo-lists/${todoListId}/tasks/${taskId}/reorder`, {putAfterItemId: putAfterTaskId}).then(res => res.data);
    },
}





type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type TaskType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later,
}

export type UpdateTaskModelType = {
    title: string
    description: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
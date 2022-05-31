import { apiBase, ResponseType } from "./API"

export const todoListsAPI = {
    getTodoLists() {
        return apiBase.get<TodoListType[]>('/todo-lists').then(res => res.data);
    },
    createTodoList(title: string) {
        return apiBase.post<ResponseType<{item: TodoListType}>>('/todo-lists', {title}).then(res => res.data);
    },
    deleteTodoList(id: string) {
        return apiBase.delete<ResponseType>(`/todo-lists/${id}`).then(res => res.data);
    },
    updateTodoList(id: string, title: string) {
        return apiBase.put<ResponseType>(`/todo-lists/${id}`, {title}).then(res => res.data);
    },
    changeTodoListOrder(todoListId: string, putAfterTodoListId: string | null = null) {
        return apiBase.put<ResponseType>(`/todo-lists/${todoListId}/reorder`, {putAfterItemId: putAfterTodoListId}).then(res => res.data);
    },
}


export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
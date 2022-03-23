import {v1} from 'uuid';
import { FilterValuesType } from '../components/TodoList/FilterPanel';


export const todoListsId = [
    v1(), v1(), v1(),
]


let initialState = [
    {id: todoListsId[0], title: "Must Learn", currentFilter: 'all', isCollapsed: true} as TodoListType,
    {id: todoListsId[1], title: "Job Search", currentFilter: 'all', isCollapsed: true} as TodoListType,
    {id: todoListsId[2], title: "Some Goals", currentFilter: 'all', isCollapsed: true} as TodoListType,
]

export type TodoListType = { id: string, title: string, currentFilter: FilterValuesType, isCollapsed: boolean }
export type TodoListsStateType = typeof initialState;

const todoListsReducer = (state: TodoListsStateType = initialState, action: TodoListsActionsType): TodoListsStateType => {
    switch(action.type) {
        case 'tl/TODO-LISTS/CHANGE-TODOLIST-TITLE': 
            return [
                ...state.map(el => (
                    el.id === action.payload.todoListId
                    ? {...el, title: action.payload.newTitle}
                    : el
                ))
            ]
        case 'tl/TODO-LISTS/CHANGE-TODOLIST-FILTER': 
            return [
                ...state.map(el => (
                    el.id === action.payload.todoListId
                    ? {...el, currentFilter: action.payload.filter}
                    : el
                ))
            ]
        case 'tl/TODO-LISTS/ADD-NEW-TODOLIST': 
            return [
                {id: action.payload.newTodolistId, title: action.payload.title, currentFilter: 'all', isCollapsed: false}, // id should be in payload.... change tasklistsReducer also and tests (NOT POSSIBLE v1() in pure function)
                ...state
            ]
        case 'tl/TODO-LISTS/DELETE-TODOLIST': 
            return [
                ...state.filter(el => el.id !== action.payload.todoListId)
            ]
        case 'tl/TODO-LISTS/TOGGLE-TODOLIST-COLLAPSE': 
            return [
                ...state.map(el => (
                    el.id === action.payload.todoListId
                    ? {...el, isCollapsed: !el.isCollapsed}
                    : el
                ))
            ]
        case 'tl/TODO-LISTS/COLLAPSE-ALL': 
            return [
                ...state.map(el => ({...el, isCollapsed: true}))
            ]
        case 'tl/TODO-LISTS/UNCOLLAPSE-ALL': 
            return [
                ...state.map(el => ({...el, isCollapsed: false}))
            ]
        default: return state;
    }
}


type TodoListsActionsType = ReturnType<typeof changeTodolistTitleAC> 
| ReturnType<typeof changeTodolistFilterAC> | ReturnType<typeof addNewTodolistAC> 
| ReturnType<typeof deleteTodolistAC> | ReturnType<typeof toggleTodolistCollapseAC>
| ReturnType<typeof collapseAllTodoListsAC> | ReturnType<typeof uncollapseAllTodoListsAC>


export const changeTodolistTitleAC = (todoListId: string, newTitle: string) => (
    {type: 'tl/TODO-LISTS/CHANGE-TODOLIST-TITLE', payload: {todoListId, newTitle}} as const
)
export const changeTodolistFilterAC = (todoListId: string, filter: FilterValuesType) => (
    {type: 'tl/TODO-LISTS/CHANGE-TODOLIST-FILTER', payload: {todoListId, filter}} as const
)
export const addNewTodolistAC = (newTodolistId: string, title: string) => (
    {type: 'tl/TODO-LISTS/ADD-NEW-TODOLIST', payload: {newTodolistId, title}} as const
)
export const deleteTodolistAC = (todoListId: string) => (
    {type: 'tl/TODO-LISTS/DELETE-TODOLIST', payload: {todoListId}} as const
)
export const toggleTodolistCollapseAC = (todoListId: string) => (
    {type: 'tl/TODO-LISTS/TOGGLE-TODOLIST-COLLAPSE', payload: {todoListId}} as const
)
export const collapseAllTodoListsAC = () => (
    {type: 'tl/TODO-LISTS/COLLAPSE-ALL'} as const
)
export const uncollapseAllTodoListsAC = () => (
    {type: 'tl/TODO-LISTS/UNCOLLAPSE-ALL'} as const
)



export default todoListsReducer;
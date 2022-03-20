import {v1} from 'uuid';
import { FilterValuesType } from '../App';

export const todoListsId = [
    v1(), v1(), v1(),
]


let initialState = [
    {id: todoListsId[0], title: "Must Learn", currentFilter: 'all', isCollapsed: true},
    {id: todoListsId[1], title: "Job Search", currentFilter: 'all', isCollapsed: true},
    {id: todoListsId[2], title: "Some Goals", currentFilter: 'all', isCollapsed: true},
]

type todoListsStateType = typeof initialState;

const todoListsReducer = (state: todoListsStateType = initialState, action: TodoListsActionsType): todoListsStateType => {
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
                ...state,
                {id: action.payload.newTodolistId, title: action.payload.title, currentFilter: 'all', isCollapsed: false} // id should be in payload.... change tasklistsReducer also and tests (NOT POSSIBLE v1() in pure function)
            ]
        case 'tl/TODO-LISTS/DELETE-TODOLIST': 
            return [
                ...state.filter(el => el.id !== action.payload.todoListId)
            ]
        default: return state;
    }
}


type TodoListsActionsType = ReturnType<typeof changeTodolistTitleAC> 
| ReturnType<typeof changeTodolistFilterAC> | ReturnType<typeof addNewTodolistAC> 
| ReturnType<typeof deleteTodolistAC>


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


export default todoListsReducer;
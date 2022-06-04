import { Dispatch } from 'react';
import { TodoListType } from '../api/todoListsAPI';
import { FilterValuesType } from '../components/TodoList/FilterPanel';
import { todoListsAPI } from '../api/todoListsAPI';
import { setAppRequestStatusAC } from './appReducer';
import { handleAPIResponseError, handleHTTPResponseError } from '../utils/serverErrors';


let initialState = [

] as TodoListDomainType[]

const todoListsReducer = (state: TodoListsStateType = initialState, action: TodoListsActionsType): TodoListsStateType => {
    switch(action.type) {
        case 'tl/TODO-LISTS-TASK-LISTS/SET-TODOLISTS':
            return action.todoLists.map(el => ({...el, currentFilter: 'all', isCollapsed: true, requestStatus: 'idle'}))
        case 'tl/TODO-LISTS/CHANGE-TODOLIST-TITLE': 
            return [
                ...state.map(el => (
                    el.id === action.payload.todoListId
                    ? {...el, title: action.payload.newTitle}
                    : el
                ))
            ]
        case 'tl/TODO-LISTS/SET-TODOLIST-REQUEST-STATUS':
            return [
                ...state.map(el => (
                    el.id === action.payload.todoListId 
                    ? {...el, requestStatus: action.payload.status} 
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
        case 'tl/TODO-LISTS-TASK-LISTS/ADD-NEW-TODOLIST': 
            return [
                {...action.newTodoList, currentFilter: 'all', isCollapsed: false, requestStatus: 'idle'},
                ...state
            ]
        case 'tl/TODO-LISTS-TASK-LISTS/DELETE-TODOLIST': 
            return [...state.filter(el => el.id !== action.payload.todoListId)]
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
| ReturnType<typeof setTodolistsAC> | ReturnType<typeof setTodolistRequestStatusAC>


export const setTodolistsAC = (todoLists: TodoListType[]) => (
    {type: 'tl/TODO-LISTS-TASK-LISTS/SET-TODOLISTS', todoLists} as const
)
export const addNewTodolistAC = (newTodoList: TodoListType) => (
    {type: 'tl/TODO-LISTS-TASK-LISTS/ADD-NEW-TODOLIST', newTodoList} as const
)
export const deleteTodolistAC = (todoListId: string) => (
    {type: 'tl/TODO-LISTS-TASK-LISTS/DELETE-TODOLIST', payload: {todoListId}} as const
)
export const changeTodolistTitleAC = (todoListId: string, newTitle: string) => (
    {type: 'tl/TODO-LISTS/CHANGE-TODOLIST-TITLE', payload: {todoListId, newTitle}} as const
)
export const setTodolistRequestStatusAC = (todoListId: string, status: TodoListRequestStatusType) => (
    {type: 'tl/TODO-LISTS/SET-TODOLIST-REQUEST-STATUS', payload: {todoListId, status}} as const
)
export const changeTodolistFilterAC = (todoListId: string, filter: FilterValuesType) => (
    {type: 'tl/TODO-LISTS/CHANGE-TODOLIST-FILTER', payload: {todoListId, filter}} as const
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




export const requestTodoListsTC = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch( setAppRequestStatusAC('loading') );
        let todoLists = await todoListsAPI.getTodoLists();
        dispatch( setAppRequestStatusAC('idle') );

        dispatch(setTodolistsAC(todoLists));

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}


export const addNewTodolistTC = (title: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch( setAppRequestStatusAC('loading') );
        let response = await todoListsAPI.createTodoList(title);
        // dispatch( setAppRequestStatusAC('idle') );

        // if (response.resultCode === ResponseResultCodesEnum.Success) {
        //     dispatch(addNewTodolistAC(response.data.item));
        // }
        // handleServerRequestError(response.messages[0], dispatch);

        handleAPIResponseError<typeof addNewTodolistAC>(response, dispatch, addNewTodolistAC, [response.data.item]);

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}


export const changeTodolistTitleTC = (todoListId: string, newTitle: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch( setAppRequestStatusAC('loading') );
        const response = await todoListsAPI.updateTodoList(todoListId, newTitle);
        // dispatch( setAppRequestStatusAC('idle') );

        // if (response.resultCode === ResponseResultCodesEnum.Success) {
        //     dispatch(changeTodolistTitleAC(todoListId, newTitle));
        // }
        // handleServerRequestError(response.messages[0], dispatch);

        handleAPIResponseError<typeof changeTodolistTitleAC>(response, dispatch, changeTodolistTitleAC, [todoListId, newTitle]);

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}


export const deleteTodolistTC = (todoListId: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch( setAppRequestStatusAC('loading') );
        dispatch( setTodolistRequestStatusAC(todoListId, 'loading') );
        const response = await todoListsAPI.deleteTodoList(todoListId);
        dispatch( setTodolistRequestStatusAC(todoListId, 'idle') );
        // dispatch( setAppRequestStatusAC('idle') );

        // if (response.resultCode === ResponseResultCodesEnum.Success) {
        //     dispatch(deleteTodolistAC(todoListId));
        // }
        // handleServerRequestError(response.messages[0], dispatch);

        handleAPIResponseError<typeof deleteTodolistAC>(response, dispatch, deleteTodolistAC, [todoListId]);
        
    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
        dispatch( setTodolistRequestStatusAC(todoListId, 'idle') );
    }
}


export default todoListsReducer;


export type TodoListRequestStatusType = 'idle' | 'loading'
export type TodoListDomainType = TodoListType & {currentFilter: FilterValuesType, isCollapsed: boolean, requestStatus: TodoListRequestStatusType}
export type TodoListsStateType = typeof initialState;
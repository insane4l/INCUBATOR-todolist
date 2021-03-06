import { Dispatch } from 'react';
import { ResponseResultCodesEnum } from '../api/API';
import { taskListsAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from '../api/taskListsAPI';
import { handleAPIResponseError, handleHTTPResponseError } from '../utils/serverErrors';
import { setAppMessageAC, setAppRequestStatusAC } from './appReducer';
import { AppRootStateType } from './store';
import { addNewTodolistAC, deleteTodolistAC, setTodolistsAC } from './todoListsReducer';


let initialState = {};

type TaskListsStateType = {
    [key: string]: Array<TaskType>
}

const taskListsReducer = (state: TaskListsStateType = initialState, action: TaskListsActionsType): TaskListsStateType => {
    switch(action.type) {
        case 'tl/TODO-LISTS-TASK-LISTS/SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todoLists.forEach(el => {
                stateCopy[el.id] = [];
            });

            return stateCopy;
        }
        case 'tl/TASK-LISTS/SET-TASKS': 
            return {
                ...state,
                [action.todoListId]: action.tasks
            }
        // case 'tl/TASK-LISTS/TOGGLE-TASK-STATUS': 
        //     return {
        //         ...state,
        //         [action.payload.todoListId]: state[action.payload.todoListId].map(el => (
        //             el.id === action.payload.taskId 
        //             ? {...el, status: el.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed }
        //             : el ))
        //     }
        // case 'tl/TASK-LISTS/CHANGE-TASK-TITLE': 
        //     return {
        //         ...state,
        //         [action.payload.todoListId]: state[action.payload.todoListId].map(el => (
        //             el.id === action.payload.taskId
        //             ? {...el, title: action.payload.newTitle }
        //             : el ))
        //     }
        case 'tl/TASK-LISTS/TASK-UPDATED': 
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => (
                    el.id === action.payload.taskId
                    ? {...el, ...action.payload.updatedProperties}
                    : el ))
            }
        case 'tl/TASK-LISTS/ADD-NEW-TASK': 
            return {
                ...state,
                [action.newTask.todoListId]: [
                    action.newTask,
                    ...state[action.newTask.todoListId]
                ]
            }
        case 'tl/TASK-LISTS/REMOVE-TASK': 
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId )
            }
        case 'tl/TODO-LISTS-TASK-LISTS/ADD-NEW-TODOLIST': 
            return {
                ...state,
                [action.newTodoList.id]: []
            }
        case 'tl/TODO-LISTS-TASK-LISTS/DELETE-TODOLIST': 
            let newState = {...state};
            delete newState[action.payload.todoListId];
            return newState
            
        default: return state
    }
}


type TaskListsActionsType = ReturnType<typeof addNewTaskAC> | ReturnType<typeof removeTaskAC>
| ReturnType<typeof addNewTodolistAC> | ReturnType<typeof deleteTodolistAC>
| ReturnType<typeof setTodolistsAC> | ReturnType<typeof setTasksAC>
| ReturnType<typeof updateTaskAC>
// | ReturnType<typeof toggleTaskStatusAC> | ReturnType<typeof changeTaskTitleAC>


export const setTasksAC = (todoListId: string, tasks: TaskType[]) => (
    {type: 'tl/TASK-LISTS/SET-TASKS', todoListId, tasks} as const
)
// export const toggleTaskStatusAC = (todoListId: string, taskId: string) => (
//     {type: 'tl/TASK-LISTS/TOGGLE-TASK-STATUS', payload: {todoListId, taskId}} as const
// )
// export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => (
//     {type: 'tl/TASK-LISTS/CHANGE-TASK-TITLE', payload: {todoListId, taskId, newTitle}} as const
// )
export const updateTaskAC = (todoListId: string, taskId: string, updatedProperties: UpdatedTaskPropertiesType) => (
    {type: 'tl/TASK-LISTS/TASK-UPDATED', payload: {todoListId, taskId, updatedProperties}} as const
)
export const addNewTaskAC = (newTask: TaskType) => (
    {type: 'tl/TASK-LISTS/ADD-NEW-TASK', newTask} as const
)
export const removeTaskAC = (todoListId: string, taskId: string) => (
    {type: 'tl/TASK-LISTS/REMOVE-TASK', payload: {todoListId, taskId}} as const
)



export const requestTasksTC = (todoListId: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch( setAppRequestStatusAC('loading') );
        let response = await taskListsAPI.getTasks(todoListId);
        dispatch( setAppRequestStatusAC('idle') );

        dispatch( setTasksAC(todoListId, response.items) );

        if (response.error) dispatch( setAppMessageAC({error: response.error}) );

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch( setAppRequestStatusAC('loading') );
        let response = await taskListsAPI.deleteTask(todoListId, taskId);
        // dispatch( setAppRequestStatusAC('idle') );

        // if (response.resultCode === ResponseResultCodesEnum.Success) {
        //     dispatch(removeTaskAC(todoListId, taskId));
        // }
        // handleServerRequestError(response.messages[0], dispatch);

        handleAPIResponseError<typeof removeTaskAC>(response, dispatch, removeTaskAC, [todoListId, taskId]);

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}

export const addNewTaskTC = (todoListId: string, taskTitle: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch( setAppRequestStatusAC('loading') );
        let response = await taskListsAPI.createTask(todoListId, taskTitle);
        // dispatch( setAppRequestStatusAC('idle') );

        // if (response.resultCode === ResponseResultCodesEnum.Success) {
        //     dispatch(addNewTaskAC(response.data.item));
        // }
        // handleServerRequestError(response.messages[0], dispatch);

        handleAPIResponseError<typeof addNewTaskAC>(response, dispatch, addNewTaskAC, [response.data.item]);

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}



export const updateTaskTC = (todoListId: string, taskId: string, updatedProperties: UpdatedTaskPropertiesType) => async (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {
    try {
        const task = getState().taskLists[todoListId].find(el => el.id === taskId);
        if (!task) return console.warn('task not found');

        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...updatedProperties
        };

        dispatch( setAppRequestStatusAC('loading') );
        const response = await taskListsAPI.updateTask(todoListId, taskId, model);
        // dispatch( setAppRequestStatusAC('idle') );

        // if (response.resultCode === ResponseResultCodesEnum.Success) {
        //     dispatch(updateTaskAC(todoListId, taskId, model));
        // }
        // handleServerRequestError(response.messages[0], dispatch);
        
        handleAPIResponseError<typeof updateTaskAC>(response, dispatch, updateTaskAC, [todoListId, taskId, model]);

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}


export default taskListsReducer;


type UpdatedTaskPropertiesType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
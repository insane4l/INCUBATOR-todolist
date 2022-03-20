import {v1} from 'uuid';
import { todoListsId } from './todoListsReducer';


let initialState = {
    [todoListsId[0]]: [
        {title: 'HTML & CSS', isDone: true, id: v1()},
        {title: 'JavaScript & TypeScript', isDone: true, id: v1()},
        {title: 'React & Redux', isDone: true, id: v1()},
        {title: 'Material UI', isDone: false, id: v1()},
        {title: 'Unit Tests', isDone: false, id: v1()},
        {title: 'Postman API', isDone: false, id: v1()},
        {title: 'API Development', isDone: false, id: v1()},
        {title: 'OAuth', isDone: false, id: v1()},
        {title: 'Webpack', isDone: false, id: v1()},
        {title: 'ExpressJS', isDone: false, id: v1()},
        {title: 'Basic Knowledge of NodeJS', isDone: false, id: v1()},
        {title: 'React Native', isDone: false, id: v1()}
    ],
    [todoListsId[1]]: [
        {title: 'Complete my linkedIn profile', isDone: true, id: v1()},
        {title: 'Create CV', isDone: true, id: v1()},
        {title: 'Improve my english skills', isDone: false, id: v1()},
        {title: 'Improve my soft skills', isDone: false, id: v1()},
        {title: 'Find first job as frontend developer', isDone: false, id: v1()}
    ],
    [todoListsId[2]]: [
        {title: 'Help someone learn to code', isDone: false, id: v1()},
        {title: 'Create portfolio page', isDone: false, id: v1()},
        {title: 'Create an app (prepare for the Estonian citizenship exams)', isDone: false, id: v1()},
        {title: 'Create an app (todo lists, plans for couples)', isDone: false, id: v1()}
    ]
};

type taskListsStateType = typeof initialState;

const taskListsReducer = (state: taskListsStateType = initialState, action: TaskListsActionsType): taskListsStateType => {
    switch(action.type) {
        case 'tl/TASK-LISTS/TOGGLE-TASK-STATUS': 
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => (
                    el.id === action.payload.taskId 
                    ? {...el, isDone: !el.isDone}
                    : el ))
            }
        case 'tl/TASK-LISTS/CHANGE-TASK-TITLE': 
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => (
                    el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle }
                    : el ))
            }
        case 'tl/TASK-LISTS/ADD-NEW-TASK': 
            return {
                ...state,
                [action.payload.todoListId]: [
                    {title: action.payload.taskTitle, isDone: false, id: action.payload.newTaskId},
                    ...state[action.payload.todoListId]
                ]
            }
        case 'tl/TASK-LISTS/REMOVE-TASK': 
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId )
            }
        case 'tl/TASK-LISTS/REMOVE-ALL-LIST-TASKS': 
            return {
                ...state,
                [action.payload.todoListId]: []
            }
        case 'tl/TASK-LISTS/CREATE-NEW-LIST-TASKS': 
            return {
                ...state,
                [action.payload.todoListId]: []
            }
        default: return state
    }
}


type TaskListsActionsType = ReturnType<typeof toggleTaskStatusAC> 
| ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof addNewTaskAC> 
| ReturnType<typeof removeTaskAC> | ReturnType<typeof removeAllListTasksAC> | ReturnType<typeof createNewListTasksAC> 


export const toggleTaskStatusAC = (todoListId: string, taskId: string) => (
    {type: 'tl/TASK-LISTS/TOGGLE-TASK-STATUS', payload: {todoListId, taskId}} as const
)
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => (
    {type: 'tl/TASK-LISTS/CHANGE-TASK-TITLE', payload: {todoListId, taskId, newTitle}} as const
)
export const addNewTaskAC = (todoListId: string, newTaskId: string, taskTitle: string) => (
    {type: 'tl/TASK-LISTS/ADD-NEW-TASK', payload: {todoListId, newTaskId, taskTitle}} as const
)
export const removeTaskAC = (todoListId: string, taskId: string) => (
    {type: 'tl/TASK-LISTS/REMOVE-TASK', payload: {todoListId, taskId}} as const
)


export const removeAllListTasksAC = (todoListId: string) => (
    {type: 'tl/TASK-LISTS/REMOVE-ALL-LIST-TASKS', payload: {todoListId}} as const
)
export const createNewListTasksAC = (todoListId: string) => (
    {type: 'tl/TASK-LISTS/CREATE-NEW-LIST-TASKS', payload: {todoListId}} as const
)


export default taskListsReducer;
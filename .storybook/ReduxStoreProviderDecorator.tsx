import { PaletteMode } from '@mui/material';
import React from 'react'
import { Provider } from "react-redux";
import { combineReducers, createStore } from 'redux';
import { v1 } from 'uuid';
import { TaskStatuses } from '../src/api/taskListsAPI';
import colorThemeReducer, { defaultDarkTheme, defaultLightTheme } from '../src/bll/colorThemeReducer';
import taskListsReducer from '../src/bll/taskListsReducer';
import todoListsReducer, { TodoListDomainType } from '../src/bll/todoListsReducer';


export const todoListsId = [
    v1(), v1(), v1(),
]

const initialGlobalState = {
    todoLists: [
        {id: todoListsId[0], title: "Must Learn", order: 1, addedDate: '', currentFilter: 'all', isCollapsed: true},
        {id: todoListsId[1], title: "Job Search", order: 2, addedDate: '', currentFilter: 'all', isCollapsed: true},
        {id: todoListsId[2], title: "Some Goals", order: 3, addedDate: '', currentFilter: 'all', isCollapsed: true},
    ] as TodoListDomainType[] ,
    taskLists: {
        [todoListsId[0]]: [
            {title: 'HTML & CSS', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 1, addedDate: ''},
            {title: 'JavaScript & TypeScript', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 2, addedDate: ''},
            {title: 'React & Redux', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 3, addedDate: ''},
            {title: 'Material UI', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 4, addedDate: ''},
            {title: 'Unit Tests', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 5, addedDate: ''},
            {title: 'Postman API', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 6, addedDate: ''},
            {title: 'API Development', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 7, addedDate: ''},
            {title: 'OAuth', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 8, addedDate: ''},
            {title: 'Webpack', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 9, addedDate: ''},
            {title: 'ExpressJS', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 10, addedDate: ''},
            {title: 'Basic Knowledge of NodeJS', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 11, addedDate: ''},
            {title: 'React Native', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 12, addedDate: ''}
        ],
        [todoListsId[1]]: [
            {title: 'Complete my linkedIn profile', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 1, addedDate: ''},
            {title: 'Create CV', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 2, addedDate: ''},
            {title: 'Improve my english skills', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 3, addedDate: ''},
            {title: 'Improve my soft skills', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 4, addedDate: ''},
            {title: 'Find first job as frontend developer', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 5, addedDate: ''}
        ],
        [todoListsId[2]]: [
            {title: 'Help someone learn to code', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 1, addedDate: ''},
            {title: 'Create portfolio page', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 2, addedDate: ''},
            {title: 'Create an app (prepare for the Estonian citizenship exams)', id: v1(), description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 3, addedDate: ''},
            {title: 'Create an app (todo lists, plans for couples)', id: v1(), description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: todoListsId[0], order: 4, addedDate: ''}
        ]
    },
    colorTheme: {
        lightTheme: defaultLightTheme,
        darkTheme: defaultDarkTheme,
    
        currentColorMode: 'light' as PaletteMode
    },
}



const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    taskLists: taskListsReducer,
    colorTheme: colorThemeReducer,
})


const store = createStore(rootReducer, initialGlobalState)



export const ReduxStoreProviderDecorator = (Story: React.ComponentType) => (
    <Provider store={store}>
        <Story/>
    </Provider>
)
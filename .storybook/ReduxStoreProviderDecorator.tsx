import { PaletteMode } from '@mui/material';
import React from 'react'
import { Provider } from "react-redux";
import { combineReducers, createStore } from 'redux';
import { v1 } from 'uuid';
import colorThemeReducer, { defaultDarkTheme, defaultLightTheme } from '../src/bll/colorThemeReducer';
import taskListsReducer from '../src/bll/taskListsReducer';
import todoListsReducer, { TodoListType } from '../src/bll/todoListsReducer';


export const todoListsId = [
    v1(), v1(), v1(),
]

const initialGlobalState = {
    todoLists: [
        {id: todoListsId[0], title: "Must Learn", currentFilter: 'all', isCollapsed: true} as TodoListType,
        {id: todoListsId[1], title: "Job Search", currentFilter: 'all', isCollapsed: true} as TodoListType,
        {id: todoListsId[2], title: "Some Goals", currentFilter: 'all', isCollapsed: true} as TodoListType,
    ],
    taskLists: {
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
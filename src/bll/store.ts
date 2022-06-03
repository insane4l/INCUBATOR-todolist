import { applyMiddleware, combineReducers, createStore } from "redux";
import colorThemeReducer from "./colorThemeReducer";
import taskListsReducer from "./taskListsReducer";
import todoListsReducer from "./todoListsReducer";
import thunkMiddleware from 'redux-thunk'
import appReducer from "./appReducer";

const reducers = combineReducers({
    todoLists: todoListsReducer,
    taskLists: taskListsReducer,
    colorTheme: colorThemeReducer,
    app: appReducer,
});

export type AppRootStateType = ReturnType<typeof reducers>

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
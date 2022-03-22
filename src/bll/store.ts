import { combineReducers, createStore } from "redux";
import colorThemeReducer from "./colorThemeReducer";
import taskListsReducer from "./taskListsReducer";
import todoListsReducer from "./todoListsReducer";

const reducers = combineReducers({
    todoLists: todoListsReducer,
    taskLists: taskListsReducer,
    colorTheme: colorThemeReducer
});

export type AppStateType = ReturnType<typeof reducers>

export const store = createStore(reducers);

// @ts-ignore
window.store = store;
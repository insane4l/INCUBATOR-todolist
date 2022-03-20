import { combineReducers, createStore } from "redux";
import taskListsReducer from "./taskListsReducer";
import todoListsReducer from "./todoListsReducer";

const reducers = combineReducers({
    todoLists: todoListsReducer,
    taskLists: taskListsReducer
});

export type AppStateType = ReturnType<typeof reducers>

export const store = createStore(reducers);
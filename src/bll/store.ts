import { combineReducers, createStore } from "redux";
import taskListsReducer from "./taskListsReducer";
import todoListsReducer from "./todoListsReducer";

const reducers = combineReducers({
    todoLists: todoListsReducer,
    taskLists: taskListsReducer
});

export const store = createStore(reducers);
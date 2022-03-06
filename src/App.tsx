import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import AddTodoListForm from './components/AddTodoListForm';
import TodoList from './components/TodoList';
import { TaskType } from './types/types';


let defaultFilters = [
    {title:'All', value:'all', id: v1()}, 
    {title: 'Active', value:'active', id: v1()}, 
    {title: 'Completed', value:'completed', id: v1()}
] as DefaultFilterTypes

export type FilterValuesType = 'all' | 'active' | 'completed'
export type DefaultFilterTypes = Array<{title: string, value: FilterValuesType, id: string}>

type TaskListsType = {
    [id: string]: Array<TaskType>
}

function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();
    const todoListId3 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: "Must Learn", currentFilter: 'all'},
        {id: todoListId2, title: "Job Search", currentFilter: 'all'},
        {id: todoListId3, title: "Some Goals", currentFilter: 'all'},
    ]);

    const [taskLists, setTaskLists] = useState<TaskListsType>({
        [todoListId1]: [
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
        [todoListId2]: [
            {title: 'Complete my linkedIn profile', isDone: true, id: v1()},
            {title: 'Create CV', isDone: true, id: v1()},
            {title: 'Improve my english skills', isDone: false, id: v1()},
            {title: 'Improve my soft skills', isDone: false, id: v1()},
            {title: 'Find first job as frontend developer', isDone: false, id: v1()}
        ],
        [todoListId3]: [
            {title: 'Help someone learn to code', isDone: false, id: v1()},
            {title: 'Create portfolio page', isDone: false, id: v1()},
            {title: 'Create an app (prepare for the Estonian citizenship exams)', isDone: false, id: v1()},
            {title: 'Create an app (todo lists, plans for couples)', isDone: false, id: v1()}
        ]
    });



    const changeTaskStatus = (taskId: string, todoListId: string): void => {
		let newList = [...taskLists[todoListId]];
		let selectedTask = newList.find(el => el.id === taskId);
		if (selectedTask) {
			selectedTask.isDone = !selectedTask.isDone;
            setTaskLists({...taskLists, todoListId: newList})
		}
	}

    const changeTaskTitle = (taskId: string, todoListId: string, newTitle: string) => {
        let newList = [...taskLists[todoListId]];

        let selectedTask = newList.find(el => el.id === taskId);

        if (selectedTask) {
            selectedTask.title = newTitle;
            setTaskLists({...taskLists, todoListId: newList});
        }
    }


    const removeTask = (taskId: string, todoListId: string): void => {
		let changedList = taskLists[todoListId].filter(el => el.id !== taskId);
		setTaskLists({...taskLists, [todoListId]: changedList});
    }

	const addTask = (itemTitle: string, todoListId: string): void => {
		const newTask = {title: itemTitle, isDone: false, id: v1()};
		setTaskLists({...taskLists, [todoListId]: [ newTask, ...taskLists[todoListId] ]});
	}

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        const todoList = todoLists.find(el => el.id === todoListId);
        if (todoList) {
            todoList.currentFilter = filter;
            setTodoLists([...todoLists]);
        }
    }

    const deleteList = (listId: string) => {
        let newTodoLists = todoLists.filter(el => el.id !== listId);
        setTodoLists(newTodoLists);

        delete taskLists[listId];
        setTaskLists({...taskLists});
    }

    const addNewTodoList = (title: string) => {
        const id = v1();
        const newTodoList: TodoListType = {id, title, currentFilter: 'all'};

        setTodoLists([newTodoList, ...todoLists]);
        setTaskLists({[id]: [], ...taskLists})
    }

    const changeTodoListTitle = (listId: string, newTitle: string) => {
        const list = todoLists.find(el => el.id === listId);

        if (list) {
            list.title = newTitle;
            setTodoLists([...todoLists]);
        }

    }

    const mappedTodoLists = todoLists.map(list => {

        let tasks = taskLists[list.id];

        if (list.currentFilter === 'active') {
            tasks = tasks.filter(el => el.isDone === false);
        }
        if (list.currentFilter === 'completed') {
            tasks = tasks.filter(el => el.isDone === true);
        }

        return (
            <TodoList 
                key={list.id}
                listId={list.id} 
                title={list.title} 
                currentFilter={list.currentFilter}
                tasks={tasks} 
                filters={defaultFilters}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                deleteList={deleteList}
                changeTodoListTitle={changeTodoListTitle} />
        )
    });
	

    return (
        <div className="App">

            <AddTodoListForm addNewTodoList={addNewTodoList} />
            
            <div className="todolists__wrapper">
                {mappedTodoLists}
            </div>
            
        </div>
    );
}

export default App;


type TodoListType = {
    id: string, title: string, currentFilter: FilterValuesType
}
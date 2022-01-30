import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { TodoListItemType } from './types/types';

function App() {

    let tasks1: Array<TodoListItemType> = [
        {title: 'HTML & CSS', isDone: true, id: 1},
        {title: 'JavaScript & TypeScript', isDone: true, id: 2},
        {title: 'React & Redux', isDone: true, id: 3},
        {title: 'Material UI', isDone: false, id: 4},
        {title: 'Unit Tests', isDone: false, id: 5},
        {title: 'Postman API', isDone: false, id: 6},
        {title: 'API Development', isDone: false, id: 7},
        {title: 'OAuth', isDone: false, id: 8},
        {title: 'Webpack', isDone: false, id: 9},
        {title: 'ExpressJS', isDone: false, id: 10},
        {title: 'Basic Knowledge of NodeJS', isDone: false, id: 11},
        {title: 'React Native', isDone: false, id: 12}
    ]

    let tasks2: Array<TodoListItemType> = [
        {title: 'Complete my linkedIn profile', isDone: true, id: 1},
        {title: 'Create CV', isDone: true, id: 2},
        {title: 'Improve my english skills', isDone: false, id: 3},
        {title: 'Improve my soft skills', isDone: false, id: 4},
        {title: 'Find first job as frontend developer', isDone: false, id: 5}
    ]

    let tasks3: Array<TodoListItemType> = [
        {title: 'Help someone learn to code', isDone: false, id: 1},
        {title: 'Create portfolio page', isDone: false, id: 2},
        {title: 'Create an app (prepare for the Estonian citizenship exams)', isDone: false, id: 3},
        {title: 'Create an app (todo lists, plans for couples)', isDone: false, id: 4}
    ]

    return (
        <div className="App">
            <TodoList title="Must Learn" tasks={tasks1} />
            <TodoList title="Job Search" tasks={tasks2} />
            <TodoList title="Some Goals" tasks={tasks3} />
        </div>
    );
}

export default App;

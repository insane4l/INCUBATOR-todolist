import React from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from './components/TodoList';

    

// let defaultFilters = [
//     {title:'All', value:'all' as 'all', id: 1}, 
//     {title: 'Active', value:'active' as 'active', id: 2}, 
//     {title: 'Completed', value:'completed' as 'completed', id: 3}
// ]
// export type DefaultFilterTypes = typeof defaultFilters;

let defaultFilters = [
    {title:'All', value:'all', id: v1()}, 
    {title: 'Active', value:'active', id: v1()}, 
    {title: 'Completed', value:'completed', id: v1()}
] as DefaultFilterTypes

export type FilterValuesType = 'all' | 'active' | 'completed'
export type DefaultFilterTypes = Array<{title: string, value: FilterValuesType, id: string}>


let todoLists = [
    {
        title: "Must Learn",
        tasks: [
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
        id: 1
    },
    {
        title: "Job Search",
        tasks: [
            {title: 'Complete my linkedIn profile', isDone: true, id: v1()},
            {title: 'Create CV', isDone: true, id: v1()},
            {title: 'Improve my english skills', isDone: false, id: v1()},
            {title: 'Improve my soft skills', isDone: false, id: v1()},
            {title: 'Find first job as frontend developer', isDone: false, id: v1()}
        ],
        id: 2
    },
    {
        title: "Some Goals",
        tasks: [
            {title: 'Help someone learn to code', isDone: false, id: v1()},
            {title: 'Create portfolio page', isDone: false, id: v1()},
            {title: 'Create an app (prepare for the Estonian citizenship exams)', isDone: false, id: v1()},
            {title: 'Create an app (todo lists, plans for couples)', isDone: false, id: v1()}
        ],
        id: 3
    }
];



function App() {

    return (
        <div className="App">
            {todoLists.map(list => (
                <TodoList key={list.id} title={list.title} tasks={list.tasks} filters={defaultFilters}/>
            ))}
        </div>
    );
}

export default App;
import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';

    

// let defaultFilters = [
//     {title:'All', value:'all' as 'all', id: 1}, 
//     {title: 'Active', value:'active' as 'active', id: 2}, 
//     {title: 'Completed', value:'completed' as 'completed', id: 3}
// ]
// export type DefaultFilterTypes = typeof defaultFilters;

let defaultFilters = [
    {title:'All', value:'all', id: 1}, 
    {title: 'Active', value:'active', id: 2}, 
    {title: 'Completed', value:'completed', id: 3}
] as DefaultFilterTypes

export type FilterValuesType = 'all' | 'active' | 'completed'
export type DefaultFilterTypes = Array<{title: string, value: FilterValuesType, id: number}>


let todoLists = [
    {
        title: "Must Learn",
        tasks: [
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
        ],
        id: 1
    },
    {
        title: "Job Search",
        tasks: [
            {title: 'Complete my linkedIn profile', isDone: true, id: 1},
            {title: 'Create CV', isDone: true, id: 2},
            {title: 'Improve my english skills', isDone: false, id: 3},
            {title: 'Improve my soft skills', isDone: false, id: 4},
            {title: 'Find first job as frontend developer', isDone: false, id: 5}
        ],
        id: 2
    },
    {
        title: "Some Goals",
        tasks: [
            {title: 'Help someone learn to code', isDone: false, id: 1},
            {title: 'Create portfolio page', isDone: false, id: 2},
            {title: 'Create an app (prepare for the Estonian citizenship exams)', isDone: false, id: 3},
            {title: 'Create an app (todo lists, plans for couples)', isDone: false, id: 4}
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
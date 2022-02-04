import React, { useState } from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';
import { TaskType } from '../types/types';
import FilterPanel from './FilterPanel';
import List from './List';


const TodoList: React.FC<TodoListPropsType> = ({title, tasks, filters}) => {

	const [items, setItems] = useState<Array<TaskType>>(tasks);
	const [currentFilter, changeFilter] = useState<FilterValuesType>('all');

    const removeItem = (id: number): void => {
		let changedList = items.filter(el => el.id !== id);
		setItems(changedList);
    }

	let allItems = items;

	if (currentFilter === 'active') {
		allItems = items.filter(el => el.isDone === false);
	}
	if (currentFilter === 'completed') {
		allItems = items.filter(el => el.isDone === true);
	}

    return (
        <div>
			<h3>{title}</h3>
			<div>
				<input/>
				<button>+</button>
			</div>
			<List tasks={allItems} removeItem={removeItem} />
			<FilterPanel filters={filters} changeFilter={changeFilter} />
		</div>
    )
}

export default TodoList;


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
	filters: DefaultFilterTypes
}
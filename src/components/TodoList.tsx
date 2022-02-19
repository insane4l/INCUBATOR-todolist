import React, { useState } from 'react';
import { v1 } from 'uuid';
import { DefaultFilterTypes, FilterValuesType } from '../App';
import { TaskType } from '../types/types';
import AddNewItemForm from './AddNewItemForm';
import FilterPanel from './FilterPanel';
import List from './List';


const TodoList: React.FC<TodoListPropsType> = ({title, tasks, filters}) => {

	const [items, setItems] = useState<Array<TaskType>>(tasks);
	const [currentFilter, changeFilter] = useState<FilterValuesType>('all');

	const changeItemStatus = (id: string) => {
		let newItems = [...items];
		let selectedItem = newItems.find(el => el.id === id);
		if (selectedItem) {
			selectedItem.isDone = !selectedItem.isDone;
			setItems(newItems);
		}

	}

    const removeItem = (id: string): void => {
		let changedList = items.filter(el => el.id !== id);
		setItems(changedList);
    }

	const addItem = (itemTitle: string) => {
		const newItem = {title: itemTitle, isDone: false, id: v1()};
		setItems([newItem, ...items]);
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
			<AddNewItemForm addItem={addItem} />
			<List tasks={allItems} removeItem={removeItem} changeItemStatus={changeItemStatus}/>
			<FilterPanel filters={filters} changeFilter={changeFilter} currentFilter={currentFilter}/>
		</div>
    )
}

export default TodoList;


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
	filters: DefaultFilterTypes
}
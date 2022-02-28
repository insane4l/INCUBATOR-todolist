import React from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';
import { TaskType } from '../types/types';
import AddNewItemForm from './AddNewItemForm';
import FilterPanel from './FilterPanel';
import List from './List';


const TodoList: React.FC<TodoListPropsType> = ({listId, title, currentFilter, tasks, filters, changeTaskStatus, removeTask, addTask, changeFilter, deleteList}) => {

	// const [items, setItems] = useState<Array<TaskType>>(tasks);
	// const [currentFilter, changeFilter] = useState<FilterValuesType>('all');

	// const changeItemStatus = (id: string) => {
	// 	let newItems = [...items];
	// 	let selectedItem = newItems.find(el => el.id === id);
	// 	if (selectedItem) {
	// 		selectedItem.isDone = !selectedItem.isDone;
	// 		setItems(newItems);
	// 	}

	// }

    // const removeItem = (id: string): void => {
	// 	let changedList = items.filter(el => el.id !== id);
	// 	setItems(changedList);
    // }

	// const addItem = (itemTitle: string) => {
	// 	const newItem = {title: itemTitle, isDone: false, id: v1()};
	// 	setItems([newItem, ...items]);
	// }

	// let allItems = items;

	// if (currentFilter === 'active') {
	// 	allItems = items.filter(el => el.isDone === false);
	// }
	// if (currentFilter === 'completed') {
	// 	allItems = items.filter(el => el.isDone === true);
	// }
	console.log(`todolist id: [${listId}] rerendered`);
	
	const onDeleteClickHandler = () => {
		deleteList(listId);
	}

    return (
        <div>
			<h3>{title}</h3>
			<button onClick={onDeleteClickHandler}>Delete list</button>
			<AddNewItemForm listId={listId} addItem={addTask} />
			<List listId={listId} tasks={tasks} removeItem={removeTask} changeItemStatus={changeTaskStatus}/>
			<FilterPanel listId={listId} filters={filters} changeFilter={changeFilter} currentFilter={currentFilter}/>
		</div>
    )
}

export default React.memo(TodoList);


type TodoListPropsType = {
	listId: string
    title: string
	currentFilter: FilterValuesType
    tasks: Array<TaskType>
	filters: DefaultFilterTypes
	changeTaskStatus: (taskId: string, todoListId: string) => void
	removeTask: (taskId: string, todoListId: string) => void
	addTask: (itemTitle: string, todoListId: string) => void
	changeFilter: (filter: FilterValuesType, todoListId: string) => void
	deleteList: (todoListId: string) => void
}
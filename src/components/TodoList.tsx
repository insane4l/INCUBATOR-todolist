import React from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';
import { TaskType } from '../types/types';
import AddNewItemForm from './common/AddNewItemForm';
import EditableTextLine from './common/EditableTextLine';
import FilterPanel from './FilterPanel';
import List from './List';
import IconButton from '@mui/material/IconButton';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const TodoList: React.FC<TodoListPropsType> = ({listId, title, currentFilter, tasks, filters, changeTaskStatus, changeTaskTitle, removeTask, addTask, changeFilter, deleteList, changeTodoListTitle}) => {

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

	const addNewTask = (title: string) => {
		addTask(title, listId);
	}

	const onChangeListTitleHandler = (newTitle: string) => {
		changeTodoListTitle(listId, newTitle);
	}

    return (
		<Grid item xs={4}>
			<Paper elevation={3} sx={{ p: 4 }}>
				<Typography variant="h4" gutterBottom component="span" mr={1}>
					<EditableTextLine text={title} setNewText={onChangeListTitleHandler}/>
				</Typography>


				<IconButton onClick={onDeleteClickHandler}>
					<BackspaceIcon />
				</IconButton>
				

				<AddNewItemForm addItem={addNewTask} />
				<List listId={listId} tasks={tasks} removeItem={removeTask} changeItemStatus={changeTaskStatus} changeItemTitle={changeTaskTitle} />
				<FilterPanel listId={listId} filters={filters} changeFilter={changeFilter} currentFilter={currentFilter}/>
			</Paper>
		</Grid>
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
	changeTaskTitle: (taskId: string, todoListId: string, newTitle: string) => void
	removeTask: (taskId: string, todoListId: string) => void
	addTask: (itemTitle: string, todoListId: string) => void
	changeFilter: (filter: FilterValuesType, todoListId: string) => void
	deleteList: (todoListId: string) => void
	changeTodoListTitle: (todoListId: string, newTitle: string) => void
}
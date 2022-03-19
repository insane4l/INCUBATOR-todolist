import React, { useState } from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';
import { TaskType } from '../types/types';
import AddNewItemForm from './common/AddNewItemForm';
import EditableTextLine from './common/EditableTextLine';
import FilterPanel from './FilterPanel';
import TaskList from './TaskList';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';


const TodoList: React.FC<TodoListPropsType> = ({listId, title, currentFilter, tasks, filters, changeTaskStatus, changeTaskTitle, removeTask, addTask, changeFilter, deleteList, changeTodoListTitle}) => {

	let [collapsedMode, setCollapsedMode] = useState(false);

	const collapseList = () => {
		setCollapsedMode(currentMode => currentMode === true ? false : true)
	}

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
			<Paper elevation={6} sx={{ position: 'relative'}}>
				<Box sx={{display: 'flex', alignItems: 'center', pt: 1, pr: 4, pb: 1, pl: 4, mb: 4, borderBottom: '1px solid rgba(0,0,0, .2)'}}>
					<Typography variant="h5" gutterBottom component="span" sx={{mb: 0}}>
						<EditableTextLine text={title} setNewText={onChangeListTitleHandler}/>
					</Typography>

					<IconButton onClick={collapseList} >
						{collapsedMode ?  <ExpandMoreIcon fontSize="large"/> : <ExpandLessIcon fontSize="large"/>}
					</IconButton>
				</Box>
				


				<IconButton onClick={onDeleteClickHandler} color="error" sx={{position: 'absolute', top: '0.1em', right: '0.1em'}}>
					<PlaylistRemoveIcon fontSize="large" />
				</IconButton>
				
				
				<Collapse in={!collapsedMode}>
					<Box sx={{pr: 4, pb: 4, pl: 4}}>
						<AddNewItemForm addItem={addNewTask} />
						<TaskList listId={listId} tasks={tasks} removeItem={removeTask} changeItemStatus={changeTaskStatus} changeItemTitle={changeTaskTitle} />
						<FilterPanel listId={listId} filters={filters} changeFilter={changeFilter} currentFilter={currentFilter}/>
					</Box>
				</Collapse>
				
				
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
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
import { useDispatch } from 'react-redux';
import { changeTodolistTitleAC, deleteTodolistAC, toggleTodolistCollapseAC } from '../bll/todoListsReducer';
import { addNewTaskAC, removeAllListTasksAC } from '../bll/taskListsReducer';
import { v1 } from 'uuid';


const TodoList: React.FC<TodoListPropsType> = ({todoListId, title, currentFilter, tasks, filters, isCollapsed}) => {

	console.log(`todolist id: [${todoListId}] rerendered`);

	const dispatch = useDispatch();

	const deleteTodoList = () => {
		dispatch( deleteTodolistAC(todoListId) )
		dispatch( removeAllListTasksAC(todoListId) )
	}

	const addNewTask = (title: string) => {
		let newTaskId = v1();
		dispatch(addNewTaskAC(todoListId, newTaskId, title));
	}

	const changeTodoListTitle = (newTitle: string) => {
		dispatch( changeTodolistTitleAC(todoListId, newTitle) )
	}

	const collapseList = () => {
		dispatch( toggleTodolistCollapseAC(todoListId) );
	}

	
	
    return (
		<Grid item xs={4}>
			<Paper elevation={6} sx={{ position: 'relative'}}>
				<Box sx={{display: 'flex', alignItems: 'center', pt: 1, pr: 4, pb: 1, pl: 4, mb: 4, borderBottom: '1px solid rgba(0,0,0, .2)'}}>
					<Typography variant="h5" gutterBottom component="span" sx={{mb: 0}}>
						<EditableTextLine text={title} setNewText={changeTodoListTitle}/>
					</Typography>

					<IconButton onClick={collapseList} >
						{isCollapsed ?  <ExpandMoreIcon fontSize="large"/> : <ExpandLessIcon fontSize="large"/>}
					</IconButton>
				</Box>
				


				<IconButton onClick={deleteTodoList} color="error" sx={{position: 'absolute', top: '0.1em', right: '0.1em'}}>
					<PlaylistRemoveIcon fontSize="large" />
				</IconButton>
				
				
				<Collapse in={!isCollapsed}>

					<Box sx={{pr: 4, pb: 4, pl: 4}}>
						<AddNewItemForm addItem={addNewTask} />
						<TaskList todoListId={todoListId} tasks={tasks} />
						<FilterPanel todoListId={todoListId} filters={filters} currentFilter={currentFilter}/>
					</Box>

				</Collapse>
				
				
			</Paper>
		</Grid>
    )
}

export default React.memo(TodoList);


type TodoListPropsType = {
	todoListId: string
    title: string
	currentFilter: FilterValuesType
    tasks: Array<TaskType>
	filters: DefaultFilterTypes
	isCollapsed: boolean
}
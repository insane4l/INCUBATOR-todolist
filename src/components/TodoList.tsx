import React from 'react';
import AddNewItemForm from './common/AddNewItemForm';
import EditableTextLine from './common/EditableTextLine';
import FilterPanel from './FilterPanel';
import TaskList from './TaskList';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useDispatch } from 'react-redux';
import { changeTodolistTitleAC, deleteTodolistAC, TodoListType, toggleTodolistCollapseAC } from '../bll/todoListsReducer';
import { addNewTaskAC, removeAllListTasksAC } from '../bll/taskListsReducer';
import { v1 } from 'uuid';
import { useTheme } from '@mui/system';


const TodoList: React.FC<TodoListPropsType> = ({todoList}) => {
	const {id, title, currentFilter, isCollapsed} = todoList;
	const todoListId = id;

	const dispatch = useDispatch();
	const dividerColor = useTheme().palette.divider;
	

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

	
	console.log(`todolist id: [${todoListId}] rerendered`);
    return (
		<Grid item xs={4}>
			<Paper elevation={6}>

				{/* TodoList Header */}
				<Box sx={{position: 'relative', display: 'flex', alignItems: 'center', pt: 1, pr: 4, pb: 1, pl: 4, mb: 4, borderBottom: `1px solid ${dividerColor}`}}>
					<Typography variant="h5" gutterBottom component="span" sx={{mb: 0}}>
						<EditableTextLine text={title} setNewText={changeTodoListTitle}/>
					</Typography>

					<IconButton onClick={collapseList} >
						{isCollapsed ?  <ExpandMoreIcon fontSize="large"/> : <ExpandLessIcon fontSize="large"/>}
					</IconButton>

					<IconButton onClick={deleteTodoList} color="error" sx={{position: 'absolute', top: '0.1em', right: '0.1em'}}>
						<PlaylistRemoveIcon fontSize="large" />
					</IconButton>
				</Box>
				
				{/* TodoList Body */}
				<Collapse in={!isCollapsed}>
					<Box sx={{pr: 4, pb: 4, pl: 4}}>
						<AddNewItemForm addItem={addNewTask} />
						<TaskList todoListId={todoListId} todoListCurrentFilter={currentFilter}/>
						<FilterPanel todoListId={todoListId} currentFilter={currentFilter}/>
					</Box>
				</Collapse>
				
			</Paper>
		</Grid>
    )
}

export default React.memo(TodoList);


type TodoListPropsType = {
	todoList: TodoListType
}
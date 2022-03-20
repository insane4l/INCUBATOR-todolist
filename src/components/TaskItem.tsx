import React from 'react';
import { TaskType } from '../types/types';
import EditableTextLine from './common/EditableTextLine';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useDispatch } from 'react-redux';
import { changeTaskTitleAC, removeTaskAC, toggleTaskStatusAC } from '../bll/taskListsReducer';
import Divider from '@mui/material/Divider';



const TaskItem: React.FC<ListItemPropsType> = ({todoListId, task, withDivider}) => {

    const {title, isDone, id} = task;
    const dispatch = useDispatch();

    const changeTaskStatus = () => {
        dispatch( toggleTaskStatusAC(todoListId, id) );
    }

    const changeTaskTitle = (newTitle: string) => {
        dispatch( changeTaskTitleAC(todoListId, id, newTitle) );
    }

    const removeTask = () => {
        dispatch( removeTaskAC(todoListId, id) );
    }

    const completedTaskOpacity = isDone ? '.4' : '1'; 

    return (
        <>
            <ListItem disablePadding sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <Box sx={{display: 'flex', alignItems: 'flex-start', width: '100%', opacity: completedTaskOpacity}}>
                    <Checkbox 
                        color="success" 
                        checked={isDone}
                        onChange={changeTaskStatus} />

                    <Box sx={{p: '9px 0'}}>
                        <EditableTextLine text={title} setNewText={changeTaskTitle} />
                    </Box>
                </Box>

                <IconButton onClick={removeTask}>
                    <DeleteForeverIcon />
                </IconButton>
            </ListItem>
            {withDivider && <Divider />}
        </>

    )
}

export default TaskItem;


type ListItemPropsType =  {
    todoListId: string
    task: TaskType
    withDivider: boolean
}
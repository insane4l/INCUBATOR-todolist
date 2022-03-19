import React from 'react';
import { TaskType } from '../types/types';
import EditableTextLine from './common/EditableTextLine';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';



const TaskItem: React.FC<ListItemPropsType> = ({listId, task, removeItem, changeItemStatus, changeItemTitle}) => {

    const {title, isDone, id} = task;

    const onItemStatusChange = () => {
        changeItemStatus(id, listId)
    }

    const onItemTitleChange = (newTitle: string) => {
        changeItemTitle(id, listId, newTitle);
    }

    const onRemoveHandler = () => {
        removeItem(id, listId); 
    }

    const completedTaskOpacity = isDone ? '.4' : '1'; 

    return (

        <ListItem disablePadding sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', width: '100%', opacity: completedTaskOpacity}}>
                <Checkbox 
                    color="success" 
                    checked={isDone}
                    onChange={onItemStatusChange} />

                <Box sx={{p: '9px 0'}}>
                    <EditableTextLine text={title} setNewText={onItemTitleChange} />
                </Box>
            </Box>

            <IconButton onClick={onRemoveHandler}>
                <DeleteForeverIcon />
            </IconButton>
        </ListItem>

    )
}

export default TaskItem;


type ListItemPropsType =  {
    listId: string
    task: TaskType
    removeItem: (taskId: string, todoListId: string) => void
    changeItemStatus: (taskId: string, todoListId: string) => void
    changeItemTitle: (taskId: string, todoListId: string, newTitle: string) => void
}
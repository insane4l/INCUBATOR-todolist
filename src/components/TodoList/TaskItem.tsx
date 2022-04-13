import React, { useCallback, useState } from 'react';
import { TaskType } from '../../types/types';
import EditableTextLine from '../common/EditableTextLine/EditableTextLine';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useDispatch } from 'react-redux';
import { changeTaskTitleAC, removeTaskAC, toggleTaskStatusAC } from '../../bll/taskListsReducer';
import Divider from '@mui/material/Divider';
import ConfirmModal from '../common/ConfirmModal/ConfirmModal';



const TaskItem: React.FC<ListItemPropsType> = React.memo( ({todoListId, task, withDivider}) => {
    // console.log('TaskItem rendered');
    const [displayModal, setModalDisplay] = useState(false);
    
    const {title, isDone, id} = task;
    const dispatch = useDispatch();

    const changeTaskStatus = useCallback( () => {
        dispatch( toggleTaskStatusAC(todoListId, id) );
    }, [dispatch, todoListId, id]);

    const changeTaskTitle = useCallback( (newTitle: string) => {
        dispatch( changeTaskTitleAC(todoListId, id, newTitle) );
    }, [dispatch, todoListId, id]);

    const onRemoveTaskClickHandler = useCallback( () => {
        setModalDisplay(true);
    }, []);

    const confirmTaskRemoving = useCallback( (confirmation: boolean) => {
        confirmation && dispatch( removeTaskAC(todoListId, id) );
        setModalDisplay(false);
    }, [dispatch, todoListId, id]);

    const closeModal = useCallback( () => {
        setModalDisplay(false);
    }, []);

    const completedTaskOpacity = isDone ? '.4' : '1'; 

    return (
        <>
            <ListItem disablePadding sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%'}}>
                <Box sx={{display: 'flex', alignItems: 'flex-start', width: '100%', opacity: completedTaskOpacity}}>
                    <Checkbox 
                        color="success" 
                        checked={isDone}
                        onChange={changeTaskStatus} />

                    <Box sx={{width: '100%', p: '9px 0'}}> 
                        <EditableTextLine text={title} setNewText={changeTaskTitle} />
                    </Box>
                </Box>

                <IconButton onClick={onRemoveTaskClickHandler}>
                    <DeleteForeverIcon />
                </IconButton>
            </ListItem>

            {withDivider && <Divider />}

            <ConfirmModal 
                title={`Delete "${title}" ?`}
                displayModal={displayModal}
                onAnswerCallback={confirmTaskRemoving}
                onOverlayClose={closeModal}/>
        </>

    )
})

export default TaskItem;


type ListItemPropsType =  {
    todoListId: string
    task: TaskType
    withDivider: boolean
}
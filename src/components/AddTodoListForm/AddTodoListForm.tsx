import React from 'react';
import AddNewItemForm from '../common/AddNewItemForm/AddNewItemForm';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { addNewTodolistAC } from '../../bll/todoListsReducer';
import s from './AddTodoListForm.module.css';
import { useMediaQuery } from '@mui/material';

const AddTodoListForm: React.FC<{hideNewTodoListForm: ()=>void}> = React.memo( ({hideNewTodoListForm}) => {
    // console.log('AddTodoListForm rendered');
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:599px)');
    
    const addNewTodoList = (title: string) => {
        dispatch( addNewTodolistAC(title) );
        hideNewTodoListForm();
    }

    let mobilePositionStyle = isMobile ? { left: '5px'} : {}

    return (
        <Paper sx={mobilePositionStyle} className={s.add_todolist__form} elevation={10}>
            <Typography variant="h6" gutterBottom component="h2">
                New To-Do List
            </Typography>

            <AddNewItemForm addItem={addNewTodoList}/>
        </Paper>
    )
})

export default AddTodoListForm;
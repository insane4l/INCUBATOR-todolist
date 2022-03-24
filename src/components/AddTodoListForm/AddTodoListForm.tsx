import React from 'react';
import AddNewItemForm from '../common/AddNewItemForm';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { addNewTodolistAC } from '../../bll/todoListsReducer';
import s from './AddTodoListForm.module.css';

const AddTodoListForm: React.FC<{hideNewTodoListForm: ()=>void}> = ({hideNewTodoListForm}) => {

    const dispatch = useDispatch();

    const addNewTodoList = (title: string) => {
        dispatch( addNewTodolistAC(title) );
        hideNewTodoListForm();
    }

    return (
        <Paper className={s.add_todolist__form} elevation={10}>
            <Typography variant="h6" gutterBottom component="h2">
                New To-Do List
            </Typography>

            <AddNewItemForm addItem={addNewTodoList}/>
        </Paper>
    )
}

export default AddTodoListForm;
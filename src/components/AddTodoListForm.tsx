import React from 'react';
import AddNewItemForm from './common/AddNewItemForm';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const AddTodoListForm: React.FC<AddTodoListFormPropsType> = ({addNewTodoList}) => {



    return (
        <Paper elevation={1} sx={{maxWidth: '400px', p: 2 }}>
            <Typography variant="h6" gutterBottom component="h2">
                New To-Do List
            </Typography>

            <AddNewItemForm addItem={addNewTodoList}/>
        </Paper>
    )
}

export default AddTodoListForm;


type AddTodoListFormPropsType = {
    addNewTodoList: (title: string) => void
}
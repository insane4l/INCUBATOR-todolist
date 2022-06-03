import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../bll/store';
import { requestTodoListsTC } from '../../bll/todoListsReducer';
import TodoList from '../../components/TodoList/TodoList';
import Grid from '@mui/material/Grid';

const TodoListsList = () => {

    const todoLists = useSelector( (state: AppRootStateType) => state.todoLists );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestTodoListsTC());
    }, [])


    const mappedTodoLists = todoLists.map(list => {
        return (
            <TodoList 
                key={list.id}
                todoList={list}
            />
        )
    });

    return (
        <Grid container spacing={6} sx={{ pt: 4, pb: 4 }}>
            {mappedTodoLists}
        </Grid>
    )
}

export default TodoListsList;
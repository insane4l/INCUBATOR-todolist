import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../bll/store';
import { requestTodoListsTC } from '../../bll/todoListsReducer';
import TodoList from '../../components/TodoList/TodoList';
import Grid from '@mui/material/Grid';
import {Navigate} from 'react-router-dom';
import { setAppMessageAC } from '../../bll/appReducer';

const TodoListsList = () => {

    const isUserAuthorized = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
    const todoLists = useSelector( (state: AppRootStateType) => state.todoLists );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isUserAuthorized) dispatch(requestTodoListsTC());

        const timerId = setTimeout( () => {
            dispatch( setAppMessageAC({info: 'Double click to change TodoList or Task title'}) );
        }, 6000);

        return () => clearTimeout(timerId);
    }, [])


    if (!isUserAuthorized) return <Navigate to="/login" />


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
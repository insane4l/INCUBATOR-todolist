import React, { useState } from 'react';
import { v1 } from 'uuid';
import AddTodoListForm from './components/AddTodoListForm';
import TodoList from './components/TodoList';
import { TaskType } from './types/types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppHeader from './components/AppHeader';
import { useSelector } from 'react-redux';
import { AppStateType } from './bll/store';
import Box from '@mui/material/Box';



let defaultFilters = [
    {title:'All', value:'all', id: v1()}, 
    {title: 'Active', value:'active', id: v1()}, 
    {title: 'Completed', value:'completed', id: v1()}
] as DefaultFilterTypes

export type FilterValuesType = 'all' | 'active' | 'completed'
export type DefaultFilterTypes = Array<{title: string, value: FilterValuesType, id: string}>


function App() {

    const todoLists = useSelector( (state: AppStateType) => state.todoLists );
    const taskLists = useSelector( (state: AppStateType) => state.taskLists );


    const mappedTodoLists = todoLists.map(list => {

        let tasks = taskLists[list.id];

        if (list.currentFilter === 'active') {
            tasks = tasks.filter(el => el.isDone === false);
        }
        if (list.currentFilter === 'completed') {
            tasks = tasks.filter(el => el.isDone === true);
        }

        return (
            <TodoList 
                key={list.id}
                todoListId={list.id} 
                title={list.title} 
                currentFilter={list.currentFilter}
                tasks={tasks} 
                filters={defaultFilters}
                isCollapsed={list.isCollapsed}
            />
        )
    });
	

    return (

        <Box sx={{height: '105vh'}}>
            <AppHeader />

            <Container fixed>
                
                <Grid container spacing={6} sx={{ pt: 4, pb: 4 }}>
                    {mappedTodoLists}
                </Grid>
                
            </Container>
        </Box>
    );
}

export default App;
import React from 'react';
import TodoList from './components/TodoList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppHeader from './components/AppHeader/AppHeader';
import { useSelector } from 'react-redux';
import { AppStateType } from './bll/store';
import Box from '@mui/material/Box';



function App() {

    const todoLists = useSelector( (state: AppStateType) => state.todoLists );

    const mappedTodoLists = todoLists.map(list => {

        return (
            <TodoList 
                key={list.id}
                todoList={list}
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

            {/* <Footer..... */}
        </Box>
    );
}

export default App;
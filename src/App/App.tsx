import React from 'react';
import TodoList from '../components/TodoList/TodoList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppHeader from '../components/AppHeader/AppHeader';
import { useSelector } from 'react-redux';
import { AppStateType } from '../bll/store';
import Box from '@mui/material/Box';



function App() {
    // console.log('App rendered');
    
    const todoLists = useSelector( (state: AppStateType) => state.todoLists );
    const isUserAuthorized = true; // todo: useSelector(data from authReducer state - from server)

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
            <AppHeader isAuth={isUserAuthorized} />

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
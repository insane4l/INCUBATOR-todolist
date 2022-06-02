import React from 'react';
import Container from '@mui/material/Container';
import AppHeader from '../components/AppHeader/AppHeader';
import Box from '@mui/material/Box';
import TodoListsList from '../features/TodoListsList/TodoListsList';



function App() {
    // console.log('App rendered');

    const isUserAuthorized = true; // todo: useSelector(data from authReducer state - from server)

    return (

        <Box sx={{height: '105vh'}}>
            <AppHeader isAuth={isUserAuthorized} />

            <Container fixed>
                <TodoListsList />
            </Container>

            {/* <Footer..... */}
        </Box>
    );
}

export default App;
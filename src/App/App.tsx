import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import AppHeader from '../components/AppHeader/AppHeader';
import Box from '@mui/material/Box';
import TodoListsList from '../features/TodoListsList/TodoListsList';
import SnackBarsStack from '../components/SnackBarsStack/SnackBarsStack';
import { useDispatch } from 'react-redux';
import { setAppMessageAC } from '../bll/appReducer';



function App() {
    // console.log('App rendered');

    const dispatch = useDispatch();

    useEffect(() => {
        const timerId = setTimeout( () => {
            dispatch( setAppMessageAC({info: 'Double click to change TodoList or Task title'}) );
        }, 6000);

        return () => clearTimeout(timerId);
    }, [])

    const isUserAuthorized = true; // todo: useSelector(data from authReducer state - from server)

    return (

        <Box sx={{height: '105vh'}}>
            <AppHeader isAuth={isUserAuthorized} />

            <Container fixed>
                <TodoListsList />
            </Container>

            <SnackBarsStack />
            {/* <Footer..... */}
        </Box>
    );
}

export default App;
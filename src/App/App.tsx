import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import AppHeader from '../components/AppHeader/AppHeader';
import Box from '@mui/material/Box';
import TodoListsList from '../features/TodoListsList/TodoListsList';
import SnackBarsStack from '../components/SnackBarsStack/SnackBarsStack';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAppTC } from '../bll/appReducer';
import { Routes, Route } from 'react-router-dom';
import Login from '../features/Login/Login';
import { AppRootStateType } from '../bll/store';
import CircularProgress from '@mui/material/CircularProgress';



function App() {
    // console.log('App rendered');

    const isAppInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isUserAuthorized = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [])


    if (!isAppInitialized) return <CircularProgress />

    return (

        <Box sx={{height: '105vh'}}>
            <AppHeader isAuth={isUserAuthorized} />

            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodoListsList />}/>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </Container>

            <SnackBarsStack />
            {/* <Footer..... */}
        </Box>
    );
}

export default App;
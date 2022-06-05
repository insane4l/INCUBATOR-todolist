import React from 'react';
import LoginForm from './LoginForm';
import Box from '@mui/material/Box';
import { AppRootStateType } from '../../bll/store';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Login = () => {

	const isUserAuthorized = useSelector<AppRootStateType>(state => state.auth.isAuth);

	if (isUserAuthorized) return <Navigate to='/' />

	return (
		<Box sx={{ width: 300, my: 1, mx: 'auto', }}>
			{/* <Box sx={{mt: '44px', textAlign: 'center'}}>
            <div>Test account</div>
            <div>Email: free@samuraijs.com</div>
            <div>Password: free</div>
        </Box> */}

			<LoginForm />
		</Box>
	)
}

export default Login;
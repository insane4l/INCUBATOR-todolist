import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material//Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from '../../bll/authReducer';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AppRootStateType } from '../../bll/store';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(4, 'Password should be of minimum 4 characters length')
        .required('Password is required'),
});



const LoginForm = () => {

    const captchaURL = useSelector<AppRootStateType, string | null>(state => state.auth.captchaURL);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            rememberMe: false,
            captcha: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginTC(values));
        },
    });


    return (
        <Paper sx={{p: 4, mt: '44px'}} elevation={11}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    sx={{mt: 2}}
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <FormControlLabel
                    sx={{mt: 1}}
                    label="Remember Me"
                    control={
                        <Checkbox
                            name="rememberMe"
                            color="success"
                            checked={formik.values.rememberMe}
                            onChange={formik.handleChange} />
                    } />

                { captchaURL 
                    && <>
                        <CaptchaImg url={captchaURL}/>
                        <TextField
                            sx={{mt: 2}}
                            fullWidth
                            id="captcha"
                            name="captcha"
                            label="Captcha"
                            value={formik.values.captcha}
                            onChange={formik.handleChange} />
                    </>
                }

                <Button sx={{mt: 1}} color="primary" variant="contained" fullWidth type="submit">
                    Login
                </Button>
            </form>
        </Paper>
    );
};

export default LoginForm;



const CaptchaImg = (props: {url: string}) => {
    return (
        <img style={{display: 'block', width: '100%', marginTop: '15px'}} src={props.url} alt="captcha symbols" />
    )
}
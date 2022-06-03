import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppMessageType, setAppMessageAC } from '../../bll/appReducer';
import { AppRootStateType } from '../../bll/store';
import SuperSnackBar from '../common/SuperSnackBar/SuperSnackBar';

// todo: code refactoring
const SnackBarsStack = () => {

    const successMessage = useSelector<AppRootStateType, AppMessageType>(state => state.app.appMessages.success);
    const errorMessage = useSelector<AppRootStateType, AppMessageType>(state => state.app.appMessages.error);
    const infoMessage = useSelector<AppRootStateType, AppMessageType>(state => state.app.appMessages.info);

    const dispatch = useDispatch();

    const isSuccess = successMessage ? true : undefined;
    const isError = errorMessage ? true : undefined;
    const isInfo = infoMessage ? true : undefined;

    const onSuccessBarCloseHandler = () => dispatch(setAppMessageAC({success: null}));
    const onErrorBarCloseHandler = () => dispatch(setAppMessageAC({error: null}));
    const onInfoBarCloseHandler = () => dispatch(setAppMessageAC({info: null}));


    return (
        <>
            <SuperSnackBar message={successMessage} alertStyle={"success"} onClose={onSuccessBarCloseHandler} open={isSuccess} />
            <SuperSnackBar message={errorMessage} alertStyle={"error"} onClose={onErrorBarCloseHandler} open={isError} />
            <SuperSnackBar message={infoMessage} alertStyle={"info"} onClose={onInfoBarCloseHandler} open={isInfo} />

        </>
    )
}

export default SnackBarsStack;
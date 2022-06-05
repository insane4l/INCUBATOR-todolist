import { Dispatch } from 'react';
import { setAppMessageAC, setAppRequestStatusAC } from './appReducer';
import { handleAPIResponseError, handleHTTPResponseError } from '../utils/serverErrors';
import authAPI, { LoginDataType } from '../api/authAPI';
import { ResponseCaptchaResultCodeEnum, ResponseResultCodesEnum } from '../api/API';


let initialState = {
    isAuth: false,
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    captchaURL: null as null | string,
}

const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch(action.type) {
        case 'tl/AUTH/SET-USER-AUTH-DATA':
        case 'tl/AUTH/SET-CAPTCHA': 
            return {...state, ...action.payload}
        default: return state;
    }
}


type AuthActionsType = ReturnType<typeof setUserAuthDataAC>
| ReturnType<typeof setCaptchaAC>


export const setUserAuthDataAC = (authData: UserAuthDataModelType, isAuth: boolean) => (
    {type: 'tl/AUTH/SET-USER-AUTH-DATA', payload: {...authData, isAuth} } as const
)
export const setCaptchaAC = (captchaURL: string | null) => (
    {type: 'tl/AUTH/SET-CAPTCHA', payload: {captchaURL} } as const
)






export const requestUserAuthDataTC = () => async (dispatch: Dispatch<any>) => {
    try {
        let response = await authAPI.authMe();

        if (response.resultCode === ResponseResultCodesEnum.Success) dispatch( setAppMessageAC({success: `Hello ${response.data.login}!`}) );

        // setAppRequestStatus to 'idle' but no matter
        handleAPIResponseError<typeof setUserAuthDataAC>(response, dispatch, setUserAuthDataAC, [response.data, true]);

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}


export const loginTC = (loginData: LoginDataType) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch( setAppRequestStatusAC('loading') );
        let response = await authAPI.login(loginData);
        
        if (response.resultCode === ResponseResultCodesEnum.Success) {
            dispatch( requestUserAuthDataTC() );

        } else if (response.resultCode === ResponseCaptchaResultCodeEnum.CaptchaRequired) {
            dispatch( getCaptchaUrlTC() );
            dispatch( setAppMessageAC({info: 'Please input captcha symbols'}) );

        } else {
            dispatch( setAppMessageAC({error: response.messages[0] || 'Some error occurred'}) );
        }
    
        dispatch( setAppRequestStatusAC('idle') );


    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}

export const getCaptchaUrlTC = () => async (dispatch: Dispatch<any>) => {
    try {
        const captchaUrl = await authAPI.getCaptcha();

        dispatch(setCaptchaAC(captchaUrl));
    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}


export const logoutTC = () => async (dispatch: Dispatch<any>) => {
    try {
        const response = await authAPI.logout();

        if (response.resultCode === ResponseResultCodesEnum.Success) dispatch( setAppMessageAC({success: 'See you soon!'}) );

        handleAPIResponseError<typeof setUserAuthDataAC>(response, dispatch, setUserAuthDataAC, [{id: null, email: null, login: null}, false]);
        
        // todo: need to cleanup state todolists, tasklists

    } catch(e: any) {
        handleHTTPResponseError(e, dispatch);
    }
}

export default authReducer;

export type AuthStateType = typeof initialState;

type UserAuthDataModelType = {
    id: number | null
    email: string | null
    login: string | null
}
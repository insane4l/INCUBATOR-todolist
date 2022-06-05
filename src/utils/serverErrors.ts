import { Dispatch } from "react";
import { ResponseResultCodesEnum, ResponseType } from "../api/API";
import { setAppMessageAC, setAppRequestStatusAC } from '../bll/appReducer'


export function handleAPIResponseError<AC extends Function>(response: ResponseType, dispatch: Dispatch<any>, actionCreator: AC, args: ArgumentTypes<AC>) {

    if (response.resultCode === ResponseResultCodesEnum.Success) {
        dispatch(actionCreator(...args));

    } else {
        dispatch( setAppMessageAC({error: response.messages[0] || 'Some error occurred'}) );

    }

    dispatch( setAppRequestStatusAC('idle') );
}


export const handleHTTPResponseError = (error: any, dispatch: Dispatch<HTTPResponseDispatchType>) => {
    
    dispatch( setAppMessageAC({error: error.message || 'Some error occurred'}) )
    dispatch( setAppRequestStatusAC('idle') );
}


// todo: how to put Function type into generic.. why it not works
// type APIResponseDispatchType<T extends Function> = ReturnType<typeof setAppMessageAC> | ReturnType<typeof setAppRequestStatusAC> | ReturnType<T>
type HTTPResponseDispatchType = ReturnType<typeof setAppMessageAC> | ReturnType<typeof setAppRequestStatusAC>


type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never
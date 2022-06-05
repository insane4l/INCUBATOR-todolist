import { Dispatch } from "react";
import authAPI from "../api/authAPI";
import { requestUserAuthDataTC } from "./authReducer";

let initialState = {
    appRequestStatus: 'idle' as AppRequestStatusesType,
    appMessages: {
        success: null,
        error: null,
        info: null,
    } as AppMessagesType,
    isInitialized: false,
}


const appReducer = (state: AppStateType = initialState, action: AppReducerActionsType): AppStateType => {
    switch(action.type) {
        case 'tl/APP/SET-APP-REQUEST-STATUS':
            return {...state, appRequestStatus: action.appRequestStatus};
        case 'tl/APP/SET-INITIALIZED-STATUS':
            return {...state, isInitialized: action.status};
        case 'tl/APP/SET-APP-MESSAGES':
            return {
                ...state,
                appMessages: {
                    ...state.appMessages,
                    ...action.updatedMessages
                },
            }
        default: return state;
    }
}


export const setAppRequestStatusAC = (appRequestStatus: AppRequestStatusesType) => ( {type: 'tl/APP/SET-APP-REQUEST-STATUS', appRequestStatus} as const )
export const setAppMessageAC = (updatedMessages: UpdateAppMessagesModel) => ( {type: 'tl/APP/SET-APP-MESSAGES', updatedMessages} as const )
export const setInitializedStatusAC = (status: boolean) => ( {type: 'tl/APP/SET-INITIALIZED-STATUS', status} as const )



export const initializeAppTC = () => async (dispatch: Dispatch<any>) => {

    await dispatch(requestUserAuthDataTC());

    dispatch(setInitializedStatusAC(true));
}



export default appReducer;








// export type AppRequestStatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppRequestStatusesType = 'idle' | 'loading'
export type AppMessagesType = {
    success: AppMessageType
    error: AppMessageType
    info: AppMessageType
}
export type AppMessageType = string | null
export type AppStateType = typeof initialState
type AppReducerActionsType = ReturnType<typeof setAppRequestStatusAC> | ReturnType<typeof setAppMessageAC>
| ReturnType<typeof setInitializedStatusAC>


// todo: read 'Mapped object types TS'
// type AppMessagesKeysType = 'success' | 'error' | 'info';
// type UpdateAppMessageModel = { [Key in AppMessagesKeysType as string]: AppMessageType };
type UpdateAppMessagesModel = {
    success?: AppMessageType
    error?: AppMessageType
    info?: AppMessageType
}
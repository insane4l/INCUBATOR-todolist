let initialState = {
    appRequestStatus: 'idle' as AppRequestStatusesType,
    appMessages: {
        success: null,
        error: null,
        info: null,
    } as AppMessagesType
}


const appReducer = (state: AppStateType = initialState, action: AppReducerActionsType): AppStateType => {
    switch(action.type) {
        case 'tl/APP/SET-APP-REQUEST-STATUS':
            return {...state, appRequestStatus: action.appRequestStatus};
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


// todo: read 'Mapped object types TS'
// type AppMessagesKeysType = 'success' | 'error' | 'info';
// type UpdateAppMessageModel = { [Key in AppMessagesKeysType as string]: AppMessageType };
type UpdateAppMessagesModel = {
    success?: AppMessageType
    error?: AppMessageType
    info?: AppMessageType
}
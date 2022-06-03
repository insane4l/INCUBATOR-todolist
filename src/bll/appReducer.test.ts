import appReducer, { AppStateType, AppRequestStatusesType, setAppMessageAC, setAppRequestStatusAC } from "./appReducer";

let startState: AppStateType = {
    appRequestStatus: 'idle',
    appMessages: {
        success: null,
        error: null,
        info: null,
    },
};

test('correct error message should be set correctly', () => {
    let msg = 'error message';
    let newState = appReducer(startState, setAppMessageAC({error: msg}));

    expect(newState.appMessages.error).toBe(msg);
    expect(newState.appMessages.success).toBe(null);
    expect(newState.appRequestStatus).toBeDefined();
})


test('correct status should be set correctly', () => {
    let status: AppRequestStatusesType = 'loading';
    let newState = appReducer(startState, setAppRequestStatusAC(status));

    expect(newState.appRequestStatus).toBe(status);
    expect(newState.appMessages).toBeDefined();
})
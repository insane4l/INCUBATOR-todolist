import axios from 'axios';

export const apiBase = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'api-key': 'e88bb7e6-af23-49e2-8781-5099f9ee4dd5',
    },
    withCredentials: true,
});


export enum ResponseResultCodesEnum {
    Success,
    Error,
}

export enum ResponseCaptchaResultCodeEnum {
    CaptchaRequired = 10,
}

export type ResponseType<D = {}, RC = ResponseResultCodesEnum> = {
    resultCode: RC
    messages: string[]
    data: D
}
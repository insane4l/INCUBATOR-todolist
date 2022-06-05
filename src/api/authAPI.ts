import { apiBase, ResponseCaptchaResultCodeEnum, ResponseResultCodesEnum, ResponseType } from "./API";

export const authAPI = {
    authMe() {
        return apiBase.get<ResponseType<UserAuthDataType>>('/auth/me').then(res => res.data);
    },
    login(loginData: LoginDataType) {
        return apiBase.post<LoginResponseType>('/auth/login', loginData).then(res => res.data);
    },
    logout() {
        return apiBase.delete<ResponseType>('/auth/login').then(res => res.data)
    },
    getCaptcha() {
        return apiBase.get<{url: string}>('/security/get-captcha-url').then(res => res.data.url);
    },
}

export default authAPI;



export type UserAuthDataType = {
    id: number
    email: string
    login: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type LoginResponseType = ResponseType<{userId: number}, ResponseResultCodesEnum | ResponseCaptchaResultCodeEnum>
import request from '../index'

import type { UserInfo, UserToken } from '#/entity'

// 登录
export interface SignInReq {
  username: string
  password: string
}

// 注册
export interface SignUpReq extends SignInReq {
  email: string
}
export type SignInRes = UserToken & { user: UserInfo }

export enum UserApi {
  SignIn = '/auth/signin',
}

export const reqSignin = (data: SignInReq) => request.post<SignInRes>({ url: UserApi.SignIn, data })

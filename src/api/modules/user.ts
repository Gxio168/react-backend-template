import request from '../index'

import type { UserToken, UserInfo } from '#/entity'

// 登录
export interface UserLoginReq {
  username: string
  password: string
}

// 注册
export interface UserRegisterReq extends UserLoginReq {}

export type UserLoginRes = UserToken & { id: number }

export enum UserApi {
  LOGIN = '/user/login',
  REGISTER = '/user/register',
  PROFILE = '/user/profile',
}

/**
 * 登录
 * @param data
 * @returns
 */
export const reqLogin = (data: UserLoginReq) => {
  return request.post<UserLoginRes>({ url: UserApi.LOGIN, data })
}

/**
 * 注册
 * @param data
 * @returns
 */
export const reqRegister = (data: UserRegisterReq) => {
  return request.post<string>({ url: UserApi.REGISTER, data })
}

export const reqUserProfile = () => {
  return request.get<UserInfo>({ url: UserApi.PROFILE })
}

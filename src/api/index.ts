import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse } from 'axios'

import { t } from '@/lang'

import { toast } from 'sonner'
import type { Result } from '#/api'
import { ResultEnum } from '#/enum'
import useUserStore, { useSignOut } from '@/store/userStore'

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截
axiosInstance.interceptors.request.use(
  config => {
    // token 添加
    const token = useUserStore.getState().userToken
    if (token) config.headers!.Authorization = token
    return config
  },
  error => {
    // 请求错误时做些什么
    return Promise.reject(error)
  }
)

// 响应拦截
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    if (!res.data) throw new Error(t('sys.api.apiRequestFailed'))

    const { code, data, msg } = res.data
    // 业务请求成功
    const hasSuccess = data && Reflect.has(res.data, 'code') && code === ResultEnum.SUCCESS
    if (hasSuccess) {
      return data
    }
    // 业务请求错误
    throw new Error(msg || t('sys.api.apiRequestFailed'))
  },
  (error: AxiosError<Result>) => {
    const signOut = useSignOut()

    const { response, message } = error || {}
    const errMsg = response?.data?.msg || message || t('sys.api.errorMessage')
    toast.error(errMsg, {
      position: 'top-center',
    })

    const status = response?.status
    if (status === 401) {
      // 退出登录
      signOut()
    }
    return Promise.reject(error)
  }
)

class Request {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          reject(e)
        })
    })
  }
}
export default new Request()

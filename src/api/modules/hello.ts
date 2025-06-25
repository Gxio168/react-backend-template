import { Result } from '#/api'
import request from '../index'

export enum HelloApi {
  HELLO = '/hello',
}

export const reqHello = () => request.get<Result<string>>({ url: HelloApi.HELLO })

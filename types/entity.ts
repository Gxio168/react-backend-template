import { BasicStatus, PermissionType } from './enum'

export interface UserInfo {
  id: string
  username: string
  email?: string
  password?: string
  avatar?: string
  role?: Role
  status?: BasicStatus
  permissions?: Permission[]
}

export interface Role {
  id: string
  name: string
  label: string
  status: BasicStatus
  order?: number
  desc?: string
  permission?: Permission[]
}

export interface Permission {
  id: string
  parentId: string
  name: string
  label: string
  type: PermissionType
  route: string
  status?: BasicStatus
  order?: number
  icon?: string
  component?: string
  hide?: boolean
  hideTab?: boolean
  frameSrc?: string
  newFeature?: boolean
  children?: Permission[]
}

export interface UserToken {
  token?: string
}

/**
 * 路由
 */
export interface RouteItem {
  id: number
  parentId: number | null
  label: string
  name: string
  route: string
  order: number
  icon?: string
  component?: string
}

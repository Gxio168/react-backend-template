import { useSignOut, useUserToken } from '@/store/userStore'
import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const location = useLocation()
  const token = useUserToken()
  const signOut = useSignOut()

  // 是否返回登录页
  const searchParams = new URLSearchParams(location.search)
  const isLoggingOut = searchParams.has('logout')

  // 检查权限
  const check = useCallback(() => {
    // 判断是否退出登录
    if (isLoggingOut) {
      signOut()
      return
    }

    // 首先判断 token 是否存在于本地，不存在直接跳转
    if (!token) {
      signOut()
      return
    }
  }, [location.pathname, location.search])

  useEffect(() => {
    check()
  }, [check])
  return token ? <>{children}</> : null
}

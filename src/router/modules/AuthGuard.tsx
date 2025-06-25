import { useUserActions, useUserToken } from '@/store/userStore'
import { useCallback, useEffect } from 'react'
import { reqUserProfile } from '@/api/modules/user'
import { useLocation } from 'react-router-dom'
import { useRouter } from '../hooks/useRouter'

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const { setUserInfo } = useUserActions()

  const location = useLocation()
  const router = useRouter()
  const token = useUserToken()
  const check = useCallback(() => {
    // 首先判断 token 是否存在于本地，不存在直接跳转, 需要携带 重定向
    if (!token) {
      router.replace('/login')
    }
    // 若 token 存在，则检查 token 是否过期
    reqUserProfile()
      .then(res => {
        // 校验成功, 保存信息
        setUserInfo(res)
      })
      .catch(() => {
        // 校验失败
        router.replace('/login')
      })
  }, [location.pathname, token])

  useEffect(() => {
    check()
  }, [check])
  return <>{children}</>
}

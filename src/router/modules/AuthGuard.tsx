import { useUserToken } from '@/store/userStore'
import { useRouter } from '../hooks/useRouter'
import { useCallback, useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter()
  const token = useUserToken()
  const check = useCallback(() => {
    // TODO 还需要根据 token 解析用户信息后判断
    if (!token) {
      router.replace('/login')
    }
  }, [router, token])

  useEffect(() => {
    check()
  }, [check])
  return <>{children}</>
}

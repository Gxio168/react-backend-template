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
    // 如果没有token
    if (!token) {
      router.replace('/login')
    }
  }, [router, token])

  useEffect(() => {
    check()
  }, [check])
  return <>{children}</>
}

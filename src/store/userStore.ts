import { useNavigate, useSearchParams } from 'react-router-dom'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { StorageEnum } from '#/enum'
import { type UserLoginReq, reqLogin } from '@/api/modules/user'
import type { UserInfo } from '#/entity'

type UserStore = {
  userInfo: Partial<UserInfo>
  userToken: string
  actions: {
    setUserInfo: (userInfo: UserInfo) => void
    setUserToken: (token: string) => void
    clearUserInfoAndToken: () => void
  }
}

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      [StorageEnum.UserInfo]: {},
      [StorageEnum.UserToken]: '',
      actions: {
        setUserInfo: userInfo => set({ userInfo }),
        setUserToken: userToken => set({ userToken }),
        clearUserInfoAndToken: () => set({ userInfo: {}, userToken: '' }),
      },
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        [StorageEnum.UserInfo]: state.userInfo,
        [StorageEnum.UserToken]: state.userToken,
      }),
    }
  )
)

export const useUserInfo = () => useUserStore(state => state.userInfo)
export const useUserToken = () => useUserStore(state => state.userToken)
export const useUserActions = () => useUserStore(state => state.actions)

export const useSignIn = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const redirect = searchParams.get('redirect') || '/'
  const { setUserToken, clearUserInfoAndToken } = useUserActions()

  const signIn = async (data: UserLoginReq) => {
    try {
      const res = await reqLogin(data)
      const { token } = res
      // 保存 token 到本地
      setUserToken(token!)
      navigate(redirect, { replace: true })
    } catch (err: any) {
      clearUserInfoAndToken()
      navigate('/login', { replace: true })
      toast.error(err.message, {
        position: 'top-center',
      })
    }
  }
  return signIn
}

export default useUserStore

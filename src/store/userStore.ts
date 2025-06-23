import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { StorageEnum } from '#/enum'
import { type SignInReq, reqSignin } from '@/api/modules/user'
import type { UserInfo } from '#/entity'

// 首页
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

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
  const navigate = useNavigate()
  const { setUserInfo, setUserToken, clearUserInfoAndToken } = useUserActions()

  const signIn = async (data: SignInReq) => {
    try {
      const res = await reqSignin(data)
      const { user, token } = res
      setUserInfo(user)
      setUserToken(token!)
      navigate(HOMEPAGE, { replace: true })
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

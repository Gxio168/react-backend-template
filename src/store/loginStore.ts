import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type LoginInfo = {
  username: string
  password: string
  isRemember: boolean
}

type LoginStore = {
  loginInfo: LoginInfo
  actions: {
    setLoginInfo: (loginInfo: LoginInfo) => void
    clearLoginInfo: () => void
  }
}

const useLoginStore = create<LoginStore>()(
  persist(
    set => ({
      loginInfo: {
        username: '',
        password: '',
        isRemember: false,
      },
      actions: {
        setLoginInfo: loginInfo => set({ loginInfo }),
        clearLoginInfo: () => set({ loginInfo: { username: '', password: '', isRemember: false } }),
      },
    }),
    {
      name: 'loginStore',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        loginInfo: state.loginInfo,
      }),
    }
  )
)

export const useLoginInfo = () => useLoginStore(state => state.loginInfo)
export const useLoginActions = () => useLoginStore(state => state.actions)

export default useLoginStore

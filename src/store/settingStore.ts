import { ThemeColorPresets, ThemeLayout, ThemeMode, StorageEnum } from '#/enum'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SettingsType = {
  themeColorPresets: ThemeColorPresets
  themeMode: ThemeMode
  themeLayout: ThemeLayout
  themeStretch: boolean
  breadCrumb: boolean
  multiTab: boolean
  darkSidebar: boolean
  collapseMenu: boolean
}

type SettingStore = {
  settings: SettingsType
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setSettings: (settings: SettingsType) => void
    clearSettings: () => void
  }
}

const useSettingStore = create<SettingStore>()(
  persist(
    set => ({
      settings: {
        themeColorPresets: ThemeColorPresets.Default,
        themeMode: ThemeMode.Light,
        themeLayout: ThemeLayout.Vertical,
        themeStretch: false,
        breadCrumb: true,
        multiTab: true,
        darkSidebar: false,
        collapseMenu: false,
      },
      actions: {
        setSettings: settings => set({ settings }),
        clearSettings: () => set({ settings: {} as SettingsType }),
      },
    }),
    {
      name: StorageEnum.Settings,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ [StorageEnum.Settings]: state.settings }),
    }
  )
)

export const useSettings = () => useSettingStore(state => state.settings)
export const useSettingActions = () => useSettingStore(state => state.actions)

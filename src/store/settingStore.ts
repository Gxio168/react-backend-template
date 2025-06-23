import { ThemeColorPresets, ThemeLayout, ThemeMode, StorageEnum } from '#/enum'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SettingsType = {
  themeColorPresets: ThemeColorPresets // 主题色预设
  themeMode: ThemeMode // 主题模式
  themeLayout: ThemeLayout // 布局
  themeStretch: boolean // 是否拉伸布局
  breadCrumb: boolean // 是否显示面包屑
  multiTab: boolean // 是否启用多标签页
  darkSidebar: boolean // 侧边栏暗色模式
  collapseMenu: boolean // 侧边栏折叠状态
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

import { useSettingActions, useSettings } from '@/store/settingStore'
import { Icon } from '@iconify/react/dist/iconify.js'

import Avatar from './navbar-sub/Avatar'
import Settings from './navbar-sub/Settings'
import ToggleLang from './navbar-sub/ToggleLang'
import { useThemeToken } from '@/theme/hooks/use-theme-token'

export default function Navbar() {
  const { colorPrimary } = useThemeToken()
  // 菜单折叠
  const settings = useSettings()
  const setSettings = useSettingActions()
  const handleCollapse = () => {
    setSettings.setSettings({
      ...settings,
      collapseMenu: !settings.collapseMenu,
    })
  }

  return (
    <div className="flex justify-between items-center  pr-10 h-10 border-b-gray-300 border-b">
      {/*左侧折叠  */}
      <div className="flex items-center justify-center p-2 cursor-pointer">
        <Icon
          color={colorPrimary}
          icon={
            settings.collapseMenu
              ? 'solar:square-double-alt-arrow-right-line-duotone'
              : 'solar:square-double-alt-arrow-left-line-duotone'
          }
          className="w-8 h-8"
          onClick={handleCollapse}
        />
      </div>
      {/* 右侧图标 */}
      <div className="flex flex-row items-center justify-center space-x-3">
        <ToggleLang />
        <Settings />
        <Avatar />
      </div>
    </div>
  )
}

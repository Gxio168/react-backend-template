import { useSettingActions, useSettings } from '@/store/settingStore'
import { Icon } from '@iconify/react/dist/iconify.js'

import Avatar from './Avatar'
import Settings from './Settings'

export default function Navbar() {
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
    <div className="flex justify-between items-center  pr-10">
      <div className="flex items-center justify-center p-2 cursor-pointer">
        <Icon
          icon={
            settings.collapseMenu
              ? 'solar:square-double-alt-arrow-right-line-duotone'
              : 'solar:square-double-alt-arrow-left-line-duotone'
          }
          className="w-8 h-8"
          onClick={handleCollapse}
        />
      </div>
      <div className="flex flex-row items-center justify-center space-x-3">
        <Settings />
        <Avatar />
      </div>
    </div>
  )
}

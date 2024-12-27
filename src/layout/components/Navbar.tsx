import { useSettingActions, useSettings } from '@/store/settingStore'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function Navbar() {
  const settings = useSettings()
  const setSettings = useSettingActions()
  const handleCollapse = () => {
    setSettings.setSettings({
      ...settings,
      collapseMenu: !settings.collapseMenu,
    })
  }
  return (
    <div className="flex">
      <div className="flex items-center justify-center p-2">
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
      <div>Navbar</div>
    </div>
  )
}

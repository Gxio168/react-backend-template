import { ThemeColorPresets, ThemeMode } from '#/enum'
import IconButton from '@/components/icon-button'
import { useSettingActions, useSettings } from '@/store/settingStore'
import { colorPrimarys } from '@/theme/antd-theme'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Card, Drawer } from 'antd'
import { useState } from 'react'

export default function Settings() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { setSettings } = useSettingActions()
  const settings = useSettings()

  // 修改 ThemeMode
  const handleThemeMode = (themeMode: ThemeMode) => {
    setSettings({
      ...settings,
      themeMode,
    })
  }

  // 修改 PrimaryColor
  const handlePrimaryColor = (themeColorPresets: ThemeColorPresets) => {
    setSettings({
      ...settings,
      themeColorPresets,
    })
  }
  const style = {
    color: colorPrimarys[settings.themeColorPresets],
  }
  return (
    <>
      <div onClick={() => setDrawerOpen(true)} className="flex items-center">
        <IconButton
          icon="line-md:cog-loop"
          className="text-[1.5em] text-gray-500 "
          style={{
            animation: 'linear',
          }}
        />
      </div>
      <Drawer
        placement="right"
        title="Settings"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closable={false}
        width={280}
        styles={{
          body: { padding: 0 },
          mask: { backgroundColor: 'transparent' },
        }}
        style={{
          backdropFilter: 'blur(10px)',
        }}
        closeIcon={null}
        extra={
          <IconButton onClick={() => setDrawerOpen(false)} className="h-9 w-9 hover:scale-105">
            <Icon icon="ep:close" />
          </IconButton>
        }>
        <div className="flex flex-col gap-6 p-6">
          {/* theme Mode */}
          <div>
            <span className="text-gray-500 text-lg mb-2 block">Mode</span>
            <div className="flex  items-center  gap-4">
              <Card
                className="flex h-20 w-full cursor-pointer items-center justify-center"
                onClick={() => handleThemeMode(ThemeMode.Light)}>
                <Icon
                  icon="solar:sun-outline"
                  className="w-6 h-6"
                  style={settings.themeMode === ThemeMode.Light ? style : {}}
                />
              </Card>
              <Card
                className="flex h-20 w-full cursor-pointer items-center justify-center"
                onClick={() => handleThemeMode(ThemeMode.Dark)}>
                <Icon
                  icon="solar:cloudy-moon-linear"
                  className="w-6 h-6"
                  style={settings.themeMode === ThemeMode.Dark ? style : {}}
                />
              </Card>
            </div>
          </div>

          {/* Presets */}
          <div>
            <span className="text-gray-500 text-lg mb-2 block">Presets</span>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {Object.entries(colorPrimarys).map(([preset, color]) => {
                return (
                  <Card
                    key={preset}
                    onClick={() => handlePrimaryColor(preset as ThemeColorPresets)}
                    className="flex h-14 w-full cursor-pointer items-center justify-center">
                    <div
                      className="rounded-full"
                      style={{
                        backgroundColor: color,
                        width: settings.themeColorPresets === preset ? '1.2em' : '0.8em',
                        height: settings.themeColorPresets === preset ? '1.2em' : '0.8em',
                        transition: 'all 0.2s ease-in-out',
                      }}
                    />
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

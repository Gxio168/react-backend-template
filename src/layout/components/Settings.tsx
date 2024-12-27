import IconButton from '@/components/icon-button'
import { colorPrimarys } from '@/theme/antd-theme'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Card, Drawer } from 'antd'
import { useState } from 'react'

export default function Settings() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <div onClick={() => setDrawerOpen(true)} className="flex items-center">
        <IconButton icon="line-md:cog-loop" className="text-3xl" />
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
            <span className="text-gray-800 text-lg mb-2 block">Mode</span>
            <div className="flex  items-center  gap-4">
              <Card className="flex h-20 w-full cursor-pointer items-center justify-center">
                <Icon icon="solar:sun-outline" className="w-6 h-6" />
              </Card>
              <Card className="flex h-20 w-full cursor-pointer items-center justify-center">
                <Icon icon="solar:cloudy-moon-linear" className="w-6 h-6" />
              </Card>
            </div>
          </div>

          {/* Presets */}
          <div>
            <span className="text-gray-800 text-lg mb-2 block">Presets</span>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {Object.entries(colorPrimarys).map(([preset, color]) => {
                return (
                  <Card
                    key={preset}
                    className="flex h-14 w-full cursor-pointer items-center justify-center">
                    <div
                      className="rounded-full"
                      style={{ backgroundColor: color, width: '.8em', height: '.8em' }}
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

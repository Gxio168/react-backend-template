import useLocal from '@/lang/useLocal'
import { LocalEnum } from '#/enum'
import { Button, Dropdown, MenuProps } from 'antd'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function ToggleLang() {
  const { locale, changeLanguage } = useLocal()
  const handleToggleLangh = (local: LocalEnum) => {
    changeLanguage(local)
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="flex items-center justify-center gap-2">
          <Icon icon="flagpack:cn" />
          <span>Chinese</span>
        </div>
      ),
      key: '0',
      onClick: () => handleToggleLangh(LocalEnum.zh_CN),
    },
    {
      label: (
        <div className="flex items-center justify-center gap-2">
          <Icon icon="flagpack:au" />
          <span>English</span>
        </div>
      ),
      key: '1',
      onClick: () => handleToggleLangh(LocalEnum.en_US),
    },
  ]
  return (
    <>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        className="cursor-pointer">
        <Button
          icon={<Icon icon={locale === 'en_US' ? 'flagpack:au' : 'flagpack:cn'} />}
          type="text"
          shape="circle"
          className="text-[1.2em]"
        />
      </Dropdown>
    </>
  )
}

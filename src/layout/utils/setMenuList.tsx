import { type MenuItem } from '@/config/index'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'

export function setMenuList(menu: MenuItem[], parentKey: string = ''): any {
  const { t } = useTranslation()
  menu.sort((a, b) => a.order - b.order)
  return menu.map(item => {
    const tempKey = parentKey + '/' + item.route
    return {
      label: t(item.label),
      key: tempKey,
      icon: item.icon && <Icon icon={item.icon} className="w-6 h-6" />,
      children: item.children.length ? setMenuList(item.children, tempKey) : undefined,
    }
  })
}

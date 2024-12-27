import { Icon } from '@iconify/react/dist/iconify.js'
import { Button } from 'antd'
import { CSSProperties, ReactNode } from 'react'

type Props = {
  icon?: string
  children?: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export default function IconButton({ children, icon, className, style, onClick }: Props) {
  return (
    <>
      <Button
        onClick={onClick}
        type="text"
        shape="circle"
        icon={icon && <Icon icon={icon} />}
        className={className}
        style={style}>
        {children}
      </Button>
    </>
  )
}

import AntdConfig from '@/theme/abtd-index'
import { App as AntdApp } from 'antd'
import Router from './router/index'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <>
      <AntdConfig>
        <AntdApp>
          <Router />
          <Toaster position="top-center" />
        </AntdApp>
      </AntdConfig>
    </>
  )
}

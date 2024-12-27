import { Button, Layout } from 'antd'
import SideBar from './components/SiderBar'
import Navbar from './components/Navbar'
import Main from './components/Main'
import NProgress from '@/components/progress-bar'
import { useSettingActions, useSettings } from '@/store/settingStore'
import { Icon } from '@iconify/react/dist/iconify.js'

const { Header, Sider, Content } = Layout

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'auto',
}

export default function DashBoardLayout() {
  const settings = useSettings()
  


  return (
    <>
      <NProgress />
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={settings.collapseMenu}
          width={260}
          className="h-screen bg-white border-r-[0.1px] border-dashed"
          style={siderStyle}>
          <SideBar collapsed={settings.collapseMenu} />
        </Sider>
        <Layout>
          <Header className="bg-white p-0">
            <Navbar />
          </Header>
          <Content className="p-4 bg-white">
            <Main />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

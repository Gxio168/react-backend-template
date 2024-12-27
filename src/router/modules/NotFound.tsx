import { Button } from 'antd'

export default function NotFound() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <span className="text-3xl font-bold mb-10">你所查看的页面不存在</span>
        <Button type="primary" onClick={() => (window.location.href = '/#/login')}>
          返回首页
        </Button>
      </div>
    </>
  )
}

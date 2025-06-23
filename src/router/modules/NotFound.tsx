import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <span className="text-3xl font-bold mb-10">你所查看的页面不存在</span>
        <Button type="primary" onClick={() => navigate('/login')}>
          返回首页
        </Button>
      </div>
    </>
  )
}

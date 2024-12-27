import Router from './router/index'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <>
      <Router />
      <Toaster position="top-center" />
    </>
  )
}

import App from './App'
import { createRoot } from 'react-dom/client'
import worker from './mocks/index.js'

import '@/lang'
import '@/theme/base.css'

createRoot(document.getElementById('root')!).render(<App />)

worker.start()

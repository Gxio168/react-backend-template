import App from './App'
import { createRoot } from 'react-dom/client'

import worker from './mocks/index.js'

import '@/lang'
import '@/theme/index.css'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

worker.start()

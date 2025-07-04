import App from './App'
import { createRoot } from 'react-dom/client'

import '@/lang'
import '@/theme/index.css'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

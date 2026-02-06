import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/themes.css'
import './styles/globals.css'
import './styles/typography.css'
import './components/Preview/codeBlockStyle.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

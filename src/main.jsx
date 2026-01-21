import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Adm from './adm/Adm.jsx'
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Adm />
  </StrictMode>,
)

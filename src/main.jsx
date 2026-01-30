import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotificationsProvider } from './adm/notifications/NotificationsProvider.jsx';
import Adm from './adm/Adm.jsx'
import './main.css'

createRoot(document.getElementById('root')).render(
  <NotificationsProvider>
    <Adm />
  </NotificationsProvider>,
)

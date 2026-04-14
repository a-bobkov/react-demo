import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LingoProvider } from './adm/lingo/LingoProvider.jsx';
import { NotificationsProvider } from './adm/notifications/NotificationsProvider.jsx';
import { ModalDialogProvider } from './adm/modalDialog/ModalDialogProvider.jsx';
import Adm from './adm/Adm.jsx'
import './main.css'

createRoot( document.getElementById('root')).render(
  <LingoProvider>
    <NotificationsProvider>
      <ModalDialogProvider>
        <Adm />
      </ModalDialogProvider>
    </NotificationsProvider>
  </LingoProvider>
)

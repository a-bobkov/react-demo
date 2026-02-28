import { createContext, useContext } from 'react';
import { useNotifications } from './useNotifications.jsx';
import { Notifications } from './Notifications.jsx';

const NotificationsContext = createContext(null);

export function useNotificationsContext()
{
  return useContext( NotificationsContext );
}

export function NotificationsProvider({ children })
{
  const { notifications, apiNotifications, removeNotification } = useNotifications();

  return (
    <>
      <NotificationsContext value={ apiNotifications }>
        { children }
      </NotificationsContext>
      <Notifications
        notifications={ notifications }
        removeNotification={ removeNotification }
      />
    </>
  );
}

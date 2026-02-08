import { createContext, useContext } from 'react';
import { useNotificationsState } from './useNotificationsState.jsx';
import { Notifications } from './Notifications.jsx';

const NotificationsContext = createContext(null);

export function useNotificationsContext()
{
  return useContext( NotificationsContext );
}

export function NotificationsProvider({ children })
{
  const { notifications, apiNotifications, removeNotification } = useNotificationsState();

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

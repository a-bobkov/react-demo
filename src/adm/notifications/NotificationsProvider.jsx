import { useState, createContext, useContext } from 'react';
import { Notifications } from './Notifications.jsx';

const NotificationsContext = createContext(null);

export function useNotifications()
{
  return useContext( NotificationsContext );
}

let nextId = 1;

export function NotificationsProvider({ children })
{
  const [notifications, setNotifications] = useState([]);

  const apiNotifications = {
    addInfo: addInfo,
    addError: addError,
    remove: remove,
  };

  return (
    <NotificationsContext value={{ notifications, apiNotifications }}>
      { children }
      <Notifications/>
    </NotificationsContext>
  );

  function addInfo( message )
  {
    addNotification( message, 'info' );
  }

  function addError( message )
  {
    addNotification( message, 'error' );
  }

  function addNotification( message, type )
  {
    const newNotification = {
      id: nextId++,
      type,
      message,
    };

    // newNotification.message = `${ newNotification.message } ${ newNotification.id } `.repeat(7);

    setNotifications( adder );

    function adder( notifications )
    {
      return [...notifications, newNotification];
    }
  }

  function remove( notificationId )
  {
    setNotifications( remover );

    function remover( notifications )
    {
      return notifications.filter( notification =>
        notification.id !== notificationId
      );
    }
  }
}

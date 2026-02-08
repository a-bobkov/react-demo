import { useState } from 'react';

let nextId = 1;

export function useNotificationsState()
{
  const [ notifications, setNotifications ] = useState([]);

  const apiNotifications = {
    addInfo: addInfo,
    addError: addError,
  };

  return { notifications, apiNotifications, removeNotification };

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

  function removeNotification( notificationId )
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

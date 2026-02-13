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
    addNotification( message, 'info', 5000 );
  }

  function addError( message )
  {
    addNotification( message, 'error' );
  }

  function addNotification( message, type, ms )
  {
    const newNotification = {
      id: nextId++,
      type,
      message,
    };

    // newNotification.message = `${ newNotification.message } ${ newNotification.id } `.repeat(7);

    setNotifications( adder );

    autodelete( newNotification.id, ms);

    function adder( notifications )
    {
      return [...notifications, newNotification];
    }
  }

  async function autodelete( notificationId, ms )
  {
    if ( !ms ) return;

    await delay( ms );

    removeNotification( notificationId );
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

function delay( ms )
{
  return new Promise( resolve => setTimeout( resolve, ms ));
}
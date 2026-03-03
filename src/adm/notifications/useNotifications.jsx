import { useCreateNotification } from './useCreateNotification.js';
import { useNotificationsDispatch } from './useNotificationsDispatch.jsx';
import { useRunOnce } from '../useRunOnce.js';

export function useNotifications()
{
  const { createNotification } = useCreateNotification();

  const { notifications, notificationsDispatchApi } = useNotificationsDispatch([]);

  const apiNotifications = useRunOnce( createNotificationsApi, { notificationsDispatchApi, createNotification });

  return {
    notifications,
    apiNotifications,
    removeNotification: notificationsDispatchApi.remove,
  };
}

function createNotificationsApi({ notificationsDispatchApi, createNotification })
{
  return {
    addInfo,
    addError,
  };

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
    const newNotification = createNotification({
      type,
      message,
    });

    // newNotification.message = `${ newNotification.message } ${ newNotification.id } `.repeat(7);

    notificationsDispatchApi.add( newNotification );

    if ( ms ) {
      selfRemoval( newNotification.id, ms);
    }
  }

  async function selfRemoval( notificationId, ms )
  {
    await delay( ms );

    notificationsDispatchApi.remove( notificationId );
  }
}

function delay( ms )
{
  return new Promise( resolve => setTimeout( resolve, ms ));
}
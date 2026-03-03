import { useReducer } from 'react';
import { useRunOnce } from '../useRunOnce.js';

export function useNotificationsDispatch( initialNotifications )
{
  const [ notifications, notificationsDispatch ] = useReducer( notificationsReducer, initialNotifications );

  const notificationsDispatchApi = useRunOnce( createNotificationsDispatchApi, { notificationsDispatch });

  return {
    notifications,
    notificationsDispatchApi,
  };
}

const NOTIFICATION_ADD = 'add';
const NOTIFICATION_REMOVE = 'remove';

function notificationsReducer( notifications, action )
{
  switch ( action.type )
  {
    case NOTIFICATION_ADD:
    {
      return [ ...notifications, action.notification ];
    }
    case NOTIFICATION_REMOVE:
    {
      return notifications.filter( notification =>
        notification.id !== action.notificationId
      );
    }
  }
}

function createNotificationsDispatchApi({ notificationsDispatch })
{
  return {
    add,
    remove,
  };

  function add( notification )
  {
    notificationsDispatch({
      type: NOTIFICATION_ADD,
      notification,
    });
  }

  function remove( notificationId )
  {
    notificationsDispatch({
      type: NOTIFICATION_REMOVE,
      notificationId,
    });
  }
}

import { useRef } from 'react';
import { useRunOnce } from './useRunOnce.js';

export function useCreateNotification()
{
  const nextId = useRef(1 );

  return useRunOnce( createNotificationApi, { nextId });
}

function createNotificationApi({ nextId })
{
  return {
    createNotification,
  };

  function createNotification( notificationData )
  {
    return {
      ...notificationData,
      id: nextId.current++,
    };
  }
}

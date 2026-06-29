import { useLingo } from '../lingo/LingoProvider.jsx';
import './Notifications.css';

export function Notifications({ notifications, removeNotification })
{
  const { lingo } = useLingo();

  return (
    <notifications>
      { notifications.map( notification =>
        <Notification notification={ notification } />
      )}
    </notifications>
  );

  function Notification({ notification })
  {
    return (
      <notification
        key={ notification.id }
        className={ notification.type }
      >
        <notification-close
          onClick={ onClickClose }
        >
          ✖
        </notification-close>
        { lingo( notification.lingoMessage )}
      </notification>
    );

    function onClickClose()
    {
      removeNotification( notification.id );
    }
  }
}

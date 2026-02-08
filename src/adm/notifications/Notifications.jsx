import './Notifications.css';

export function Notifications({ notifications, removeNotification })
{
  return (
    <div className="Notifications">
      { notifications.map( notification => <Notification notification={ notification } />)}
    </div>
  );

  function Notification({ notification })
  {
    return (
      <div key={ notification.id } className={`Notification ${ notification.type }`} >
        <div className="close" onClick={ onClickClose }>
          ✖
        </div>
        { notification.message }
      </div>
    );

    function onClickClose()
    {
      removeNotification( notification.id );
    }
  }
}

import { UserForm } from '../form/UserForm.jsx';
import { updateUser } from './updateUser.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';

export function UserAppUpdate({ updateOptions, setUpdateOptions, setModeList })
{
  const apiNotifications = useNotificationsContext();

  console.log(`UserAppUpdate updateOptions: ${ JSON.stringify( updateOptions )}`);

  return (
    <UserForm
      key={ updateOptions.id }
      userOptions={ updateOptions }
      onClickSaveUser={ onClickUpdateUser }
      setModeList={ setModeList }
    />
  );

  async function onClickUpdateUser( formUser, dbUser )
  {
    const result = await updateDbUser( formUser );

    if ( result.user )
    {
      setUpdateOptions({
        dbUser: result.user,
        submitUser: result.user,
      });

      apiNotifications.addInfo(`User ${ result.user.id } is successfully saved.`);

      return true;
    }

    setUpdateOptions({
      dbUser: dbUser,
      submitUser: formUser,
      submitErrors: result.error,
      fetchCommonError: result.fetchCommonError,
    });

    return false;
  }

  async function updateDbUser( formUser )
  {
    try {
      return await updateUser( formUser );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      }
    }
  }
}

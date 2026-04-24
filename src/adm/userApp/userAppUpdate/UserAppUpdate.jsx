import { UserForm } from '../form/UserForm.jsx';
import { updateUser } from './updateUser.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';

export function UserAppUpdate({ updateOptions, setUpdateOptions })
{
  const apiNotifications = useNotificationsContext();

  const { lingo } = useLingo();

  console.log(`UserAppUpdate updateOptions: ${ JSON.stringify( updateOptions )}`);

  return (
    <UserForm
      key={ updateOptions.id }
      userOptions={ updateOptions }
      onClickSaveUser={ onClickUpdateUser }
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

      apiNotifications.addInfo(`User ${ result.user.id } is successfully updated.`);

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
      return await updateUser( formUser, lingo );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      }
    }
  }
}

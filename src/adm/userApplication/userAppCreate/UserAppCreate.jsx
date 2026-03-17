import { UserForm } from '../form/UserForm.jsx';
import { createUser } from './createUser.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';

export function UserAppCreate({ createOptions, setCreateOptions, setModeUpdate, setModeList })
{
  const apiNotifications = useNotificationsContext();

  console.log(`UserAppCreate createOptions: ${ JSON.stringify( createOptions )}`);

  return (
    <UserForm
      key={ createOptions.id }
      userOptions={ createOptions }
      onClickSaveUser={ onClickCreateUser }
      setModeList={ setModeList }
    />
  );

  async function onClickCreateUser( formUser, dbUser )
  {
    const result = await createDbUser( formUser );

    if ( result.user )
    {
      setModeUpdate({
        dbUser: result.user,
        submitUser: result.user,
      });

      apiNotifications.addInfo(`User ${ result.user.id } is successfully created.`);

      return true;
    }

    setCreateOptions({
      dbUser: dbUser,
      submitUser: formUser,
      submitErrors: result.error,
      fetchCommonError: result.fetchCommonError,
    });

    return false;
  }

  async function createDbUser( formUser )
  {
    try {
      return await createUser( formUser );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      }
    }
  }
}

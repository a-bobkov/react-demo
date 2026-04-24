import { UserForm } from '../form/UserForm.jsx';
import { createUser } from './createUser.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';

export function UserAppCreate({ createOptions, setCreateOptions, setUpdateOptions })
{
  const apiNotifications = useNotificationsContext();

  const { lingo } = useLingo();

  console.log(`UserAppCreate createOptions: ${ JSON.stringify( createOptions )}`);

  return (
    <UserForm
      key={ createOptions.id }
      userOptions={ createOptions }
      onClickSaveUser={ onClickCreateUser }
    />
  );

  async function onClickCreateUser( formUser, dbUser )
  {
    const result = await createDbUser( formUser );

    if ( result.user )
    {
      setUpdateOptions({
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
      return await createUser( formUser, lingo );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      }
    }
  }
}

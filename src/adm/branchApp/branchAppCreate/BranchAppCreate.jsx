import { BranchForm } from '../form/BranchForm.jsx';
import { createBranch } from './createBranch.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';

export function BranchAppCreate( { createOptions, setCreateOptions, setUpdateOptions })
{
  const apiNotifications = useNotificationsContext();

  const { lingo } = useLingo();

  console.log(`BranchAppCreate createOptions: ${ JSON.stringify( createOptions )}`);

  return (
    <BranchForm
      key={ createOptions.id }
      branchOptions={ createOptions }
      onClickSaveBranch={ onClickCreateBranch }
    />
  );

  async function onClickCreateBranch( formBranch, dbBranch )
  {
    const result = await createDbBranch( formBranch );

    if ( result.branch )
    {
      setUpdateOptions({
        dbBranch: result.branch,
        submitBranch: result.branch,
      });

      apiNotifications.addInfo(`Branch ${ result.branch.id } is successfully created.`);

      return true;
    }

    setCreateOptions({
      dbBranch: dbBranch,
      submitBranch: formBranch,
      submitErrors: result.error,
      fetchCommonError: result.fetchCommonError,
    });

    return false;
  }

  async function createDbBranch( formBranch )
  {
    try {
      return await createBranch( formBranch, lingo );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      }
    }
  }
}

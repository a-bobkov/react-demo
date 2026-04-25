import { BranchForm } from '../form/BranchForm.jsx';
import { updateBranch } from './updateBranch.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';

export function BranchAppUpdate( { updateOptions, setUpdateOptions })
{
  const apiNotifications = useNotificationsContext();

  const { lingo } = useLingo();

  console.log(`BranchAppUpdate updateOptions: ${ JSON.stringify( updateOptions )}`);

  return (
    <BranchForm
      key={ updateOptions.id }
      branchOptions={ updateOptions }
      onClickSaveBranch={ onClickUpdateBranch }
    />
  );

  async function onClickUpdateBranch( formBranch, dbBranch )
  {
    const result = await updateDbBranch( formBranch );

    if ( result.branch )
    {
      setUpdateOptions({
        dbBranch: result.branch,
        submitBranch: result.branch,
      });

      apiNotifications.addInfo(`Branch ${ result.branch.id } is successfully updated.`);

      return true;
    }

    setUpdateOptions({
      dbBranch: dbBranch,
      submitBranch: formBranch,
      submitErrors: result.error,
      fetchCommonError: result.fetchCommonError,
    });

    return false;
  }

  async function updateDbBranch( formBranch )
  {
    try {
      return await updateBranch( formBranch, lingo );
    }
    catch (error) {
      apiNotifications.addError(`Error: ${ error.message }`);

      return {
        fetchCommonError: error,
      }
    }
  }
}

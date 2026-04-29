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

      apiNotifications.addInfo( lingo({
        en: `Branch ${ result.branch.id } is successfully updated.`,
        de: `Niederlassung ${ result.branch.id } wurde erfolgreich aktualisiert.`,
      }));

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
      apiNotifications.addError( lingo({
        en: `Error: ${ error.message }`,
        de: `Fehler: ${ error.message }`,
      }));

      return {
        fetchCommonError: error,
      }
    }
  }
}

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

      apiNotifications.addInfo( lingo({
        en: `Branch ${ result.branch.id } is successfully created.`,
        de: `Niederlassung ${ result.branch.id } wurde erfolgreich erstellt.`,
      }));

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

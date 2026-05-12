import { useState } from 'react';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { BranchForm } from '../form/BranchForm.jsx';
import { createBranch } from './createBranch.js';

export function BranchAppCreate({ branch, setCreatedBranch })
{
  const apiNotifications = useNotificationsContext();

  const [ branchOptions, setBranchOptions ] = useState( createInitialBranchOptions );

  console.log(`BranchAppCreate createOptions: ${ JSON.stringify( branchOptions )}`);

  return (
    <BranchForm
      key={ branchOptions.id }
      branchOptions={ branchOptions }
      onClickSaveBranch={ onClickCreateBranch }
    />
  );

  async function onClickCreateBranch( formBranch, dbBranch )
  {
    const result = await createDbBranch( formBranch );

    if ( Error.isError( result ))
    {
      apiNotifications.addError({
        en: `Error creating branch: ${ result.message }`,
        de: `Fehler beim Erstellen der Niederlassung: ${ result.message }`,
      });

      return false;
    }

    if ( result.error )
    {
      setBranchOptions( identifyOptions({
        dbBranch: dbBranch,
        submitBranch: formBranch,
        submitErrors: result.error,
      }));

      return false;
    }

    if ( result.branch )
    {
      setCreatedBranch( result.branch );

      apiNotifications.addInfo({
        en: `Branch ${ result.branch.id } is successfully created.`,
        de: `Niederlassung ${ result.branch.id } wurde erfolgreich erstellt.`,
      });

      return true;
    }
  }

  async function createDbBranch( formBranch )
  {
    try {
      return await createBranch( formBranch );
    }
    catch ( error )
    {
      return error;
    }
  }

  function createInitialBranchOptions()
  {
    return {
      dbBranch: branch,
      submitBranch: branch,
    };
  }
}

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit

  return options;
}

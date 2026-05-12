import { useState } from 'react';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { BranchForm } from '../form/BranchForm.jsx';
import { updateBranch } from './updateBranch.js';

export function BranchAppUpdate({ branch })
{
  console.log(`BranchAppUpdate branch: ${ JSON.stringify( branch )}`);

  const apiNotifications = useNotificationsContext();

  const [ branchOptions, setBranchOptions ] = useState( createInitialBranchOptions );

  return (
    <BranchForm
      key={ branchOptions.id }
      branchOptions={ branchOptions }
      onClickSaveBranch={ onClickUpdateBranch }
    />
  );

  function createInitialBranchOptions()
  {
    return identifyOptions({
      dbBranch: branch,
      submitBranch: branch,
    });
  }

  async function onClickUpdateBranch( formBranch, dbBranch )
  {
    const result = await updateDbBranch( formBranch );

    if ( Error.isError( result ))
    {
      apiNotifications.addError({
        en: `Error updating branch: ${ result.message }`,
        de: `Fehler beim Aktualisieren der Niederlassung: ${ result.message }`,
      });

      return false;
    }

    if ( result.error )
    {
      setIdentifiedBranchOptions({
        dbBranch: dbBranch,
        submitBranch: formBranch,
        submitErrors: result.error,
      });

      return false;
    }

    if ( result.branch )
    {
      setIdentifiedBranchOptions({
        dbBranch: result.branch,
        submitBranch: result.branch,
      });

      apiNotifications.addInfo({
        en: `Branch ${ result.branch.id } is successfully updated.`,
        de: `Niederlassung ${ result.branch.id } wurde erfolgreich aktualisiert.`,
      });

      return true;
    }
  }

  async function updateDbBranch( formBranch )
  {
    try {
      return await updateBranch( formBranch );
    }
    catch ( error )
    {
      return error;
    }
  }

  function setIdentifiedBranchOptions( newBranchOptions )
  {
    setBranchOptions( identifyOptions( newBranchOptions ));
  }
}

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit

  return options;
}

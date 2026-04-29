import { useState } from 'react';
import { fetchBranch } from './fetchBranch.js';
import { useBranchAppGetLocation } from './useBranchAppGetLocation.js';
import { useNotificationsContext } from '../../notifications/NotificationsProvider.jsx';
import { BranchAppGet } from './BranchAppGet.jsx';
import { BranchAppUpdate } from '../branchAppUpdate/BranchAppUpdate.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';

export function BranchAppGetPage()
{
  const { branchId } = useBranchAppGetLocation();

  const apiNotifications = useNotificationsContext();

  const { lingo } = useLingo();

  const [ getOptions, setGetOptions ] = useState( createInitialGetOptions );

  const [ updateOptions, setUpdateOptions ] = useState();

  if ( updateOptions ) {
    return (
      <BranchAppUpdate
        updateOptions={ updateOptions }
        setUpdateOptions={ setIdentifiedUpdateOptions }
      />
    );
  }

  if ( getOptions ) {
    return (
      <BranchAppGet
        getOptions={ getOptions }
      />
    );
  }

  function setIdentifiedUpdateOptions( newUpdateOptions )
  {
    identifyOptions( newUpdateOptions );

    setUpdateOptions( newUpdateOptions );
  }

  function createInitialGetOptions()
  {
    if ( branchId === undefined ) return;

    const promise = createGetPromise( branchId );

    return {
      branchId,
    };
  }

  async function createGetPromise( branchId )
  {
    const result = await getFormBranch( branchId );

    if ( result.branch )
    {
      setIdentifiedUpdateOptions({
        dbBranch: result.branch,
        submitBranch: result.branch,
      });
    }
    else
    {
      setGetOptions({
        branchId,
        fetchCommonError: result.fetchCommonError,
      });
    }
  }

  async function getFormBranch( branchId )
  {
    try {
      return await fetchBranch( branchId, lingo );
    }
    catch (error)
    {
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

function identifyOptions( options )
{
  options.id = String( Date.now());  // to initialize state of form after submit
}

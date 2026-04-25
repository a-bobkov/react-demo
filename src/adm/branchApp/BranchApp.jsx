import { useState } from 'react';
import { usePopstate } from '../usePopstate.js';
import { useBranchLocationContext } from './branchLocation/BranchLocationProvider.jsx';
import { BranchAppListPage } from './branchAppList/BranchAppListPage.jsx';
import { BranchAppGetPage } from './branchAppGet/BranchAppGetPage.jsx';
import { BranchAppCreatePage } from './branchAppCreate/BranchAppCreatePage.jsx';

const LIST_MODE = 'LIST_MODE';
const GET_MODE = 'GET_MODE';
const CREATE_MODE = 'CREATE_MODE';

export function BranchApp()
{
  const branchLocationApi = useBranchLocationContext();

  const [ mode, setMode ] = useState( getBranchLocationMode );

  usePopstate( dispatchBranchPath );

  switch ( mode )
  {
    case LIST_MODE:
      return <BranchAppListPage />;

    case GET_MODE:
      return <BranchAppGetPage />;

    case CREATE_MODE:
      return <BranchAppCreatePage />;
  }

  function getBranchLocationMode()
  {
    if ( branchLocationApi.isBranchRootPath()) {
      branchLocationApi.setBranchListPath();
    }

    if ( branchLocationApi.isBranchListPath()) {
      return LIST_MODE;
    }

    if ( branchLocationApi.isBranchGetPath()) {
      return GET_MODE;
    }

    if ( branchLocationApi.isBranchCreatePath()) {
      return CREATE_MODE;
    }
  }

  function dispatchBranchPath()
  {
    setMode( getBranchLocationMode() );
  }
}

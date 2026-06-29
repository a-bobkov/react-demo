import { UserFilterLogin } from './login/UserFilterLogin.jsx';
import { loadFilterLogin, saveFilterLogin } from './login/UserFilterLoginUrl.js';
import { UserFilterName } from './name/UserFilterName.jsx';
import { loadFilterName, saveFilterName } from './name/UserFilterNameUrl.js';
import { UserFilterBranch } from './branch/UserFilterBranch.jsx';
import { loadFilterBranch, saveFilterBranch } from './branch/UserFilterBranchUrl.js';
import { UserFilterActive } from './active/UserFilterActive.jsx';
import { loadFilterActive, saveFilterActive } from './active/UserFilterActiveUrl.js';
import './UserFilters.css';

export function UserFilters({ filter, subordinates, onChangeFilter })
{
  return (
    <user-filters>
      <UserFilterLogin
        filter={ filter.login }
        onChangeFilter={ onChangeFilterLogin }
      />
      <UserFilterName
        filter={ filter.name }
        onChangeFilter={ onChangeFilterName }
      />
      <UserFilterBranch
        filter={ filter.branch }
        subordinates={ subordinates }
        onChangeFilter={ onChangeFilterBranch }
      />
      <UserFilterActive
        filter={ filter.active }
        onChangeFilterActive={ onChangeFilterActive }
      />
    </user-filters>
  );

  function onChangeFilterLogin( login )
  {
    onChangeFilterValue({ login });
  }

  function onChangeFilterName( name )
  {
    onChangeFilterValue({ name });
  }

  function onChangeFilterBranch( branch )
  {
    onChangeFilterValue({ branch });
  }

  function onChangeFilterActive( active )
  {
    onChangeFilterValue({ active });
  }

  function onChangeFilterValue( update )
  {
    onChangeFilter({
      ...filter,
      ...update,
    });
  }
}

export function saveFilter( searchParams, filter )
{
  saveFilterLogin( searchParams, filter );
  saveFilterName( searchParams, filter );
  saveFilterBranch( searchParams, filter );
  saveFilterActive( searchParams, filter );
}

export function loadFilter( searchParams )
{
  return Object.assign({},
    loadFilterLogin( searchParams ),
    loadFilterName( searchParams ),
    loadFilterBranch( searchParams ),
    loadFilterActive( searchParams ),
  );
}

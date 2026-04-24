import { UsersFilterLogin } from './Login/UsersFilterLogin.jsx';
import { loadFilterLogin, saveFilterLogin } from './Login/UsersFilterLoginUrl.js';
import { UsersFilterName } from './Name/UsersFilterName.jsx';
import { loadFilterName, saveFilterName } from './Name/UsersFilterNameUrl.js';
import { UsersFilterActive } from './Active/UsersFilterActive.jsx';
import { loadFilterActive, saveFilterActive } from './Active/UsersFilterActiveUrl.js';
import './UsersFilter.css';

export function UsersFilter({ filter, onChangeFilter })
{
  console.log(`UsersFilter: ${ JSON.stringify(filter) }`)

  return (
    <div className="UsersFilter">
      <UsersFilterLogin
        filter={ filter.login }
        onChangeFilter={ onChangeFilterLogin }
      />
      <UsersFilterName
        filter={ filter.name }
        onChangeFilter={ onChangeFilterName }
      />
      <UsersFilterActive
        filter={ filter.active }
        onChangeFilterActive={ onChangeFilterActive }
      />
    </div>
  );

  function onChangeFilterLogin( login )
  {
    onChangeFilterValue({ login });
  }

  function onChangeFilterName( name )
  {
    onChangeFilterValue({ name });
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

export function saveFilter(searchParams, filter )
{
  saveFilterLogin( searchParams, filter );
  saveFilterName( searchParams, filter );
  saveFilterActive( searchParams, filter );
}

export function loadFilter(searchParams )
{
  return Object.assign({},
    loadFilterLogin( searchParams ),
    loadFilterName( searchParams ),
    loadFilterActive( searchParams ),
  );
}

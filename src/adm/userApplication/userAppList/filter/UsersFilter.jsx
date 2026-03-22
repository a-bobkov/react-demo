import { UsersFilterMail, saveFilterMail, loadFilterMail } from './UsersFilterMail.jsx';
import { UsersFilterName, saveFilterName, loadFilterName } from './UsersFilterName.jsx';
import { UsersFilterActive, saveFilterActive, loadFilterActive } from './UsersFilterActive.jsx';
import './UsersFilter.css';

export function UsersFilter({ filter, onChangeFilter })
{
  console.log(`UsersFilter: ${ JSON.stringify(filter) }`)

  return (
    <div className="UsersFilter">
      <UsersFilterMail
        filter={filter.mail}
        onChangeFilter={onChangeMailFilter}
      />
      <UsersFilterName
        filter={filter.name}
        onChangeFilter={onChangeNameFilter}
      />
      <UsersFilterActive
        filter={ filter.active }
        onChangeFilterActive={ onChangeFilterActive }
      />
    </div>
  );

  function onChangeMailFilter( mail )
  {
    onChangeFilterValue({ mail });
  }

  function onChangeNameFilter( name )
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
  saveFilterMail( searchParams, filter );
  saveFilterName( searchParams, filter );
  saveFilterActive( searchParams, filter );
}

export function loadFilter(searchParams )
{
  return Object.assign({},
    loadFilterMail( searchParams ),
    loadFilterName( searchParams ),
    loadFilterActive( searchParams ),
  );
}

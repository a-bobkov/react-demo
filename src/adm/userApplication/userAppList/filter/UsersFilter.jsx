import { UsersFilterMail, loadFilterMail, saveFilterMail } from './UsersFilterMail.jsx';
import { UsersFilterName, loadFilterName, saveFilterName } from './UsersFilterName.jsx';
import './UsersFilter.css';

export function UsersFilter({ filter, onChangeFilter })
{
  console.log(`UsersFilter: "${ JSON.stringify(filter) }"`)

  return (
    <>
      <div className="UsersFilter">
        <UsersFilterMail
          filter={filter.mail}
          onChangeFilter={onChangeMailFilter}
        />
        <UsersFilterName
          filter={filter.name}
          onChangeFilter={onChangeNameFilter}
        />
      </div>
    </>
  );

  function onChangeMailFilter( mail )
  {
    onChangeFilter({
      ...filter,
      mail,
    });
  }

  function onChangeNameFilter( name )
  {
    onChangeFilter({
      ...filter,
      name,
    });
  }
}

export function saveFilter(searchParams, filter )
{
  saveFilterMail( searchParams, filter );
  saveFilterName( searchParams, filter );
}

export function loadFilter(searchParams )
{
  return Object.assign({},
    loadFilterMail( searchParams ),
    loadFilterName( searchParams ),
  );
}

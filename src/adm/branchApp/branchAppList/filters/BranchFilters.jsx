import { BranchFilterName } from './name/BranchFilterName.jsx';
import { loadFilterName, saveFilterName } from './name/BranchFilterNameUrl.js';
import './BranchFilters.css';

export function BranchFilters({ filter, onChangeFilter })
{
  return (
    <branch-filters>
      <BranchFilterName
        filter={ filter.name }
        onChangeFilter={ onChangeFilterName }
      />
    </branch-filters>
  );

  function onChangeFilterName( name )
  {
    onChangeFilterValue({ name });
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
  saveFilterName( searchParams, filter );
}

export function loadFilter( searchParams )
{
  return Object.assign({},
    loadFilterName( searchParams ),
  );
}

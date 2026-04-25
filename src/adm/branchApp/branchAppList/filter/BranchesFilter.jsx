import { BranchesFilterName } from './Name/BranchesFilterName.jsx';
import { loadFilterName, saveFilterName } from './Name/BranchesFilterNameUrl.js';
import './BranchesFilter.css';

export function BranchesFilter( { filter, onChangeFilter })
{
  console.log(`BranchesFilter: ${ JSON.stringify(filter) }`)

  return (
    <div className="BranchesFilter">
      <BranchesFilterName
        filter={ filter.name }
        onChangeFilter={ onChangeFilterName }
      />
    </div>
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

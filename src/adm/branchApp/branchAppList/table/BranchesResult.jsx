import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { BranchesList } from './BranchesList.jsx';
import { BranchesPagination } from '../pagination/BranchesPagination.jsx';
import './BranchesResult.css';

export function BranchesResult({ listOptions, branches, onChangePagination })
{
  console.log(`BranchesResult: ${ JSON.stringify({ listOptions, branches })}`);

  if ( branches === undefined ) {
    return <BranchesResultLoading />;
  }

  const isFilterDifferent = different( listOptions.filter, branches.filter );
  const isSortingDifferent = different( listOptions.sorting, branches.sorting );
  const isPaginationDifferent = different( listOptions.pagination, branches.pagination );

  return (
    <div className="BranchesResult">
      <BranchesList
        branches={ branches }
        isBlocked={ isFilterDifferent || isSortingDifferent || isPaginationDifferent }
      />
      <BranchesPagination
        total={ branches.count }
        pagination={ isFilterDifferent || isSortingDifferent ? branches.pagination : listOptions.pagination }
        isBlocked={ isFilterDifferent || isSortingDifferent }
        onChangePagination={ onChangePagination }
      />
    </div>
  );
}

function BranchesResultLoading()
{
  const { lingo } = useLingo();

  return (
    <div className="BranchesResultLoading">
      { lingo({
        en: 'Loading branches...',
        de: 'Niederlassungen werden geladen...',
      })}
    </div>
  );
}

function different( obj1, obj2 )
{
  return JSON.stringify( obj1, sortKeysReplacer ) !== JSON.stringify( obj2, sortKeysReplacer );

  function sortKeysReplacer( key, value )
  {
    return value?.constructor === Object
      ? Object.fromEntries( Object.entries( value ).sort())
      : value;
  }
}

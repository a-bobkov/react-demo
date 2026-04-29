import { BranchesHeader } from './BranchesHeader.jsx';
import { BranchesFilter } from './filter/BranchesFilter.jsx';
import { BranchesSorting } from './sorting/BranchesSorting.jsx';
import { BranchesResult } from './table/BranchesResult.jsx';
import './BranchAppList.css';

export function BranchAppList( { listOptions, setListOptions, branches })
{
  console.log(`BranchAppList: ${ JSON.stringify( listOptions )}`)

  return (
    <div className="BranchAppList">
      <BranchesHeader />
      <BranchesFilter
        filter={ listOptions.filter }
        onChangeFilter={ onChangeFilter }
      />
      <BranchesSorting
        sorting={ listOptions.sorting }
        onChangeSorting={ onChangeSorting }
      />
      <BranchesResult
        listOptions={ listOptions }
        branches={ branches }
        onChangePagination={ onChangePagination }
      />
    </div>
  );

  function onChangeFilter( filter )
  {
    console.log(`onChangeFilter: ${ JSON.stringify( filter )}`);

    const newOptions = {
      ...listOptions,
      filter,
    };

    newOptions.pagination.count = 1;

    setListOptions( newOptions );
  }

  function onChangeSorting( sorting )
  {
    console.log(`onChangeSorting: ${ JSON.stringify( sorting )}`);

    const newOptions = {
      ...listOptions,
      sorting,
    };

    newOptions.pagination.count = 1;

    setListOptions( newOptions );
  }

  function onChangePagination( pagination )
  {
    console.log(`onChangePagination: ${ JSON.stringify( pagination )}`);

    const newOptions = {
      ...listOptions,
      pagination,
    };

    setListOptions( newOptions );
  }
}

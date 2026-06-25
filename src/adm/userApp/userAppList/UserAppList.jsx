import { useLingo } from '../../lingo/LingoProvider.jsx';
import { UserFilters } from './filters/UserFilters.jsx';
import { UsersSorting } from './sorting/UsersSorting.jsx';
import { UsersResult } from './table/UsersResult.jsx';
import './UserAppList.css';

export function UserAppList({ listOptions, subordinates, users, setListOptions })
{
  const { lingo } = useLingo();

  if ( subordinates === undefined )
  {
    return lingo ({
      en: 'Waiting for subordinates...',
      de: 'Warten auf Untergebene...',
    });
  }

  return (
    <div className="UserAppList">
      <UserFilters
        filter={ listOptions.filter }
        subordinates={ subordinates }
        onChangeFilter={ onChangeFilter }
      />
      <UsersSorting
        sorting={ listOptions.sorting }
        onChangeSorting={ onChangeSorting }
      />
      <UsersResult
        listOptions={ listOptions }
        users={ users }
        subordinates={ subordinates }
        onChangePagination={ onChangePagination }
      />
    </div>
  );

  function onChangeFilter( filter )
  {
    const newOptions = {
      ...listOptions,
      filter,
    };

    newOptions.pagination.count = 1;

    setListOptions( newOptions );
  }

  function onChangeSorting( sorting )
  {
    const newOptions = {
      ...listOptions,
      sorting,
    };

    newOptions.pagination.count = 1;

    setListOptions( newOptions );
  }

  function onChangePagination( pagination )
  {
    const newOptions = {
      ...listOptions,
      pagination,
    };

    setListOptions( newOptions );
  }
}

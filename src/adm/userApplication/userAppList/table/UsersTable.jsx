import { UsersList } from './UsersList.jsx';
import { UsersPagination } from '../pagination/UsersPagination.jsx';
import './UsersTable.css';

export function UsersTable({ users, pagination, onChangePagination, setModeGet })
{
  console.log(`UsersTable: "${ JSON.stringify( pagination )}"`);

  return (
    <div className="UsersTable">
      <UsersList
        users={ users }
        setModeGet={ setModeGet }
      />
      <UsersPagination
        total={users.count}
        pagination={pagination}
        onChangePagination={onChangePagination}
      />
    </div>
  );
}
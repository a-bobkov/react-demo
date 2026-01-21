import { UsersList } from './UsersList.jsx';
import { UsersPagination } from '../pagination/UsersPagination.jsx';
import './UsersTable.css';

export function UsersTable({ users, pagination, onChangePagination })
{
  console.log(`UsersTable: "${ JSON.stringify( pagination )}"`);

  return (
    <div className="UsersTable">
      <UsersList
        users={users}
      />
      <UsersPagination
        total={users.count}
        pagination={pagination}
        onChangePagination={onChangePagination}
      />
    </div>
  );
}
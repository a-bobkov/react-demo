import { UsersSortingField } from './UsersSortingField.jsx';
import './UsersSorting.css';

export function UsersSorting({ sorting = {}, onChangeSorting })
{
  const { id, login, name, company, active } = sorting;

  return (
    <div className="UsersSorting">
      <UsersSortingField
        name="id"
        fieldSorting={{id: id}}
        onChangeSorting={onChangeSorting}
      />
      <UsersSortingField
        name="login"
        fieldSorting={{login: login}}
        onChangeSorting={onChangeSorting}
      />
      <UsersSortingField
        name="name"
        fieldSorting={{name: name}}
        onChangeSorting={onChangeSorting}
      />
      <UsersSortingField
        name="company"
        fieldSorting={{company: company}}
        onChangeSorting={onChangeSorting}
      />
      <UsersSortingField
        name="active"
        fieldSorting={{ active: active }}
        onChangeSorting={ onChangeSorting }
      />
    </div>
  );
}

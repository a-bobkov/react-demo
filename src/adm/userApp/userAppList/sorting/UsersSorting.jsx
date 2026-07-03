import { UsersSortingField } from './UsersSortingField.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './UsersSorting.css';

export function UsersSorting({ sorting = {}, onChangeSorting })
{
  const { id, login, name, branch, active } = sorting;

  const { lingo } = useLingo();

  return (
    <users-sorting>
      <UsersSortingField
        className="UserSortingId"
        name={ lingo({
          en: 'id',
          de: 'ID',
        })}
        fieldSorting={{ id }}
        onChangeSorting={ onChangeSorting }
      />
      <UsersSortingField
        className="UserSortingLogin"
        name={ lingo({
          en: 'login',
          de: 'Login',
        })}
        fieldSorting={{ login }}
        onChangeSorting={ onChangeSorting }
      />
      <UsersSortingField
        className="UserSortingName"
        name={ lingo({
          en: 'name',
          de: 'Name',
        })}
        fieldSorting={{ name }}
        onChangeSorting={ onChangeSorting }
      />
      <UsersSortingField
        className="UserSortingBranch"
        name={ lingo({
          en: 'branch',
          de: 'Niederlassung',
        })}
        fieldSorting={{ branch }}
        onChangeSorting={ onChangeSorting }
      />
      <UsersSortingField
        className="UserSortingActive"
        name={ lingo({
          en: 'active',
          de: 'tätig',
        })}
        fieldSorting={{ active }}
        onChangeSorting={ onChangeSorting }
      />
    </users-sorting>
  );
}

import { UsersSortingField } from './UsersSortingField.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './UsersSorting.css';

export function UsersSorting({ sorting = {}, onChangeSorting })
{
  const { id, login, name, company, active } = sorting;

  const { lingo } = useLingo();

  return (
    <div className="UsersSorting">
      <UsersSortingField
        name={ lingo({
          en: 'id',
          de: 'ID',
        })}
        fieldSorting={{ id }}
        onChangeSorting={ onChangeSorting }
      />
      <UsersSortingField
        name={ lingo({
          en: 'login',
          de: 'Login',
        })}
        fieldSorting={{ login }}
        onChangeSorting={ onChangeSorting }
      />
      <UsersSortingField
        name={ lingo({
          en: 'name',
          de: 'Name',
        })}
        fieldSorting={{ name }}
        onChangeSorting={ onChangeSorting }
      />
      <UsersSortingField
        name={ lingo({
          en: 'company',
          de: 'Unternehmen',
        })}
        fieldSorting={{ company }}
        onChangeSorting={ onChangeSorting }
      />
      <UsersSortingField
        name={ lingo({
          en: 'active',
          de: 'tätig',
        })}
        fieldSorting={{ active }}
        onChangeSorting={ onChangeSorting }
      />
    </div>
  );
}

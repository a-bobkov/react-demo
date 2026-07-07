import { useLingo } from '../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../popstate/PopstateLink.jsx';
import { userCreatePath } from '../useUserAppLocation.js';
import './UsersHeader.css';

export function UsersHeader()
{
  return (
    <users-header>
      <UsersTitle />
      <UserCreateButton />
    </users-header>
  );
}

function UsersTitle()
{
  const { lingo } = useLingo();

  return (
    <users-title>
      { lingo({
        en: 'Users',
        de: 'Die Benutzer',
      })}
    </users-title>
  );
}

function UserCreateButton()
{
  const { lingo } = useLingo();

  return (
    <user-create-button>
      <PopstateLink path={ userCreatePath }>
        <user-create-button-content>
          { lingo({
            en: 'New user',
            de: 'Neu Benutzer',
          })}
        </user-create-button-content>
      </PopstateLink>
    </user-create-button>
  );
}

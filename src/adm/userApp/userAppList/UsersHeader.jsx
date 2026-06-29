import { useLingo } from '../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../PopstateLink.jsx';
import { userCreatePath } from '../useUserAppLocation.js';
import './UsersHeader.css';

export function UsersHeader()
{
  return (
    <users-header>
      <UsersTitle />
      <CreateUserButton />
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

function CreateUserButton()
{
  const { lingo } = useLingo();

  return (
    <PopstateLink
      className="CreateUserButton"
      path={ userCreatePath }
    >
      { lingo({
        en: 'New user',
        de: 'Neu Benutzer',
      })}
    </PopstateLink>
  );
}

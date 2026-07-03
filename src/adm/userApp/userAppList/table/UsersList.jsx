import { clsx } from 'clsx';
import { useUserListHighlight } from './useUserListHighlight.js';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../../popstate/PopstateLink.jsx';
import { getUserGetFullPath } from '../../userAppGet/useUserAppGetLocation.js';
import './UsersList.css';

export function UsersList({ users, isBlocked })
{
  const { highlight, setHighlight } = useUserListHighlight();

  return (
    <users-list inert={ isBlocked }>
      { users.list.map( user =>
        <UsersLine
          key={ user.id }
          user={ user }
          highlight={ highlight }
          setHighlight={ setHighlight }
        />
      )}
    </users-list>
  );
}

function UsersLine({ user, highlight, setHighlight })
{
  return (
    <users-line
      className={ clsx({ 'isUserHighlighted': isUserHighlighted( user )}) }
      onClick={ changeHighlight }
    >
      <UsersLineId userId={ user.id } />
      <UsersLineLogin userLogin={ user.login } />
      <UsersLineName userName={ user.name } />
      <UsersLineBranch userBranch={ user.branch } />
      <UsersLineActive userActive={ user.active }/>
      <UsersLineActionEdit
        userId={ user.id }
        changeHighlight={ changeHighlight }
      />
    </users-line>
  );

  function changeHighlight()
  {
    const newHighlight = isUserHighlighted( user )
      ? undefined
      : user.id;

    setHighlight( newHighlight );
  }

  function isUserHighlighted( user )
  {
    return user.id === highlight;
  }
}

function UsersLineId({ userId })
{
  return (
    <users-line-id>
      { userId }
    </users-line-id>
  );
}

function UsersLineLogin({ userLogin })
{
  return (
    <users-line-login>
      <users-line-overflowable>
        { userLogin }
      </users-line-overflowable>
    </users-line-login>
  );
}

function UsersLineName({ userName })
{
  return (
    <users-line-name>
      <users-line-overflowable>
        { userName }
      </users-line-overflowable>
    </users-line-name>
  );
}

function UsersLineBranch({ userBranch })
{
  const userBranchText = `${ userBranch.id }: ${ userBranch.name }`;

  return (
    <users-line-branch>
      { userBranchText }
    </users-line-branch>
  );
}

function UsersLineActive({ userActive })
{
  const { lingo } = useLingo();

  const userActiveText = userActive
    ? lingo({
      en: 'true',
      de: 'Wahr',
    })
    : lingo({
      en: 'false',
      de: 'Falsch',
    });

  return (
    <users-line-active>
      { userActiveText }
    </users-line-active>
  );
}

function UsersLineActionEdit({ userId, changeHighlight })
{
  const { lingo } = useLingo();

  return (
    <PopstateLink
      className="UsersLineActionEdit"
      path={ getUserGetFullPath( userId ) }
      onClickBefore={ changeHighlight }
    >
      { lingo({
        en: 'Edit',
        de: 'Bearbeiten',
      })}
    </PopstateLink>
  );
}

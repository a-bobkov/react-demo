import { clsx } from 'clsx';
import { useUserListHighlight } from './useUserListHighlight.js';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { PopstateLink } from '../../../PopstateLink.jsx';
import { getUserGetFullPath } from '../../userAppGet/useUserAppGetLocation.js';
import './UsersList.css';

export function UsersList({ users, isBlocked })
{
  const { highlight, setHighlight } = useUserListHighlight();

  return (
    <div className="UsersList" inert={ isBlocked }>
      { users.list.map( user =>
        <UsersLine
          key={ user.id }
          user={ user }
          highlight={ highlight }
          setHighlight={ setHighlight }
        />
      )}
    </div>
  );
}

function UsersLine({ user, highlight, setHighlight })
{
  return (
    <div
      className={ clsx('UsersLine', isHighlighted( user ) && 'isHighlighted') }
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
    </div>
  );

  function changeHighlight()
  {
    const newHighlight = isHighlighted( user )
      ? undefined
      : user.id;

    setHighlight( newHighlight );
  }

  function isHighlighted( user )
  {
    return user.id === highlight;
  }
}

function UsersLineId({ userId })
{
  return (
    <div className="UsersLineId">
      { userId }
    </div>
  );
}

function UsersLineLogin({ userLogin })
{
  return (
    <div className="UsersLineLogin">
      { userLogin }
    </div>
  );
}

function UsersLineName({ userName })
{
  return (
    <div className="UsersLineName">
      { userName }
    </div>
  );
}

function UsersLineBranch({ userBranch })
{
  return (
    <div className="UsersLineBranch">
      { `${ userBranch.id }: ${ userBranch.name }` }
    </div>
  );
}

function UsersLineActive({ userActive })
{
  const { lingo } = useLingo();

  return (
    <div className="UsersLineActive">
      { userActive
        ? lingo({
          en: 'true',
          de: 'Wahr',
        })
        : lingo({
          en: 'false',
          de: 'Falsch',
        })
      }
    </div>
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

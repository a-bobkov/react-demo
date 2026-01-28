import { UsersApp } from './users/UsersApp.jsx';
import { UserApp } from './user/UserApp.jsx';
import './Application.css';

export function Application()
{
  const pathname = window.location.pathname;

  if (pathname === '/') {
    return null;
  }

  if (pathname === '/users') {
    return <UsersApp />;
  }

  const [, userId] = pathname.match(/^\/user\/edit\/(\d+)$/) ?? [];
  if (userId) {
    return <UserApp userId={ parseInt( userId )} />;
  }

  return '404';
}

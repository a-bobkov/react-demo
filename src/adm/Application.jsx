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

  if (pathname === '/user/new') {
    return <UserApp />;
  }

  const [, userId] = pathname.match(/^\/user\/edit\/(\d+)$/) ?? [];
  if (userId) {
    return <UserApp userId={ parseInt( userId )} />;
  }

  return '404';
}

import { UsersApp } from './users/UsersApp.jsx';
import './Application.css';

export function Application()
{
  switch (window.location.pathname) {
    case '/':
      return null;
    case '/users':
      return <UsersApp />;
  }

  return '404';
}

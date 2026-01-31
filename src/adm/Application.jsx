import { UserApplication } from './userapp/UserApplication.jsx';

export function Application()
{
  const pathname = window.location.pathname;

  if (pathname === '/') {
    return null;
  }

  if (pathname.startsWith('/user')) {
    return <UserApplication />;
  }

  return '404';
}

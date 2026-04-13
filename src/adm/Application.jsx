import { UserLocationProvider } from './userApplication/userLocation/UserLocationProvider.jsx';
import { UserApplication } from './userApplication/UserApplication.jsx';

export function Application()
{
  const pathname = window.location.pathname;

  if (pathname === '/') {
    return null;
  }

  const userPrefix = '/user';

  if ( pathname.startsWith( userPrefix )) {
    return (
      <UserLocationProvider prefix={ userPrefix }>
        <UserApplication />
      </UserLocationProvider>
    );
  }

  return '404';
}

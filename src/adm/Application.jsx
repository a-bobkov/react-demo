import { UserLocationProvider } from './userApp/userLocation/UserLocationProvider.jsx';
import { UserApp } from './userApp/UserApp.jsx';

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
        <UserApp />
      </UserLocationProvider>
    );
  }

  return '404';
}

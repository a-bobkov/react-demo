import { validateUserLogin } from './validateUserLogin.js';
import { validateUserName } from './validateUserName.js';
import { validateUserCompany } from './validateUserCompany.js';

export function validateUser( user, storedUsers )
{
  const error = {};

  [ user.login, error.login ] = validateUserLogin( user.login, user.id, storedUsers );

  [ user.name, error.name ] = validateUserName( user.name );

  [ user.company, error.company ] = validateUserCompany( user.company );

  return [ user, squeeze( error )];
}

function squeeze( obj )
{
  const squeezed = Object.fromEntries( Object.entries( obj ).filter(
    ([, value ]) => value != null)
  );

  if (Object.keys(squeezed).length) {
    return squeezed;
  }
}
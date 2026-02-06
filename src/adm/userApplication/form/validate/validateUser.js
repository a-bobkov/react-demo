import { validateUserLogin } from './validateUserLogin.js';
import { validateUserName } from './validateUserName.js';
import { validateUserCompany } from './validateUserCompany.js';

export function validateUser( user )
{
  const error = {};

  error.login = validateUserLogin( user.login );

  error.name = validateUserName( user.name );

  error.company = validateUserCompany( user.company );

  return squeeze( error );
}

function squeeze( obj )
{
  return Object.fromEntries( Object.entries( obj ).filter(
    ([, value ]) => value != null)
  );
}
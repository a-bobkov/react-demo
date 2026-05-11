import { validateUserLogin } from './validateUserLogin.js';
import { validateUserName } from './validateUserName.js';
import { validateUserCompany } from './validateUserCompany.js';
import { validateUserBranch } from './validateUserBranch.js';
import { validateUserActive } from './validateUserActive.js';
import { validateUserSalutation } from './validateUserSalutation.js';

export function validateUser( user, userId, storedUsers, storedBranches, storedSalutations )
{
  const error = {};

  [ user.login, error.login ] = validateUserLogin( user.login, userId, storedUsers );

  [ user.name, error.name ] = validateUserName( user.name );

  [ user.company, error.company ] = validateUserCompany( user.company );

  [ user.branch, error.branch ] = validateUserBranch( user.branch, storedBranches );

  [ user.active, error.active ] = validateUserActive( user.active );

  [ user.salutation, error.salutation ] = validateUserSalutation( user.salutation, storedSalutations );

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
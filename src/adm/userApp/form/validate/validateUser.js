import { validateUserLogin } from './validateUserLogin.js';
import { validateUserName } from './validateUserName.js';
import { validateUserBranch } from './validateUserBranch.js';
import { validateUserCompany } from './validateUserCompany.js';

export function validateUser( formUser )
{
  const error = {};

  error.login = validateUserLogin( formUser.login );

  error.name = validateUserName( formUser.name );

  error.branch = validateUserBranch( formUser.branch );

  error.company = validateUserCompany( formUser.company );

  return squeeze( error );
}

function squeeze( obj )
{
  return Object.fromEntries( Object.entries( obj ).filter(
    ([, value ]) => value != null)
  );
}
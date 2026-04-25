import { validateBranchName } from './validateBranchName.js';

export function validateBranch( formBranch )
{
  const error = {};

  error.name = validateBranchName( formBranch.name );

  return squeeze( error );
}

function squeeze( obj )
{
  return Object.fromEntries( Object.entries( obj ).filter(
    ([, value ]) => value != null)
  );
}
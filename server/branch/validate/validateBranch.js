import { validateBranchName } from './validateBranchName.js';

export function validateBranch( branch, storedBranches )
{
  const error = {};

  [ branch.name, error.name ] = validateBranchName( branch.name );

  return [ branch, squeeze( error )];
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
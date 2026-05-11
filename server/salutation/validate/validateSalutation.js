import { validateSalutationName } from './validateSalutationName.js';

export function validateSalutation( salutation )
{
  const error = {};

  [ salutation.name, error.name ] = validateSalutationName( salutation.name );

  return [ salutation, squeeze( error )];
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
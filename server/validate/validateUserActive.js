export function validateUserActive( userActive )
{
  if (!isUserActiveBoolean( userActive )) {
    return [ userActive, 'User active should be a boolean' ];
  }

  return [ userActive ];
}

function isUserActiveBoolean( userActive )
{
  return typeof userActive === 'boolean';
}

export function validateUserName( userName )
{
  userName = userName ?? '';

  if (!isUserNameString( userName )) {
    return [ userName, 'User name should be a string' ];
  }

  userName = userName.trim();

  if (!isUserNameFilled( userName )) {
    return [ userName, 'User name should not be empty' ];
  }

  return [ userName ];
}

function isUserNameString( userName )
{
  return typeof userName === 'string';
}

function isUserNameFilled( userName )
{
  return userName !== '';
}

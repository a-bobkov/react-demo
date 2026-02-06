export function validateUserName( userName )
{
  if (!isUserNameFilled( userName )) {
    return 'User name should not be empty';
  }
}

function isUserNameFilled( userName )
{
  return userName.trim() !== '';
}

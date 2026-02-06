export function validateUserLogin( userLogin )
{
  if (!isUserLoginValidEmailAddress( userLogin )) {
    return 'User login should be a valid email address';
  }
}

function isUserLoginValidEmailAddress( userLogin )
{
  return /^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+$/
    .exec( userLogin ) !== null;
}

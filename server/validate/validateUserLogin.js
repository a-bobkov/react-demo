export function validateUserLogin( userLogin, userId, storedUsers )
{
  if (!isUserLoginString( userLogin )) {
    return [ userLogin, 'User login should be a string' ];
  }

  userLogin = userLogin.trim();

  if (!isUserLoginValidEmailAddress( userLogin )) {
    return [ userLogin, 'User login should be a valid email address'];
  }

  userLogin = userLogin.toLowerCase();

  if (!isUserLoginUnique( userLogin, userId, storedUsers )) {
    return [ userLogin, 'User login should be unique'];
  }

  return [ userLogin ];
}

function isUserLoginString( userLogin )
{
  return typeof userLogin === 'string';
}

function isUserLoginValidEmailAddress( userLogin )
{
  return /^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z0-9.\-]+$/
    .exec( userLogin ) !== null;
}

function isUserLoginUnique( userLogin, userId, storedUsers )
{
  return Object.values( storedUsers ).every( storedUser =>
    storedUser.login !== userLogin || storedUser.id === userId
  )
}
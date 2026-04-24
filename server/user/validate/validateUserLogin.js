export function validateUserLogin( userLogin, userId, storedUsers )
{
  if (!isUserLoginString( userLogin ))
  {
    return [ userLogin,
      {
        en: 'User login should be a string',
        de: 'Das Benutzerlogin sollte ein Zeichenkettenwert sein',
      },
    ];
  }

  userLogin = userLogin.trim();

  if (!isUserLoginValidEmailAddress( userLogin ))
  {
    return [ userLogin,
      {
        en: 'User login should be a valid email address',
        de: 'Das Benutzerlogin muss eine gültige E-Mail-Adresse sein',
      },
    ];
  }

  userLogin = userLogin.toLowerCase();

  if (!isUserLoginUnique( userLogin, userId, storedUsers ))
  {
    return [ userLogin,
      {
        en: 'User login should be unique',
        de: 'Das Benutzerlogin muss einzigartig sein',
      },
    ];
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
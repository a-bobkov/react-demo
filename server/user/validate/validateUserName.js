export function validateUserName( userName )
{
  userName = userName ?? '';

  if (!isUserNameString( userName ))
  {
    return [ userName,
      {
        en: 'User name should be a string',
        de: 'Der Benutzername sollte ein Zeichenkettenwert sein',
      },
    ];
  }

  userName = userName.trim();

  if (!isUserNameFilled( userName ))
  {
    return [ userName,
      {
        en: 'User name should not be empty',
        de: 'Der Benutzername sollte nicht leer sein',
      },
    ];
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

export function validateUserActive( userActive )
{
  if (!isUserActiveBoolean( userActive ))
  {
    return [ userActive,
      {
        en: 'User active should be a boolean value',
        de: 'Benutzer tätig sollte ein boolescher Wert sein',
      },
    ];
  }

  return [ userActive ];
}

function isUserActiveBoolean( userActive )
{
  return typeof userActive === 'boolean';
}

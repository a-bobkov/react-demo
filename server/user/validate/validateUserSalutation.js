export function validateUserSalutation( userSalutation )
{
  if ( userSalutation === undefined ) {
    return [ userSalutation ];
  }

  if (!isUserSalutationInteger( userSalutation ))
  {
    return [ userSalutation,
      {
        en: 'User salutation should be integer value',
        de: 'Benutzeranrede sollte ein ganzzahliger Wert sein',
      },
    ];
  }

  if (!isUserSalutationValid( userSalutation ))
  {
    return [ userSalutation,
      {
        en: 'User salutation value is invalid',
        de: 'Der Wert für die Benutzeranrede ist ungültig',
      },
    ];
  }

  return [ userSalutation ];
}

function isUserSalutationInteger( userSalutation )
{
  return Number.isInteger( userSalutation );
}

function isUserSalutationValid( userSalutation )
{
  const validSalutations = [ 1, 2 ];

  return validSalutations.includes( userSalutation );
}

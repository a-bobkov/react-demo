export function validateUserSalutation( userSalutation, storedSalutations )
{
  if ( userSalutation === undefined ) {
    return [ userSalutation ];
  }

  if ( !isUserSalutationObject( userSalutation ))
  {
    return [ userSalutation,
      {
        en: 'User salutation should be an object',
        de: 'Benutzer-Anrede sollte ein Objekt sein',
      },
    ];
  }

  if ( !isUserSalutationIdInteger( userSalutation.id ))
  {
    return [ userSalutation,
      {
        en: 'User salutation id should be integer',
        de: 'Benutzer-Anrede-ID sollte ganzzahliger sein',
      },
    ];
  }

  if ( !isUserSalutationIdValid( userSalutation.id, storedSalutations ))
  {
    return [ userSalutation,
      {
        en: 'User salutation id is invalid',
        de: 'Benutzer-Anrede-ID ist ungültig',
      },
    ];
  }

  return [ userSalutation ];
}

function isUserSalutationObject( userSalutation )
{
  return userSalutation != null
    && userSalutation.constructor === Object;
}

function isUserSalutationIdInteger( userSalutationId )
{
  return Number.isInteger( userSalutationId );
}

function isUserSalutationIdValid( userSalutationId, storedSalutations )
{
  return storedSalutations[ userSalutationId ] !== undefined;
}

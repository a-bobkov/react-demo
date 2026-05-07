export function validateUserBranch( userBranch, storedBranches )
{
  if ( !isUserBranchObject( userBranch ))
  {
    return [ userBranch,
      {
        en: 'User branch should be an object',
        de: 'Benutzer-Niederlassung sollte ein Objekt sein',
      },
    ];
  }

  if ( !isUserBranchIdInteger( userBranch.id ))
  {
    return [ userBranch,
      {
        en: 'User branch id should be integer',
        de: 'Benutzer-Niederlassung-ID sollte ganzzahliger sein',
      },
    ];
  }

  if ( !isUserBranchIdValid( userBranch.id, storedBranches ))
  {
    return [ userBranch,
      {
        en: 'User branch id is invalid',
        de: 'Benutzer-Niederlassung-ID ist ungültig',
      },
    ];
  }

  return [ userBranch ];
}

function isUserBranchObject( userBranch )
{
  return userBranch != null
    && userBranch.constructor === Object;
}

function isUserBranchIdInteger( userBranch )
{
  return Number.isInteger( userBranch );
}

function isUserBranchIdValid( userBranch, storedBranches )
{
  return storedBranches[ userBranch ] !== undefined;
}

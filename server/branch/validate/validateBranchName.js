export function validateBranchName( branchName )
{
  if (!isBranchNameString( branchName ))
  {
    return [ branchName,
      {
        en: 'Branch name should be a string',
        de: 'Der Name der Niederlassung sollte ein Zeichenkettenwert sein',
      },
    ];
  }

  branchName = branchName.trim();

  if (!isBranchNameFilled( branchName ))
  {
    return [ branchName,
      {
        en: 'Branch name should not be empty',
        de: 'Der Name der Niederlassung sollte nicht leer sein',
      },
    ];
  }

  return [ branchName ];
}

function isBranchNameString( branchName )
{
  return branchName.constructor === String;
}

function isBranchNameFilled( branchName )
{
  return branchName !== '';
}

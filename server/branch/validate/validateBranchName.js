export function validateBranchName( branchName, branchId, storedBranches )
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

  if (!isBranchNameUnique( branchName, branchId, storedBranches ))
  {
    return [ branchName,
      {
        en: 'Branch name should be unique',
        de: 'Der Name der Niederlassung muss einzigartig sein',
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

function isBranchNameUnique( branchName, branchId, storedBranches )
{
  return Object.values( storedBranches ).every( storedBranch =>
    storedBranch.name !== branchName || storedBranch.id === branchId
  )
}
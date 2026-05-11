export function validateUserCompany( userCompany )
{
  if ( !isUserCompanyString( userCompany ))
  {
    return [ userCompany,
      {
        en: 'User company should be string',
        de: 'Das Benutzerunternehmen muss String sein',
      },
    ];
  }

  userCompany = userCompany.trim();

  if ( !isUserCompanyFilled( userCompany ))
  {
    return [ userCompany,
      {
        en: 'User company should not be empty',
        de: 'Das Benutzerunternehmen sollte nicht leer sein',
      },
    ];
  }

  return [ userCompany ];
}

function isUserCompanyString( userCompany )
{
  return userCompany != null
    && userCompany.constructor === String
}

function isUserCompanyFilled( userCompany )
{
  return userCompany !== '';
}

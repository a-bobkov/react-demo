export function validateUserCompany( userCompany )
{
  userCompany = userCompany ?? '';

  if (!isUserCompanyString( userCompany ))
  {
    return [ userCompany,
      {
        en: 'User company should be a string value',
        de: 'Das Benutzerunternehmen sollte ein Zeichenkettenwert sein',
      },
    ];
  }

  userCompany = userCompany.trim();

  if (!isUserCompanyFilled( userCompany ))
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
  return typeof userCompany === 'string';
}

function isUserCompanyFilled( userCompany )
{
  return userCompany !== '';
}

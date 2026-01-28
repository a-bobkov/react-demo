export function validateUserCompany( userCompany )
{
  userCompany = userCompany ?? '';

  if (!isUserCompanyString( userCompany )) {
    return [ userCompany, 'User company should be a string' ];
  }

  userCompany = userCompany.trim();

  if (!isUserCompanyFilled( userCompany )) {
    return [ userCompany, 'User company should not be empty' ];
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

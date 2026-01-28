export function validateUserCompany( userCompany )
{
  if (!isUserCompanyFilled( userCompany )) {
    return [ userCompany, 'User company should not be empty' ];
  }
}

function isUserCompanyFilled( userCompany )
{
  return userCompany.trim() !== '';
}

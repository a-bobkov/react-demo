export function validateUserCompany( userCompany )
{
  if (!isUserCompanyFilled( userCompany )) {
    return 'User company should not be empty';
  }
}

function isUserCompanyFilled( userCompany )
{
  return userCompany.trim() !== '';
}

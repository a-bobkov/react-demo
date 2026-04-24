import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function validateUserCompany( userCompany )
{
  const { lingo } = useLingo();

  if (!isUserCompanyFilled( userCompany )) {
    return lingo({
      en: 'User company should not be empty',
      de: 'Das Benutzerunternehmen darf nicht leer sein',
    });
  }
}

function isUserCompanyFilled( userCompany )
{
  return userCompany.trim() !== '';
}

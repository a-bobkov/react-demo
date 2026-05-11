import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function validateUserCompany( userCompany )
{
  const { lingo } = useLingo();

  if ( !isUserCompanyFilledString( userCompany ))
  {
    return lingo({
      en: 'User company should be non-empty string',
      de: 'Das Benutzerunternehmen muss nicht-leerer String sein',
    });
  }
}

function isUserCompanyFilledString( userCompany )
{
  return userCompany !== undefined
    && userCompany.constructor === String
    && userCompany.trim() !== '';
}

import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function validateUserName( userName )
{
  const { lingo } = useLingo();

  if ( !isUserNameFilledString( userName ))
  {
    return lingo({
      en: 'User name should be non-empty string',
      de: 'Der Benutzername muss nicht-leerer String sein',
    });
  }
}

function isUserNameFilledString( userName )
{
  return userName !== undefined
    && userName.constructor === String
    && userName.trim() !== '';
}

import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function validateUserLogin( userLogin )
{
  const { lingo } = useLingo();

  if (!isUserLoginValidEmailAddress( userLogin )) {
    return lingo({
      en: 'User login should be a valid email address',
      de: 'Das Login muss eine gültige E-Mail-Adresse sein',
    });
  }
}

function isUserLoginValidEmailAddress( userLogin )
{
  return /^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+$/
    .exec( userLogin ) !== null;
}

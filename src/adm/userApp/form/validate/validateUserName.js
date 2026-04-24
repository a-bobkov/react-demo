import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function validateUserName( userName )
{
  const { lingo } = useLingo();

  if (!isUserNameFilled( userName )) {
    return lingo({
      en: 'User name should not be empty',
      de: 'Der Benutzername darf nicht leer sein',
    });
  }
}

function isUserNameFilled( userName )
{
  return userName.trim() !== '';
}
